// Stress Testing Module

let stressChartInstance = null;

// Function to get current portfolio value
function getCurrentPortfolioValue() {
  return parseFloat(document.getElementById("currentTotalValueDisplay").textContent.replace(/[$,]/g, '')) || 0;
}

// Function to get current asset values
function getCurrentAssetValues() {
  const assetValues = {};
  assetKeys.forEach(key => {
    const inputEl = document.querySelector(`input[data-stock="${key}"][data-field="currentValue"]`);
    assetValues[key] = parseFloat(inputEl ? inputEl.value : initialStockData[key].currentValue) || 0;
  });
  return assetValues;
}

// Function to apply stress scenario
function applyStressScenario(scenario, severity) {
  const baseMultipliers = {
    bear: { return: -0.30, volatility: 1.0 },
    recession: { return: -0.50, volatility: 1.2 },
    inflation: { return: 0.10, volatility: 1.5 },
    crash: { return: -0.70, volatility: 1.8 }
  };

  const multipliers = baseMultipliers[scenario];
  const adjustedSeverity = severity / 100; // Convert to decimal

  const stressedValues = {};
  let totalStressedValue = 0;

  assetKeys.forEach(key => {
    const currentValue = getCurrentAssetValues()[key];
    const beta = key === 'VOO' ? 1.0
      : key === 'QQQM' ? 1.2
      : key === 'VXUS' ? 0.9
      : key === 'SMH' ? 1.3
      : key === 'AVUV' ? 1.1
      : key === 'AMZN' ? 1.4
      : key === 'IBIT' ? 1.5
      : 1.0;

    // Apply stress based on beta and scenario
    const stressImpact = multipliers.return * adjustedSeverity * beta;
    const stressedValue = currentValue * (1 + stressImpact);
    stressedValues[key] = Math.max(0, stressedValue); // Prevent negative values
    totalStressedValue += stressedValues[key];
  });

  return { stressedValues, totalStressedValue };
}

// Function to run stress test
function runStressTest() {
  const scenario = document.getElementById('stressScenario').value;
  const severity = parseInt(document.getElementById('stressSeverity').value);

  const currentValue = getCurrentPortfolioValue();
  const { stressedValues, totalStressedValue } = applyStressScenario(scenario, severity);

  const lossAmount = currentValue - totalStressedValue;
  const lossPercent = (lossAmount / currentValue) * 100;

  // Update display
  document.getElementById('stressCurrentValue').textContent = formatCurrency(currentValue);
  document.getElementById('stressStressedValue').textContent = formatCurrency(totalStressedValue);
  document.getElementById('stressLossAmount').textContent = formatCurrency(lossAmount);
  document.getElementById('stressLossPercent').textContent = formatPercent(lossPercent);

  // Populate asset table
  populateStressAssetTable(stressedValues);

  // Render chart
  renderStressChart(currentValue, totalStressedValue);
}

// Function to populate stress asset table
function populateStressAssetTable(stressedValues) {
  const tableBody = document.getElementById('stressAssetTable');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  const currentValues = getCurrentAssetValues();

  assetKeys.forEach(key => {
    const row = document.createElement('tr');
    row.classList.add('text-sm', 'text-gray-700', 'dark:text-gray-300', 'hover:bg-blue-50/50', 'dark:hover:bg-slate-700/50', 'transition-colors');

    const currentValue = currentValues[key];
    const stressedValue = stressedValues[key];
    const impact = ((stressedValue - currentValue) / currentValue) * 100;

    const cell1 = document.createElement('td');
    cell1.className = 'px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200';
    cell1.textContent = key;

    const cell2 = document.createElement('td');
    cell2.className = 'px-2 py-3 text-right';
    cell2.textContent = formatCurrency(currentValue);

    const cell3 = document.createElement('td');
    cell3.className = 'px-2 py-3 text-right';
    cell3.textContent = formatCurrency(stressedValue);

    const cell4 = document.createElement('td');
    cell4.className = `px-2 py-3 text-right font-bold ${impact < 0 ? 'text-red-500' : 'text-green-500'}`;
    cell4.textContent = formatPercent(impact);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    tableBody.appendChild(row);
  });
}

// Function to render stress chart
function renderStressChart(currentValue, stressedValue) {
  const ctx = document.getElementById('stressChart');
  if (!ctx) return;

  if (stressChartInstance) {
    stressChartInstance.destroy();
  }

  stressChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Current Value', 'Stressed Value'],
      datasets: [{
        label: 'Portfolio Value ($)',
        data: [currentValue, stressedValue],
        backgroundColor: ['rgba(82, 208, 220, 0.8)', 'rgba(214, 77, 63, 0.8)'],
        borderColor: ['rgba(82, 208, 220, 1)', 'rgba(214, 77, 63, 1)'],
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
            }
          }
        }
      }
    }
  });
}

// Function to update severity display
function updateSeverityDisplay() {
  const severity = document.getElementById('stressSeverity').value;
  document.getElementById('severityValue').textContent = severity + '%';
}

// Function to reset stress test
function resetStressTest() {
  document.getElementById('stressScenario').value = 'bear';
  document.getElementById('stressSeverity').value = '50';
  updateSeverityDisplay();

  // Clear results
  document.getElementById('stressCurrentValue').textContent = '-';
  document.getElementById('stressStressedValue').textContent = '-';
  document.getElementById('stressLossAmount').textContent = '-';
  document.getElementById('stressLossPercent').textContent = '-';

  // Clear table
  const tableBody = document.getElementById('stressAssetTable');
  if (tableBody) tableBody.innerHTML = '';

  // Destroy chart
  if (stressChartInstance) {
    stressChartInstance.destroy();
    stressChartInstance = null;
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  const runBtn = document.getElementById('runStressTestBtn');
  if (runBtn) {
    runBtn.addEventListener('click', runStressTest);
  }

  const resetBtn = document.getElementById('resetStressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetStressTest);
  }

  const severitySlider = document.getElementById('stressSeverity');
  if (severitySlider) {
    severitySlider.addEventListener('input', updateSeverityDisplay);
  }

  // Initial setup
  updateSeverityDisplay();
});
