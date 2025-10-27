const assert = require("assert");
const { computeRebalanceDepositPlan } = require("../js/deposit-rebalance-core.js");

function nearlyEqual(a, b, epsilon = 1e-6) {
  return Math.abs(a - b) <= epsilon;
}

function makeAsset(key, targetPercent, currentValue, currentPercent = null) {
  return {
    key,
    targetPercent,
    currentValue,
    currentPercent:
      currentPercent !== null
        ? currentPercent
        : (targetPercent / 100) * 100,
  };
}

// Test 1: baseline distribution with assets already on target
(() => {
  const assets = [
    makeAsset("A", 60, 600, 60),
    makeAsset("B", 40, 400, 40),
  ];
  const plan = computeRebalanceDepositPlan({
    assets,
    deposit: 200,
    roundingMode: "exact",
    priceMap: {},
    lockedKeys: [],
  });

  assert(nearlyEqual(plan.rows.A.finalAllocation, 120), "Asset A should receive 120");
  assert(nearlyEqual(plan.rows.B.finalAllocation, 80), "Asset B should receive 80");
  assert(nearlyEqual(plan.totals.assigned, 200), "Total assigned equals deposit");
  assert(nearlyEqual(plan.totals.leftoverCash, 0), "No leftover cash expected");
})();

// Test 2: locked asset should not receive funds (extra cash redistributed)
(() => {
  const assets = [
    makeAsset("A", 60, 600, 60),
    makeAsset("B", 40, 400, 40),
  ];
  const plan = computeRebalanceDepositPlan({
    assets,
    deposit: 200,
    roundingMode: "exact",
    priceMap: {},
    lockedKeys: ["B"],
  });

  assert(nearlyEqual(plan.rows.B.finalAllocation, 0), "Locked asset stays untouched");
  assert(nearlyEqual(plan.rows.A.finalAllocation, 200), "Unlocked asset absorbs cash");
  assert(plan.totals.leftoverCash < 1e-6, "Cash fully allocated when leftover auto-spend enabled");
})();

// Test 3: disable auto distribution of leftover
(() => {
  const assets = [
    makeAsset("A", 60, 600, 60),
    makeAsset("B", 40, 400, 40),
  ];
  const plan = computeRebalanceDepositPlan({
    assets,
    deposit: 200,
    roundingMode: "exact",
    priceMap: {},
    lockedKeys: ["B"],
    autoDistributeLeftover: false,
  });

  assert(nearlyEqual(plan.totals.assigned, 120), "Only needs funded when auto-spend disabled");
  assert(nearlyEqual(plan.totals.leftoverCash, 80), "Leftover cash preserved");
})();

// Test 4: rounding down to whole shares
(() => {
  const assets = [
    makeAsset("A", 50, 100, 50),
    makeAsset("B", 50, 100, 50),
  ];
  const priceMap = { A: 33.33, B: 25 };
  const plan = computeRebalanceDepositPlan({
    assets,
    deposit: 150,
    roundingMode: "floor",
    priceMap,
    lockedKeys: [],
  });

  assert.strictEqual(plan.rows.A.shares, 2, "Asset A rounds down to 2 shares");
  assert.strictEqual(plan.rows.B.shares, 3, "Asset B rounds down to 3 shares");
  assert(plan.totals.assigned <= 150, "Spend stays within deposit");
})();

// Test 5: missing prices trigger warning in rounding modes
(() => {
  const assets = [
    makeAsset("A", 100, 0, 0),
  ];
  const plan = computeRebalanceDepositPlan({
    assets,
    deposit: 100,
    roundingMode: "floor",
    priceMap: { A: null },
  });

  assert.strictEqual(plan.warnings.missingPrices, true, "Missing price warning expected");
  assert.deepStrictEqual(plan.totals.missingPriceTickers, ["A"], "Ticker flagged for missing price");
})();

console.log("All deposit-rebalance-core tests passed.");
