# Tradr

Gamified stock market education. Duolingo's UI and habit loop — applied to trading.

Mobile-first (Expo Go, install via QR). Multi-market: India 🇮🇳 / EU 🇪🇺 / US 🇺🇸.

---

## What is this?

Tradr teaches users to understand markets, read financial news critically, and think like a trader — through Duolingo-style gamification. Pick your home market on onboarding and every lesson, scenario, and live data pull is contextualised to it.

**Core features:**
- Structured lesson paths (beginner → advanced, unit-by-unit unlock)
- Live market data (yfinance — Nifty 50, DAX, S&P 500)
- Scenario engine — real recent events turned into coached questions
- AI explanations via Claude (wrong answers, headlines, deep dives)
- Media literacy curriculum — Unit 3+ teaches users to read headlines critically
- Pip the mascot — a bear cub who evolves into a golden bull as you level up

---

## Tech Stack

| Layer | Tech |
|---|---|
| Mobile | Expo (React Native) + TypeScript |
| Navigation | Expo Router (file-based) |
| Styling | NativeWind (Tailwind for RN) |
| Animations | React Native Reanimated + Lottie |
| State | Zustand |
| Backend | FastAPI (Python) |
| Database | Supabase |
| AI | Claude API (`claude-sonnet-4-20250514`) |
| Market data | yfinance |
| News | NewsAPI / RSS |

---

## Setup

### Prerequisites
- Node.js 18+, Python 3.11+
- `npm install -g expo`
- Expo Go app on your phone
- Supabase account (free tier)
- Anthropic API key

### Run

```bash
git clone https://github.com/srivassi/tradr && cd tradr

# Frontend
npm install
cp .env.example .env.local
npx expo start    # scan QR with Expo Go

# Backend
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

### Environment Variables

```bash
# .env.local (frontend)
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_BACKEND_URL=http://localhost:8000

# backend/.env
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
ENVIRONMENT=development
```

---

## Project Structure

```
tradr/
├── app/                    # Expo Router screens
│   ├── (auth)/             # welcome, onboarding, login, signup
│   ├── (tabs)/             # Learn, Markets, Practice, League, Profile
│   ├── lesson/[id].tsx
│   └── scenario/[id].tsx
├── components/             # UI components (Pip, lesson, markets, gamification)
├── backend/                # FastAPI
│   ├── routers/            # lessons, scenarios, markets, news, users, leaderboard
│   ├── services/           # claude_service, market_service, sm2, scenario_builder
│   └── models/
├── content/                # Lesson JSON (source of truth)
│   └── lessons/shared/ india/ eu/ us/
├── hooks/                  # useLesson, useStreak, useXP, useMarket, ...
├── store/                  # Zustand (userStore)
├── constants/              # theme, markets, pip
└── types/
```

---

> **Disclaimer:** Tradr is for educational purposes only. Nothing here constitutes financial advice.
