from fastapi import APIRouter

router = APIRouter()


@router.get("")
def get_lessons(market: str = "india"):
    return {"market": market, "lessons": []}


@router.get("/{lesson_id}")
def get_lesson(lesson_id: str):
    return {"lesson_id": lesson_id, "questions": []}


@router.post("/{lesson_id}/answer")
def submit_answer(lesson_id: str):
    return {"correct": False, "explanation": ""}


@router.post("/{lesson_id}/complete")
def complete_lesson(lesson_id: str):
    return {"xp_earned": 0, "streak_updated": False}
