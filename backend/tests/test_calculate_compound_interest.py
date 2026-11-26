from decimal import Decimal

import pytest

from calculator.services import calculate_compound_interest


@pytest.mark.parametrize(
    "principal, monthly_contributions, annual_rate_percent, annual_inflation_percent, years, times_compounded, expected_total, expected_real",
    [
        pytest.param(
            Decimal("1000.0"),
            Decimal("0.0"),
            Decimal("5.0"),
            Decimal("2.0"),
            10,
            12,
            Decimal("1647.01"),
            Decimal("1351.12"),
            id="lump_sum_monthly_10y",
        ),
        pytest.param(
            Decimal("5000.0"),
            Decimal("100.0"),
            Decimal("3.0"),
            Decimal("1.0"),
            20,
            12,
            Decimal("41933.97"),
            Decimal("34366.76"),
            id="contributions_monthly_20y",
        ),
        pytest.param(
            Decimal("1000.0"),
            Decimal("100.0"),
            Decimal("5.0"),
            Decimal("2.0"),
            10,
            4,
            Decimal("17090.49"),
            Decimal("14020.15"),
            id="quarterly_compounding_10y",
        ),
        pytest.param(
            Decimal("1000.0"),
            Decimal("100.0"),
            Decimal("5.0"),
            Decimal("2.0"),
            10,
            1,
            Decimal("16722.37"),
            Decimal("13718.16"),
            id="annual_compounding_10y",
        ),
    ],
)
def test_calculate_compound_interest(
    principal,
    monthly_contributions,
    annual_rate_percent,
    annual_inflation_percent,
    years,
    times_compounded,
    expected_total,
    expected_real,
):
    res = calculate_compound_interest(
        principal,
        monthly_contributions,
        annual_rate_percent,
        annual_inflation_percent,
        years,
        times_compounded,
    )
    assert res["total_amount"] == expected_total
    assert res["real_amount"] == expected_real


def test_standard_growth_ten_years():
    res = calculate_compound_interest(
        Decimal("1000.0"), Decimal("100.0"), Decimal("5.0"), Decimal("2.0"), 10, 12
    )
    assert len(res["by_years"]) == 10


def test_zero_interest_rate():
    res = calculate_compound_interest(
        Decimal("1000.0"), Decimal("100.0"), Decimal("0.0"), Decimal("2.0"), 10, 12
    )
    assert res["interest_earned"] == Decimal("0.00")
    assert res["total_amount"] == res["total_contributions"]
    assert res["total_amount"] > res["real_amount"]


def test_zero_inflation_rate():
    res = calculate_compound_interest(
        Decimal("1000.0"), Decimal("100.0"), Decimal("5.0"), Decimal("0.0"), 10, 12
    )
    assert res["real_amount"] == res["total_amount"]


def test_zero_years():
    res = calculate_compound_interest(
        Decimal("1000.0"), Decimal("100.0"), Decimal("5.0"), Decimal("2.0"), 0, 12
    )
    assert res["total_amount"] == Decimal("1000.00")
    assert res["real_amount"] == Decimal("1000.00")
    assert res["interest_earned"] == Decimal("0.00")
    assert res["by_years"] == []
