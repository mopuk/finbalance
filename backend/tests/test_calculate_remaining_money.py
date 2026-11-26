from decimal import Decimal

import pytest

from calculator.services import calculate_remaining_money


@pytest.mark.parametrize(
    "initial_amount, income, expenses, expected_total_expenses, expected_remaining, expected_savings_rate",
    [
        pytest.param(
            Decimal("1000.0"),
            Decimal("5000.0"),
            {"rent": Decimal("2000.0"), "food": Decimal("1000.0")},
            Decimal("3000.00"),
            Decimal("3000.00"),
            Decimal("40.00"),
            id="positive_savings",
        ),
        pytest.param(
            Decimal("500.0"),
            Decimal("3000.0"),
            {"rent": Decimal("3500.0")},
            Decimal("3500.00"),
            Decimal("0.00"),
            Decimal("-16.67"),
            id="budget_deficit_covered_by_initial",
        ),
        pytest.param(
            Decimal("200.0"),
            Decimal("3000.0"),
            {"rent": Decimal("3500.0")},
            Decimal("3500.00"),
            Decimal("-300.00"),
            Decimal("-16.67"),
            id="negative_balance_cash_gap",
        ),
        pytest.param(
            Decimal("1000.0"),
            Decimal("0.0"),
            {"food": Decimal("250.0")},
            Decimal("250.00"),
            Decimal("750.00"),
            Decimal("0.00"),
            id="zero_income_no_division_error",
        ),
        pytest.param(
            Decimal("500.0"),
            Decimal("4000.0"),
            {},
            Decimal("0.00"),
            Decimal("4500.00"),
            Decimal("100.00"),
            id="empty_expenses",
        ),
        pytest.param(
            Decimal("0.0"),
            Decimal("3000.0"),
            {"item_a": Decimal("333.334"), "item_b": Decimal("666.662")},
            Decimal("1000.00"),
            Decimal("2000.00"),
            Decimal("66.67"),
            id="fractional_expense_rounding",
        ),
    ],
)
def test_calculate_remaining_money(
    initial_amount,
    income,
    expenses,
    expected_total_expenses,
    expected_remaining,
    expected_savings_rate,
):
    res = calculate_remaining_money(initial_amount, income, expenses)
    assert res["total_expenses"] == expected_total_expenses
    assert res["remaining_money"] == expected_remaining
    assert res["savings_rate_percent"] == expected_savings_rate
