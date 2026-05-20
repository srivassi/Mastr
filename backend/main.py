import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import lessons, scenarios, markets, news, users, leaderboard

ENV = os.getenv("ENVIRONMENT", "development")

app = FastAPI(
    title="Mastr API",
    description="""
## Mastr — Gamified Learning Platform

Backend API for the Mastr app. Powers lessons, scenarios, live market data,
gamification (XP, streaks, hearts, leagues), and Claude AI integrations.

### Authentication
All protected routes require a Supabase JWT in the `Authorization` header:
```
Authorization: Bearer <supabase_access_token>
```

### Market IDs
All market-scoped endpoints accept `market_id` as one of: `india` · `eu` · `us`

### Rate Limits
Claude-powered endpoints (explain-headline, wrong-answer coaching) are limited to
**20 calls per user per hour**.
    """,
    version="0.1.0",
    docs_url="/docs"            if ENV != "production" else None,
    redoc_url="/redoc"          if ENV != "production" else None,
    openapi_url="/openapi.json" if ENV != "production" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lessons.router,     prefix="/lessons",     tags=["Lessons"])
app.include_router(scenarios.router,   prefix="/scenarios",   tags=["Scenarios"])
app.include_router(markets.router,     prefix="/markets",     tags=["Markets"])
app.include_router(news.router,        prefix="/news",        tags=["News"])
app.include_router(users.router,       prefix="/user",        tags=["User & Gamification"])
app.include_router(leaderboard.router, prefix="/leaderboard", tags=["Leaderboard"])


@app.get("/health", include_in_schema=False)
def health():
    return {"status": "ok", "version": "0.1.0", "environment": ENV}
