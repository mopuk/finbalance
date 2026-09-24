function getInputValue(name) {
  const el = document.querySelector(`[data-input="${name}"]`);
  return el ? Math.max(0, Number(el.value) || 0) : 0;
}

function stringToMoney(num) {
  return Number(num).toLocaleString("ru-RU") + " ₽";
}

function stringToIncome(num) {
  return "+ " + Number(num).toLocaleString("ru-RU") + " ₽";
}

function calculateCapitalModel(
  startingCapital,
  monthlyContribution,
  annualRate,
  years,
  model = "monthly",
) {
  const r = annualRate / 100;
  const totalMonths = years * 12;
  const totalContributions =
    startingCapital + monthlyContribution * totalMonths;

  if (r === 0) {
    return {
      total: totalContributions,
      contributed: totalContributions,
      income: 0,
    };
  }

  let total = startingCapital;

  if (model === "simple") {
    let interestFromInitial = startingCapital * r * years;
    let interestFromMonthly = 0;
    for (let m = 1; m <= totalMonths; m++) {
      const remainingYears = (totalMonths - m) / 12;
      interestFromMonthly += monthlyContribution * r * remainingYears;
    }
    const income = interestFromInitial + interestFromMonthly;
    total = totalContributions + income;
  } else {
    let periodsPerYear = 12;
    if (model === "quarterly") periodsPerYear = 4;
    if (model === "annual") periodsPerYear = 1;

    const ratePerPeriod = r / periodsPerYear;

    for (let m = 1; m <= totalMonths; m++) {
      total += monthlyContribution;
      if (model === "monthly") {
        total *= 1 + ratePerPeriod;
      } else if (model === "quarterly" && m % 3 === 0) {
        total *= 1 + ratePerPeriod;
      } else if (model === "annual" && m % 12 === 0) {
        total *= 1 + ratePerPeriod;
      }
    }
  }

  const income = Math.max(0, total - totalContributions);

  return {
    total: Math.round(total),
    contributed: Math.round(totalContributions),
    income: Math.round(income),
  };
}

