function getInputValue(name) {
  return Number(document.querySelector(`[data-input="${name}"]`).value);
}

function stringToMoney(str) {
  return Number(str).toLocaleString("ru-RU") + " ₽";
}

function calculateCapital(
  startingCapital,
  monthlyContribution,
  annualRate,
  years,
) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return startingCapital + monthlyContribution * months;
  }

  return (
    startingCapital * Math.pow(1 + monthlyRate, months) +
    monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );
}

function handleSubmit(event) {
  event.preventDefault();
  calculate();
}
function calculate() {
  const startingCapital = getInputValue("starting-capital");
  const income = getInputValue("income");
  const annualRate = getInputValue("annual-rate");

  const housingExpenses = getInputValue("housing-expenses");
  const groceriesExpenses = getInputValue("groceries-expenses");
  const transportExpenses = getInputValue("transport-expenses");
  const otherExpenses = getInputValue("other-expenses");
  console.log(
    housingExpenses,
    groceriesExpenses,
    transportExpenses,
    otherExpenses,
  );

  const expensesMonthly =
    housingExpenses + groceriesExpenses + transportExpenses + otherExpenses;

  const progressbarRate = document.querySelector(
    '[data-result="savings-rate"]',
  );
  const progressbarRateIncome = document.querySelector(
    ".progress-bar__segment",
  );

  const remainderMonthlyEl = document.querySelector(
    `[data-result="remainder-monthly"`,
  );
  const remainderMonthly = income - expensesMonthly;
  const remainderMonthlyRateEl = document.querySelector(
    `[data-result="remainder-monthly-rate"]`,
  );
  const remainderRate = (remainderMonthly / income) * 100;

  const expensesRate = (expensesMonthly / income) * 100;

  progressbarRate.textContent = `${remainderRate > 0 ? (100 - remainderRate).toFixed(2) : remainderRate.toFixed(2)}%`;
  progressbarRateIncome.style.width = `${100 - remainderRate}%`;

  const expensesMonthlyEl = document.querySelector(
    '[data-result="expenses-monthly"]',
  );
  animateNumber(expensesMonthlyEl, Number(expensesMonthly), stringToMoney);
  animateNumber(remainderMonthlyEl, Number(remainderMonthly));
  animateNumber(
    remainderMonthlyRateEl,
    Number(
      remainderRate > 0
        ? (100 - remainderRate).toFixed(2)
        : remainderRate.toFixed(2),
    ),
  );

  /*
  const capitalFiveIncome = capitalFiveResult - fiveContributions;

  const capitalTenIncome = capitalTenResult - tenContributions;
  const monthlyContribution = savings;
  const capitalFiveIncomeRate = (capitalFiveIncome / capitalFiveResult) * 100;

  const capitalTenIncomeRate = (capitalTenIncome / capitalTenResult) * 100;

  const capitalFiveResult = calculateCapital(
    startingCapital,
    monthlyContribution,
    annualRate,
    5,
  );
  const capitalTenResult = calculateCapital(
    startingCapital,
    monthlyContribution,
    annualRate,
    10,
  );

  const capitalFive = document.querySelector(
    '[data-result="capital-5-contribution"]',
  );
  const capitalFiveRate = document.querySelector(
    '[data-result="capital-5-rate"]',
  );
  const capitalTen = document.querySelector(
    '[data-result="capital-10-contribution"]',
  );
  const capitalTenRate = document.querySelector(
    '[data-result="capital-10-rate"]',
  );

  capitalFive.textContent = stringToMoney(capitalFiveResult);
  capitalTen.textContent = stringToMoney(capitalTenResult);

  capitalFiveRate.textContent = `${capitalFiveIncomeRate.toFixed(1)}%`;
  capitalTenRate.textContent = `${capitalTenIncomeRate.toFixed(1)}%`;
  */
  return;
}

function handleReset(event) {
  event.preventDefault();
  reset();
}
function reset() {
  const startingCapital = document.querySelector(
    '[data-input="starting-capital"]',
  );
  const income = document.querySelector('[data-input="income"]');
  const housingExpenses = document.querySelector(
    '[data-input="housing-expenses"]',
  );
  const groceriesExpenses = document.querySelector(
    '[data-input="groceries-expenses"]',
  );
  const transportExpenses = document.querySelector(
    '[data-input="transport-expenses"]',
  );
  const otherExpenses = document.querySelector('[data-input="other-expenses"]');
  const annualRate = document.querySelector(`[data-input="annual-rate"]`);

  startingCapital.value = 10000;
  income.value = 100000;
  housingExpenses.value = 20000;
  groceriesExpenses.value = 25000;
  transportExpenses.value = 5000;
  otherExpenses.value = 10000;
  annualRate.value = 12;

  calculate();

  return;
}

document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.querySelector("#calculator-form");

  reset();
  calculate();

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", handleReset);
});

function animateNumber(element, target, fn, duration = 800) {
  start = Number(element.dataset.value);
  const startTime = performance.now();

  function update(currentTime) {
    //console.log(element, start, target);
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);

    element.dataset.value = value;
    element.textContent = fn ? fn(value) : value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
