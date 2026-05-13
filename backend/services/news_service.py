import os
import httpx
from typing import Optional

_NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")

_KEYWORDS = {
    "india": "NSE OR BSE OR SEBI OR RBI OR Nifty OR Sensex",
    "eu":    "ECB OR DAX OR eurozone OR \"European stocks\"",
    "us":    "\"S&P 500\" OR Fed OR NASDAQ OR \"Wall Street\"",
}


async def get_headlines(market: str, page_size: int = 10) -> list[dict]:
    if not _NEWSAPI_KEY:
        return _mock_headlines(market)

    q = _KEYWORDS.get(market, "stock market")
    url = (
        f"https://newsapi.org/v2/everything"
        f"?q={q}&language=en&sortBy=publishedAt&pageSize={page_size}"
        f"&apiKey={_NEWSAPI_KEY}"
    )
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(url)
        resp.raise_for_status()
        articles = resp.json().get("articles", [])

    return [
        {
            "id":           a.get("url", ""),
            "title":        a.get("title", ""),
            "source":       a.get("source", {}).get("name", ""),
            "published_at": a.get("publishedAt", ""),
            "url":          a.get("url", ""),
            "body_snippet": (a.get("description") or "")[:300],
        }
        for a in articles
    ]


def _mock_headlines(market: str) -> list[dict]:
    return [
        {
            "id":           "mock-1",
            "title":        f"[Mock] {market.upper()} markets open flat",
            "source":       "Tradr Dev",
            "published_at": "2026-05-13T09:00:00Z",
            "url":          "",
            "body_snippet": "Placeholder headline for development.",
        }
    ]
