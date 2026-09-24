document.addEventListener("DOMContentLoaded", () => {
  const RATE_ANNUAL = 0.12; // Фиксированная базовая ставка 12% годовых
  const MONTHLY_RATE = RATE_ANNUAL / 12;

  const inputIncome = document.querySelector('[data-potential-input="income"]');
  const inputSpendings = document.querySelector(
    '[data-potential-input="spendings"]',
  );

  if (!inputIncome || !inputSpendings) return;

  const elements = {
    surplusMonthly: document.querySelector(
      '[data-potential-result="surplus-monthly"]',
    ),
    surplusRate: document.querySelector(
      '[data-potential-result="surplus-rate"]',
    ),
    capital5: document.querySelector('[data-potential-result="capital-5"]'),
    capital10: document.querySelector('[data-potential-result="capital-10"]'),
    segmentDeposit: document.querySelector(
      '[data-potential-result="segment-deposit"]',
    ),
    segmentIncome: document.querySelector(
      '[data-potential-result="segment-income"]',
    ),
    ratioDeposit: document.querySelector(
      '[data-potential-result="ratio-deposit"]',
    ),
    ratioIncome: document.querySelector(
      '[data-potential-result="ratio-income"]',
    ),
    invested10: document.querySelector('[data-potential-result="invested-10"]'),
    investedDesc: document.querySelector(
      '[data-potential-result="invested-desc"]',
    ),
    gainPercent: document.querySelector(
      '[data-potential-result="gain-percent"]',
    ),
    gainMoney: document.querySelector('[data-potential-result="gain-money"]'),
  };

  function parseInputValue(el) {
    if (!el) return 0;
    const cleanStr = el.value.replace(/\s+/g, "").replace(",", ".");
    return Math.max(0, Number(cleanStr) || 0);
  }

  function formatMoney(amount, sign = "") {
    return `${sign}${Math.round(amount).toLocaleString("ru-RU")} ₽`;
  }

  function calculateFutureValue(monthlyDeposit, years) {
    if (monthlyDeposit <= 0) return 0;
    const months = years * 12;
    // Формула FV регулярного аннуитета с ежемесячной капитализацией
    // S = PMT * [((1 + r)^n - 1) / r]
    return (
      monthlyDeposit * ((Math.pow(1 + MONTHLY_RATE, months) - 1) / MONTHLY_RATE)
    );
  }

  function animateValue(el, target, formatter = (v) => v, duration = 300) {
    if (!el) return;
    const start = Number(el.dataset.val) || 0;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);

      el.dataset.val = current;
      el.textContent = formatter(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  function update() {
    const income = parseInputValue(inputIncome);
    const spendings = parseInputValue(inputSpendings);

    const surplus = Math.max(0, income - spendings);
    const surplusPercent =
      income > 0 ? ((surplus / income) * 100).toFixed(1) : "0.0";

    animateValue(elements.surplusMonthly, surplus, (v) => formatMoney(v));
    if (elements.surplusRate) {
      elements.surplusRate.textContent = `${surplusPercent}% дохода`;
    }

    const fv5 = calculateFutureValue(surplus, 5);
    animateValue(elements.capital5, fv5, (v) => formatMoney(v));

    const months10 = 120;
    const fv10 = calculateFutureValue(surplus, 10);
    const invested10 = surplus * months10;
    const gain10 = Math.max(0, fv10 - invested10);

    animateValue(elements.capital10, fv10, (v) => formatMoney(v));
    animateValue(elements.invested10, invested10, (v) => formatMoney(v));
    animateValue(elements.gainMoney, gain10, (v) => formatMoney(v, "+"));

    if (elements.investedDesc) {
      elements.investedDesc.textContent = `${Math.round(surplus).toLocaleString("ru-RU")} ₽/мес`;
    }

    const gainPercentVal =
      invested10 > 0 ? Math.round((gain10 / invested10) * 100) : 0;
    if (elements.gainPercent) {
      elements.gainPercent.textContent = `+${gainPercentVal}%`;
    }

    let depositRatio = 50;
    let incomeRatio = 50;

    if (fv10 > 0) {
      depositRatio = Math.round((invested10 / fv10) * 100);
      incomeRatio = 100 - depositRatio;
    }

    if (elements.ratioDeposit)
      elements.ratioDeposit.textContent = `${depositRatio}%`;
    if (elements.ratioIncome)
      elements.ratioIncome.textContent = `${incomeRatio}%`;

    if (elements.segmentDeposit)
      elements.segmentDeposit.style.width = `${depositRatio}%`;
    if (elements.segmentIncome)
      elements.segmentIncome.style.width = `${incomeRatio}%`;
  }

  [inputIncome, inputSpendings].forEach((input) => {
    input.addEventListener("input", update);
  });

  update();
});
