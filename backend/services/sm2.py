from dataclasses import dataclass
from datetime import date, timedelta


@dataclass
class SM2Card:
    repetitions: int = 0
    easiness: float = 2.5
    interval_days: int = 1
    next_review: date = None

    def __post_init__(self):
        if self.next_review is None:
            self.next_review = date.today()


def review(card: SM2Card, quality: int) -> SM2Card:
    """
    quality: 0–5 (0 = complete blackout, 5 = perfect)
    Returns updated card. Pure function — no DB calls.
    """
    assert 0 <= quality <= 5

    if quality < 3:
        repetitions = 0
        interval = 1
    else:
        if card.repetitions == 0:
            interval = 1
        elif card.repetitions == 1:
            interval = 6
        else:
            interval = round(card.interval_days * card.easiness)
        repetitions = card.repetitions + 1

    easiness = max(1.3, card.easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

    return SM2Card(
        repetitions=repetitions,
        easiness=easiness,
        interval_days=interval,
        next_review=date.today() + timedelta(days=interval),
    )
