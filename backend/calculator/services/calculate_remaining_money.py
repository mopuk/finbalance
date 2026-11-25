from decimal import Decimal
from typing import TypedDict

from . import _round_money


class BudgetRemainingResponse(TypedDict):
    total_expenses: Decimal
    savings_rate_percent: Decimal
    remaining_money: Decimal


def calculate_remaining_money(
    initial_amount: Decimal, income: Decimal, expenses: dict[str, Decimal]
) -> BudgetRemainingResponse:
    """Calculate the remaining money after expenses and the savings rate as a percentage of income"""
    total_expenses = sum(expenses.values(), Decimal("0.0"))
    remaining_money = initial_amount + income - total_expenses

    savings_rate = (
        _round_money((income - total_expenses) / income * Decimal("100.0"))
        if income > Decimal("0.00")
        else Decimal("0.00")
    )

    return {
        "total_expenses": _round_money(total_expenses),
        "remaining_money": _round_money(remaining_money),
        "savings_rate_percent": savings_rate,
    }
