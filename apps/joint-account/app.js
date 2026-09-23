const CONFIG = {
  monthlyExpenses: 30000,
  tristanIncome: 36000,
  rhiannonFixedIncome: 25141
};

const input = document.querySelector('#red-yellow');
const tristanPays = document.querySelector('#tristan-pays');
const rhiannonPays = document.querySelector('#rhiannon-pays');
const tristanPercent = document.querySelector('#tristan-percent');
const rhiannonPercent = document.querySelector('#rhiannon-percent');
const total = document.querySelector('#total');

const currency = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return currency.format(value).replace(/ /g, ' ');
}

function calculate() {
  const redYellowIncome = Math.max(0, Number(input.value) || 0);
  const rhiannonIncome = CONFIG.rhiannonFixedIncome + redYellowIncome;
  const combinedIncome = CONFIG.tristanIncome + rhiannonIncome;

  const tristanShare = CONFIG.tristanIncome / combinedIncome;
  const rhiannonShare = rhiannonIncome / combinedIncome;

  const tristanContribution = Math.round(CONFIG.monthlyExpenses * tristanShare);
  const rhiannonContribution = CONFIG.monthlyExpenses - tristanContribution;

  tristanPays.textContent = formatCurrency(tristanContribution);
  rhiannonPays.textContent = formatCurrency(rhiannonContribution);
  total.textContent = formatCurrency(CONFIG.monthlyExpenses);

  tristanPercent.textContent = `${(tristanShare * 100).toFixed(1)}% of household income`;
  rhiannonPercent.textContent = `${(rhiannonShare * 100).toFixed(1)}% of household income`;
}

input.addEventListener('input', calculate);
input.addEventListener('focus', () => {
  if (input.value === '0') {
    input.value = '';
  }
});

input.addEventListener('blur', () => {
  if (input.value === '') {
    input.value = '0';
  }

});
calculate();
