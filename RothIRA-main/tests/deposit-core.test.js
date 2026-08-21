const assert = require("assert");
const { computeDepositAllocationPlan } = require("../js/deposit-core.js");

function nearlyEqual(a, b, epsilon = 1e-6) {
  return Math.abs(a - b) <= epsilon;
}

function assertNearlyEqual(actual, expected, message) {
  assert(
    nearlyEqual(actual, expected),
    `${message} (expected ${expected}, received ${actual})`
  );
}

// Test 1: Simple proportional allocation, exact mode
(() => {
  const plan = computeDepositAllocationPlan({
    assets: [
      { key: "A", targetPercent: 60 },
      { key: "B", targetPercent: 40 },
    ],
    deposit: 1000,
    roundingMode: "exact",
  });

  assertNearlyEqual(plan.totals.rawTotal, 1000, "Raw total should equal deposit");
  assertNearlyEqual(plan.totals.finalTotal, 1000, "Final total should equal deposit");
  assertNearlyEqual(plan.rows.A.rawAmount, 600, "Asset A raw allocation");
  assertNearlyEqual(plan.rows.B.rawAmount, 400, "Asset B raw allocation");
  assert.strictEqual(plan.warnings.zeroDeposit, false, "Zero deposit warning should be false");
})();

// Test 2: Whole-share rounding down with leftover
(() => {
  const plan = computeDepositAllocationPlan({
    assets: [
      { key: "A", targetPercent: 50, price: 33.33 },
      { key: "B", targetPercent: 50, price: 33.33 },
    ],
    deposit: 200,
    roundingMode: "floor",
  });

  // Each raw allocation is 100 -> 3 shares (99.99)
  assert.strictEqual(plan.rows.A.shares, 3, "Asset A shares (floor)");
  assert.strictEqual(plan.rows.B.shares, 3, "Asset B shares (floor)");
  assert(plan.totals.leftover >= 0, "Leftover should be non-negative");
})();

// Test 3: Nearest rounding picks extra share when affordable
(() => {
  const plan = computeDepositAllocationPlan({
    assets: [
      { key: "A", targetPercent: 50, price: 40 },
      { key: "B", targetPercent: 50, price: 10 },
    ],
    deposit: 200,
    roundingMode: "nearest",
  });

  // Asset B should receive approximately 5 shares (raw 100 -> 10 shares).
  assert.strictEqual(plan.rows.B.shares, 10, "Asset B nearest rounding");
  assert(
    plan.totals.finalTotal <= 200 + 1e-6,
    "Final total should not exceed deposit in nearest mode"
  );
})();

// Test 4: Missing price with rounding mode flagged in warnings
(() => {
  const plan = computeDepositAllocationPlan({
    assets: [
      { key: "A", targetPercent: 70, price: 20 },
      { key: "B", targetPercent: 30 }, // Missing price
    ],
    deposit: 500,
    roundingMode: "floor",
  });

  assert.strictEqual(plan.warnings.missingPrices, true, "Missing price warning");
  assert.strictEqual(
    plan.rows.B.finalAmount,
    plan.rows.B.rawAmount,
    "Asset with missing price stays in dollar mode"
  );
})();

console.log("All deposit-core tests passed.");
