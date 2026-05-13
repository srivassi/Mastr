from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import lessons, scenarios, markets, news, users, leaderboard

app = FastAPI(title="Tradr API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lessons.router,     prefix="/lessons",     tags=["lessons"])
app.include_router(scenarios.router,   prefix="/scenarios",   tags=["scenarios"])
app.include_router(markets.router,     prefix="/markets",     tags=["markets"])
app.include_router(news.router,        prefix="/news",        tags=["news"])
app.include_router(users.router,       prefix="/user",        tags=["users"])
app.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])


@app.get("/health")
def health():
    return {"status": "ok"}
