from fastapi import APIRouter

router = APIRouter()


@router.get("/daily")
def get_daily_scenario(market: str = "india"):
    return {"market": market, "scenario": None}


@router.post("/{scenario_id}/answer")
def submit_scenario_answer(scenario_id: str):
    return {"correct": False, "explanation": ""}
