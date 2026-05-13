from fastapi import APIRouter

router = APIRouter()


@router.get("/weekly")
def weekly_leaderboard(market: str = "india"):
    return {"market": market, "rankings": []}


@router.get("/me")
def my_rank():
    return {"rank": None, "xp": 0}
