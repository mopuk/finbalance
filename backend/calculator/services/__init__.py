from decimal import ROUND_HALF_UP, Decimal


def _round_money(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


from .calculate_compound_interest import calculate_compound_interest
from .calculate_remaining_money import calculate_remaining_money
from .calculate_unit_profit import calculate_unit_profit
