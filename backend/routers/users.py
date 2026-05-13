from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class MarketUpdate(BaseModel):
    market: str


@router.get("/profile")
def get_profile():
    return {}


@router.patch("/market")
def update_market(body: MarketUpdate):
    return {"market": body.market}


@router.post("/streak/check")
def check_streak():
    return {"streak_updated": False}


@router.post("/hearts/use")
def use_heart():
    return {"hearts_remaining": 5}


@router.get("/reviews/due")
def get_due_reviews():
    return {"reviews": []}