function calculate() {
  const startingCapital = getInputValue("starting-capital");
  const income = getInputValue("income");
  const annualRate = getInputValue("annual-rate");
  const modelSelect = document.querySelector(
    '[data-input="calculation-model"]',
  );
  const model = modelSelect ? modelSelect.value : "monthly";

  const housingExpenses = getInputValue("housing-expenses");
  const groceriesExpenses = getInputValue("groceries-expenses");
  const transportExpenses = getInputValue("transport-expenses");
  const otherExpenses = getInputValue("other-expenses");

  const expensesMonthly =
    housingExpenses + groceriesExpenses + transportExpenses + otherExpenses;
  const remainderMonthly = Math.max(0, income - expensesMonthly);

  let savingsRate = 0;
  if (income > 0) {
    savingsRate = Math.min(100, Math.max(0, (remainderMonthly / income) * 100));
  }

  const progressbarRate = document.querySelector(
    '[data-result="savings-rate"]',
  );
  const progressbarSegment = document.querySelector(".progress-bar__segment");
  if (progressbarRate)
    progressbarRate.textContent = `${savingsRate.toFixed(1)}%`;
  if (progressbarSegment) progressbarSegment.style.width = `${savingsRate}%`;

  const expensesMonthlyEl = document.querySelector(
    '[data-result="expenses-monthly"]',
  );
  const remainderMonthlyEl = document.querySelector(
    '[data-result="remainder-monthly"]',
  );
  const remainderMonthlyRateEl = document.querySelector(
    '[data-result="remainder-monthly-rate"]',
  );

  if (expensesMonthlyEl)
    animateNumber(expensesMonthlyEl, expensesMonthly, stringToMoney);
  if (remainderMonthlyEl)
    animateNumber(remainderMonthlyEl, remainderMonthly, stringToMoney);
  if (remainderMonthlyRateEl)
    animateNumber(remainderMonthlyRateEl, Math.round(savingsRate));

  const result5 = calculateCapitalModel(
    startingCapital,
    remainderMonthly,
    annualRate,
    5,
    model,
  );
  const result10 = calculateCapitalModel(
    startingCapital,
    remainderMonthly,
    annualRate,
    10,
    model,
  );

  const cap5Sum = document.querySelector('[data-result="capital-5-sum"]');
  const cap5Contrib = document.querySelector(
    '[data-result="capital-5-contribution"]',
  );
  const cap5Rate = document.querySelector('[data-result="capital-5-rate"]');

  if (cap5Sum) animateNumber(cap5Sum, result5.total, stringToMoney);
  if (cap5Contrib)
    animateNumber(cap5Contrib, result5.contributed, stringToMoney);
  if (cap5Rate) animateNumber(cap5Rate, result5.income, stringToMoney);

  const cap10Sum = document.querySelector('[data-result="capital-10-sum"]');
  const cap10Contrib = document.querySelector(
    '[data-result="capital-10-contribution"]',
  );
  const cap10Rate = document.querySelector('[data-result="capital-10-rate"]');

  if (cap10Sum) animateNumber(cap10Sum, result10.total, stringToMoney);
  if (cap10Contrib)
    animateNumber(cap10Contrib, result10.contributed, stringToMoney);
  if (cap10Rate) animateNumber(cap10Rate, result10.income, stringToMoney);

  const growthPercentBadge = document.querySelector(
    '[data-result="growth-percent"]',
  );
  if (growthPercentBadge) growthPercentBadge.textContent = annualRate;

  const modelLabels = {
    monthly: "ежем. капитализация",
    quarterly: "ежекварт. капитализация",
    annual: "ежегодная капитализация",
    simple: "простые проценты",
  };
  const modelLabelEl = document.querySelector(
    '[data-result="growth-model-label"]',
  );
  if (modelLabelEl)
    modelLabelEl.textContent = modelLabels[model] || "капитализация";

  const tableRows = document.querySelectorAll(".growth-table__row[data-year]");
  tableRows.forEach((row) => {
    const years = Number(row.dataset.year);
    if (!years) return;

    const rowCalc = calculateCapitalModel(
      startingCapital,
      remainderMonthly,
      annualRate,
      years,
      model,
    );

    const cellContributed = row.querySelector(
      ".growth-table__cell--contributed",
    );
    const cellIncome = row.querySelector(".growth-table__cell--income");
    const cellTotal = row.querySelector(".growth-table__cell--total");

    if (cellContributed)
      animateNumber(cellContributed, rowCalc.contributed, stringToMoney);
    if (cellIncome) animateNumber(cellIncome, rowCalc.income, stringToIncome);
    if (cellTotal) animateNumber(cellTotal, rowCalc.total, stringToMoney);
  });
}

function reset() {
  const defaults = {
    "starting-capital": 10000,
    income: 100000,
    "housing-expenses": 20000,
    "groceries-expenses": 25000,
    "transport-expenses": 5000,
    "other-expenses": 10000,
    "annual-rate": 12,
  };

  Object.entries(defaults).forEach(([name, val]) => {
    const input = document.querySelector(`[data-input="${name}"]`);
    if (input) input.value = val;
  });

  const modelSelect = document.querySelector(
    '[data-input="calculation-model"]',
  );
  if (modelSelect) modelSelect.value = "monthly";

  calculate();
}

function animateNumber(element, target, fn, duration = 600) {
  const start = Number(element.dataset.value) || 0;
  const startTime = performance.now();

  function update(currentTime) {
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#calculator-form");
  const modelSelect = document.querySelector(
    '[data-input="calculation-model"]',
  );

  reset();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculate();
    });

    form.addEventListener("reset", (e) => {
      e.preventDefault();
      reset();
    });
  }

  if (modelSelect) {
    modelSelect.addEventListener("change", calculate);
  }
});
