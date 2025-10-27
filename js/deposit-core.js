/**
 * Pure helper functions for the Deposit Allocation Tool.
 * Shared between the browser implementation and Node-based tests.
 */
(function (globalScope) {
  const EPSILON = 1e-9;

  function sanitizeTarget(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function sanitizeDeposit(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return 0;
    }
    return parsed;
  }

  function sanitizePrice(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }

  function normalizeRoundingMode(mode) {
    if (typeof mode !== "string") return "exact";
    const normalized = mode.toLowerCase();
    return ["exact", "floor", "nearest"].includes(normalized)
      ? normalized
      : "exact";
  }

  function sumFinalAmounts(map) {
    let total = 0;
    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        const row = map[key];
        total += Number(row.finalAmount) || 0;
      }
    }
    return total;
  }

  /**
   * Compute deposit allocation plan for a given set of assets.
   *
   * @param {Object} params
   * @param {Array<{key: string, targetPercent: number, price?: number}>} params.assets
   * @param {number} params.deposit
   * @param {"exact"|"floor"|"nearest"} [params.roundingMode="exact"]
   * @returns {{
   *   rows: Record<string, {
   *     key: string,
   *     targetPercent: number,
   *     price: number|null,
   *     rawAmount: number,
   *     finalAmount: number,
   *     diffAmount: number,
   *     shares: number|null,
   *     rawShares: number|null,
   *     roundingApplied: boolean
   *   }>,
   *   totals: {
   *     targetSum: number,
   *     effectiveTarget: number,
   *     rawTotal: number,
   *     finalTotal: number,
   *     diffTotal: number,
   *     leftover: number,
   *     deposit: number,
   *     roundingMode: string,
   *     roundingApplied: boolean,
   *     priceCoverageCount: number,
   *     missingPriceTickers: string[],
   *     assetsCount: number
   *   },
   *   warnings: {
   *     nonHundredTarget: boolean,
   *     missingPrices: boolean,
   *     zeroDeposit: boolean
   *   }
   * }}
   */
  function computeDepositAllocationPlan({
    assets,
    deposit = 0,
    roundingMode = "exact",
  }) {
    const assetList = Array.isArray(assets) ? assets : [];
    const assetCount = assetList.length;
    const depositAmount = sanitizeDeposit(deposit);
    const appliedRoundingMode = normalizeRoundingMode(roundingMode);

    let targetSum = 0;
    assetList.forEach((asset) => {
      targetSum += sanitizeTarget(asset?.targetPercent);
    });
    const effectiveTarget = targetSum > EPSILON ? targetSum : 100;

    const rows = {};
    const roundingCandidates = [];
    let rawTotal = 0;
    let finalTotal = 0;
    let priceCoverageCount = 0;
    const missingPriceTickers = [];

    assetList.forEach((asset) => {
      const key = asset?.key || "";
      if (!key) return;
      const targetPercent = sanitizeTarget(asset?.targetPercent);
      const price = sanitizePrice(asset?.price);
      const weight =
        effectiveTarget > EPSILON ? targetPercent / effectiveTarget : 0;
      const rawAmount = depositAmount * weight;
      rawTotal += rawAmount;

      const row = {
        key,
        targetPercent,
        price,
        rawAmount,
        finalAmount: rawAmount,
        diffAmount: 0,
        shares: price ? rawAmount / price : null,
        rawShares: price ? rawAmount / price : null,
        roundingApplied: false,
      };

      rows[key] = row;

      if (price) {
        priceCoverageCount += 1;
      } else if (appliedRoundingMode !== "exact") {
        missingPriceTickers.push(key);
      }

      if (
        appliedRoundingMode !== "exact" &&
        price &&
        depositAmount > 0 &&
        rawAmount > 0
      ) {
        const rawShares = rawAmount / price;
        const baseShares = Math.max(0, Math.floor(rawShares + EPSILON));
        const remainder = rawShares - baseShares;

        row.roundingApplied = true;
        row.baseShares = baseShares;
        row.remainder = remainder;
        row.shares = baseShares;
        row.finalAmount = baseShares * price;
        row.diffAmount = row.finalAmount - rawAmount;
        roundingCandidates.push(row);
        finalTotal += row.finalAmount;
      } else {
        finalTotal += row.finalAmount;
      }
    });

    let leftover = depositAmount - finalTotal;
    const minimumPrice = roundingCandidates.reduce((min, row) => {
      if (!row.price) return min;
      return row.price < min ? row.price : min;
    }, Number.POSITIVE_INFINITY);

    if (
      appliedRoundingMode !== "exact" &&
      Number.isFinite(minimumPrice) &&
      minimumPrice < Number.POSITIVE_INFINITY
    ) {
      const threshold = appliedRoundingMode === "nearest" ? 0.5 : 0;
      let safety = 0;
      while (leftover + EPSILON >= minimumPrice && safety < 1000) {
        safety += 1;
        let candidate = null;
        let bestScore = threshold;
        for (let i = 0; i < roundingCandidates.length; i += 1) {
          const row = roundingCandidates[i];
          if (!row.price) continue;
          const remainder = row.rawShares - row.shares;
          if (remainder > bestScore && leftover + EPSILON >= row.price) {
            bestScore = remainder;
            candidate = row;
          }
        }
        if (!candidate) break;
        candidate.shares += 1;
        candidate.finalAmount += candidate.price;
        candidate.diffAmount = candidate.finalAmount - candidate.rawAmount;
        leftover -= candidate.price;
      }
      finalTotal = sumFinalAmounts(rows);
    }

    const diffTotal = finalTotal - rawTotal;
    leftover = depositAmount - finalTotal;
    if (Math.abs(leftover) < 0.005) {
      leftover = 0;
    }

    return {
      rows,
      totals: {
        targetSum,
        effectiveTarget,
        rawTotal,
        finalTotal,
        diffTotal,
        leftover,
        deposit: depositAmount,
        roundingMode: appliedRoundingMode,
        roundingApplied: appliedRoundingMode !== "exact" && priceCoverageCount > 0,
        priceCoverageCount,
        missingPriceTickers,
        assetsCount: assetCount,
      },
      warnings: {
        nonHundredTarget: Math.abs(targetSum - 100) > 0.1,
        missingPrices:
          appliedRoundingMode !== "exact" && missingPriceTickers.length > 0,
        zeroDeposit: depositAmount <= 0,
      },
    };
  }

  const api = { computeDepositAllocationPlan };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (globalScope && typeof globalScope === "object") {
    globalScope.DepositAllocationCore = Object.assign(
      {},
      globalScope.DepositAllocationCore || {},
      api
    );
  }
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
