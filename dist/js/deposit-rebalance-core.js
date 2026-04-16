(function (globalScope) {
  const EPSILON = 1e-9;

  function normalizeRoundingMode(mode) {
    if (typeof mode !== "string") return "exact";
    const normalized = mode.toLowerCase();
    return ["exact", "floor", "nearest"].includes(normalized)
      ? normalized
      : "exact";
  }

  function sanitizePercent(value) {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  }

  function sanitizeValue(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    return num;
  }

  function sanitizePositive(value) {
    const num = sanitizeValue(value);
    return num > 0 ? num : 0;
  }

  function computeRebalanceDepositPlan({
    assets,
    deposit = 0,
    roundingMode = "exact",
    priceMap = {},
    lockedKeys = [],
    autoDistributeLeftover = true,
  }) {
    const assetList = Array.isArray(assets) ? assets : [];
    const depositAmount = sanitizePositive(deposit);
    const rounding = normalizeRoundingMode(roundingMode);
    const lockedSet = new Set(
      Array.isArray(lockedKeys) ? lockedKeys.filter(Boolean) : []
    );

    const warnings = {
      zeroDeposit: depositAmount <= EPSILON,
      missingPrices: false,
      noActiveAssets: false,
    };

    if (assetList.length === 0) {
      warnings.noActiveAssets = true;
      return {
        rows: {},
        totals: {
          deposit: depositAmount,
          assigned: 0,
          rawAssigned: 0,
          leftoverCash: depositAmount,
          totalCurrent: 0,
          finalTotalValue: depositAmount,
          targetSum: 0,
          roundingMode: rounding,
          roundingApplied: rounding !== "exact",
          priceCoverageCount: 0,
          missingPriceTickers: [],
          impactedCount: 0,
          resolvedCount: 0,
          needsCount: 0,
          maxDeltaAfter: 0,
          lockedCount: lockedSet.size,
        },
        warnings,
      };
    }

    const activeAssets = assetList.filter((asset) => !lockedSet.has(asset.key));
    if (activeAssets.length === 0) {
      warnings.noActiveAssets = true;
    }

    const totalCurrent = assetList.reduce(
      (sum, asset) => sum + sanitizePositive(asset.currentValue),
      0
    );
    let targetSum = assetList.reduce(
      (sum, asset) => sum + Math.max(0, sanitizePercent(asset.targetPercent)),
      0
    );
    if (targetSum <= EPSILON && activeAssets.length > 0) {
      targetSum = activeAssets.length;
    }

    const newTotal = totalCurrent + depositAmount;
    const needsMap = {};
    const rows = {};

    let positiveNeedsSum = 0;
    let needsCount = 0;

    assetList.forEach((asset) => {
      const key = asset.key;
      const targetPercent = sanitizePercent(asset.targetPercent);
      const currentValue = sanitizePositive(asset.currentValue);
      const currentPercent = sanitizePercent(asset.currentPercent);
      const locked = lockedSet.has(key);
      const weight =
        targetSum > EPSILON
          ? Math.max(0, targetPercent) / targetSum
          : activeAssets.length > 0
          ? 1 / activeAssets.length
          : 0;
      const idealValue = weight * newTotal;
      const rawNeed = idealValue - currentValue;
      if (!locked && rawNeed > EPSILON) {
        positiveNeedsSum += rawNeed;
        needsCount += 1;
      }
      needsMap[key] = {
        rawNeed,
        weight,
        locked,
      };
      rows[key] = {
        key,
        targetPercent,
        currentValue,
        currentPercent,
        locked,
        rawNeed,
        rawAllocation: 0,
        finalAllocation: 0,
        allocationDiff: 0,
        rawShares: null,
        shares: null,
        newValue: currentValue,
        newPercent: currentPercent,
        delta: currentPercent - targetPercent,
        preDelta: currentPercent - targetPercent,
      };
    });

    const allocations = {};
    let rawAssigned = 0;

    if (depositAmount > EPSILON && activeAssets.length > 0) {
      if (positiveNeedsSum > EPSILON) {
        const scale = Math.min(1, depositAmount / positiveNeedsSum);
        activeAssets.forEach((asset) => {
          const key = asset.key;
          const need = Math.max(0, needsMap[key].rawNeed);
          const allocation = need * scale;
          allocations[key] = allocation;
          rawAssigned += allocation;
        });
      }

      if (autoDistributeLeftover) {
        let leftover = depositAmount - rawAssigned;
        if (leftover > EPSILON) {
          const activeWeightSum = activeAssets.reduce(
            (sum, asset) => sum + Math.max(0, needsMap[asset.key].weight),
            0
          );
          const normalizer =
            activeWeightSum > EPSILON ? activeWeightSum : activeAssets.length;
          activeAssets.forEach((asset) => {
            const key = asset.key;
            const baseWeight = Math.max(0, needsMap[key].weight);
            const weightShare =
              normalizer > EPSILON
                ? baseWeight / normalizer
                : 1 / activeAssets.length;
            const addition = leftover * weightShare;
            allocations[key] = (allocations[key] || 0) + addition;
          });
          rawAssigned = depositAmount;
        }
      }
    }

    const priceCoverageSet = new Set();
    const missingPriceTickers = [];
    let finalTotal = 0;

    const candidateRows = [];
    assetList.forEach((asset) => {
      const key = asset.key;
      const rawAllocation = allocations[key] || 0;
      rows[key].rawAllocation = rawAllocation;

      const price = sanitizePositive(priceMap ? priceMap[key] : null);
      if (
        rounding === "exact" ||
        rawAllocation <= EPSILON ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        if (
          rounding !== "exact" &&
          rawAllocation > EPSILON &&
          (!Number.isFinite(price) || price <= 0)
        ) {
          warnings.missingPrices = true;
          missingPriceTickers.push(key);
        }
        const final = rawAllocation;
        rows[key].rawShares =
          Number.isFinite(price) && price > 0 ? rawAllocation / price : null;
        rows[key].shares = rows[key].rawShares;
        rows[key].finalAllocation = final;
        finalTotal += final;
      } else {
        priceCoverageSet.add(key);
        const rawShares = rawAllocation / price;
        const baseShares = Math.max(0, Math.floor(rawShares + EPSILON));
        const remainder = rawShares - baseShares;
        const final = baseShares * price;

        rows[key].rawShares = rawShares;
        rows[key].shares = baseShares;
        rows[key].finalAllocation = final;
        finalTotal += final;

        if (rounding === "nearest") {
          candidateRows.push({
            key,
            price,
            remainder,
            finalShares: baseShares,
          });
        }
      }
    });

    if (rounding === "nearest" && candidateRows.length > 0 && rawAssigned > EPSILON) {
      let availableBudget = Math.max(0, rawAssigned - finalTotal);
      let safety = 0;
      while (availableBudget > EPSILON && safety < 1000) {
        safety += 1;
        let best = null;
        let bestScore = 0.5;
        candidateRows.forEach((row) => {
          if (row.remainder > bestScore && availableBudget + EPSILON >= row.price) {
            bestScore = row.remainder;
            best = row;
          }
        });
        if (!best) break;
        best.finalShares += 1;
        best.remainder = -1;
        rows[best.key].shares = best.finalShares;
        rows[best.key].finalAllocation += best.price;
        availableBudget -= best.price;
        finalTotal += best.price;
      }
    }

    const finalTotalValue = totalCurrent + finalTotal;
    const finalLeftover = Math.max(0, depositAmount - finalTotal);

    let impactedCount = 0;
    let resolvedCount = 0;
    let maxDeltaAfter = 0;

    assetList.forEach((asset) => {
      const key = asset.key;
      const targetPercent = sanitizePercent(asset.targetPercent);
      const currentValue = sanitizePositive(asset.currentValue);
      const currentPercent = sanitizePercent(asset.currentPercent);
      const finalAllocation = rows[key].finalAllocation;
      const newValue = currentValue + finalAllocation;
      const newPercent =
        finalTotalValue > EPSILON ? (newValue / finalTotalValue) * 100 : 0;
      const preDelta = currentPercent - targetPercent;
      const delta = newPercent - targetPercent;

      rows[key].allocationDiff = finalAllocation - rows[key].rawAllocation;
      rows[key].newValue = newValue;
      rows[key].newPercent = newPercent;
      rows[key].delta = delta;
      rows[key].preDelta = preDelta;

      if (rows[key].rawAllocation > EPSILON) {
        impactedCount += 1;
      }
      if (Math.abs(delta) > maxDeltaAfter) {
        maxDeltaAfter = Math.abs(delta);
      }
      if (Math.abs(delta) + EPSILON < Math.abs(preDelta)) {
        resolvedCount += 1;
      }
    });

    const totals = {
      deposit: depositAmount,
      assigned: finalTotal,
      rawAssigned,
      leftoverCash: finalLeftover,
      totalCurrent,
      finalTotalValue,
      targetSum,
      roundingMode: rounding,
      roundingApplied: rounding !== "exact",
      priceCoverageCount: priceCoverageSet.size,
      missingPriceTickers,
      impactedCount,
      resolvedCount,
      needsCount,
      maxDeltaAfter,
      lockedCount: lockedSet.size,
    };

    return {
      rows,
      totals,
      warnings,
    };
  }

  const api = { computeRebalanceDepositPlan };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (globalScope && typeof globalScope === "object") {
    globalScope.DepositRebalanceCore = Object.assign(
      {},
      globalScope.DepositRebalanceCore || {},
      api
    );
  }
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
