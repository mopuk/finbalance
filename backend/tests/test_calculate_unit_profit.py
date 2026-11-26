from decimal import Decimal

import pytest

from calculator.services import calculate_unit_profit


@pytest.mark.parametrize(
    "unit_costs, unit_price, fixed_costs, expected_unit_profit, expected_margin_percent, expected_bep_units, expected_bep_revenue",
    [
        pytest.param(
            {"creation_cost": Decimal("10.0"), "some_other_cost": Decimal("5.0")},
            Decimal("20.0"),
            Decimal("100.0"),
            Decimal("5.00"),
            Decimal("25.00"),
            Decimal("20.0"),
            Decimal("400.00"),
            id="profitable_unit",
        ),
        pytest.param(
            {"creation_cost": Decimal("15.0"), "some_other_cost": Decimal("5.0")},
            Decimal("20.0"),
            Decimal("100.0"),
            Decimal("0.00"),
            Decimal("0.00"),
            None,
            None,
            id="break_even_unit",
        ),
        pytest.param(
            {"creation_cost": Decimal("25.0"), "some_other_cost": Decimal("5.0")},
            Decimal("20.0"),
            Decimal("100.0"),
            Decimal("-10.00"),
            Decimal("-50.00"),
            None,
            None,
            id="unprofitable_unit",
        ),
        pytest.param(
            {},
            Decimal("0.0"),
            Decimal("100.0"),
            Decimal("0.00"),
            Decimal("0.00"),
            None,
            None,
            id="zero_price_and_empty_costs",
        ),
        pytest.param(
            {"creation_cost": Decimal("10.0"), "some_other_cost": Decimal("5.0")},
            Decimal("20.0"),
            Decimal("99.0"),
            Decimal("5.00"),
            Decimal("25.00"),
            Decimal("19.8"),
            Decimal("396.00"),
            id="bep_rounding",
        ),
    ],
)
def test_calculate_unit_profit(
    unit_costs,
    unit_price,
    fixed_costs,
    expected_unit_profit,
    expected_margin_percent,
    expected_bep_units,
    expected_bep_revenue,
):
    res = calculate_unit_profit(unit_costs, unit_price, fixed_costs)
    assert res["unit_profit"] == expected_unit_profit
    assert res["margin_percent"] == expected_margin_percent
    assert res["bep_units"] == expected_bep_units
    assert res["bep_revenue"] == expected_bep_revenue
