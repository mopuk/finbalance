from decimal import Decimal
from typing import TypedDict

from . import _round_money


class YearlyProjection(TypedDict):
    year: int
    total_contributions: Decimal
    interest_earned: Decimal
    total_amount: Decimal
    real_amount: Decimal


class CompoundInterestResponse(TypedDict):
    total_contributions: Decimal
    interest_earned: Decimal
    total_amount: Decimal
    real_amount: Decimal
    by_years: list[YearlyProjection]


def calculate_compound_interest(
    principal: Decimal,
    monthly_contribution: Decimal,
    annual_rate_percent: Decimal,
    annual_inflation_percent: Decimal,
    years: int,
    times_compounded: int = 12,
) -> CompoundInterestResponse:
    rate = annual_rate_percent / Decimal("100.0")
    inflation = annual_inflation_percent / Decimal("100.0")
    period_rate = rate / Decimal(times_compounded)
    contributions_per_period = monthly_contribution * (
        Decimal("12.0") / Decimal(times_compounded)
    )

    current_balance = principal
    total_contributions = principal
    by_years: list[YearlyProjection] = []

    for year in range(1, years + 1):
        for _ in range(times_compounded):
            current_balance = (current_balance + contributions_per_period) * (
                Decimal("1.0") + period_rate
            )
            total_contributions += contributions_per_period

        interest_earned = current_balance - total_contributions
        inflation_factor = (Decimal("1.0") + inflation) ** year
        real_amount = current_balance / inflation_factor

        by_years.append(
            {
                "year": year,
                "total_contributions": _round_money(total_contributions),
                "interest_earned": _round_money(interest_earned),
                "total_amount": _round_money(current_balance),
                "real_amount": _round_money(real_amount),
            }
        )

    final_year = by_years[-1] if by_years else None

    return {
        "total_contributions": (
            final_year["total_contributions"] if final_year else _round_money(principal)
        ),
        "interest_earned": (
            final_year["interest_earned"] if final_year else Decimal("0.00")
        ),
        "total_amount": (
            final_year["total_amount"] if final_year else _round_money(principal)
        ),
        "real_amount": (
            final_year["real_amount"] if final_year else _round_money(principal)
        ),
        "by_years": by_years,
    }
