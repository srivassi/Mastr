from fastapi import APIRouter
from services.market_service import get_market_indices, get_sector_performance, get_chart_data

router = APIRouter()


@router.get("/{market_id}/indices")
def indices(market_id: str):
    return get_market_indices(market_id)


@router.get("/{market_id}/sectors")
def sectors(market_id: str):
    return get_sector_performance(market_id)


@router.get("/{market_id}/chart/{ticker}")
def chart(market_id: str, ticker: str, period: str = "3mo"):
    return get_chart_data(ticker, period)
