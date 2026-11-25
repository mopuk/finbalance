from decimal import ROUND_HALF_UP, Decimal
from typing import TypedDict

from . import _round_money


class UnitEconomicsResponse(TypedDict):
    unit_profit: Decimal
    margin_percent: Decimal
    bep_units: Decimal | None
    bep_revenue: Decimal | None


def calculate_unit_profit(
    unit_costs: dict[str, Decimal], unit_price: Decimal, fixed_costs: Decimal
) -> UnitEconomicsResponse:
    """Calculate the unit profit based on unit costs, unit price, fixed costs, bep and margin of safety"""
    total_variable_cost = sum(unit_costs.values(), Decimal("0.0"))
    unit_profit = unit_price - total_variable_cost

    margin_percent = (
        _round_money((unit_profit / unit_price) * Decimal("100.0"))
        if unit_price > Decimal("0.0")
        else Decimal("0.0")
    )

    if unit_profit > Decimal("0.0"):
        bep_units = (fixed_costs / unit_profit).quantize(
            Decimal("1.0"), rounding=ROUND_HALF_UP
        )
        bep_revenue = _round_money(bep_units * unit_price)
    else:
        bep_units = None
        bep_revenue = None

    return {
        "unit_profit": _round_money(unit_profit),
        "margin_percent": margin_percent,
        "bep_units": bep_units,
        "bep_revenue": bep_revenue,
    }
