from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ExplainRequest(BaseModel):
    headline: str
    body_snippet: str = ""
    market: str = "india"
    user_level: int = 1


@router.get("/{market_id}")
def get_headlines(market_id: str):
    return {"market": market_id, "headlines": []}


@router.post("/explain")
async def explain_headline(req: ExplainRequest):
    from services.claude_service import explain_headline as _explain
    text = await _explain(req.headline, req.body_snippet, req.market, req.user_level)
    return {"explanation": text}
