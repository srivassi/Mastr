import os
import logging
import anthropic

logger = logging.getLogger(__name__)

_client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
_MODEL  = "claude-sonnet-4-20250514"

_MARKET_CTX = {
    "india": "Indian stock market (NSE/BSE, SEBI regulation, RBI monetary policy)",
    "eu":    "European markets (ECB, ESMA regulation, euro-denominated)",
    "us":    "US markets (Fed, SEC regulation, dollar-denominated)",
}


async def explain_wrong_answer(
    question: str,
    user_answer: str,
    correct_answer: str,
    short_explanation: str,
    user_level: int,
    market: str,
) -> str:
    """Tradr track: explain a wrong answer in 60–75 words with market context."""
    market_ctx = _MARKET_CTX.get(market, _MARKET_CTX["india"])
    prompt = f"""You are Pip, Mastr's friendly financial coach. A user just got a question wrong.

Market context: {market_ctx}
Question: {question}
They answered: {user_answer}
Correct answer: {correct_answer}
Hint: {short_explanation}
User level: {user_level}/50

Explain why they were wrong in 60–75 words. Be warm and encouraging, never condescending.
Use a real-world analogy relevant to their market where possible.
End with one short sentence of encouragement.
Do not start with "I" or "As Pip". Jump straight into the explanation."""

    response = await _client.messages.create(
        model=_MODEL,
        max_tokens=200,
        timeout=10.0,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text  # type: ignore[union-attr]


async def explain_code_wrong_answer(
    question: str,
    user_answer: str,
    correct_answer: str,
    short_explanation: str,
    user_level: int,
    question_type: str = "mcq",
) -> str:
    """Codr track: explain a wrong code/DSA answer in 60–75 words."""
    prompt = f"""You are Pip, a friendly coding interview coach on Mastr.

Question type: {question_type}
Question: {question}
They answered: {user_answer}
Correct answer: {correct_answer}
Hint: {short_explanation}
User level: {user_level}/50

Explain why they were wrong in 60–75 words. Be encouraging.
If it's a fill-in-the-blank, explain WHY that specific token is correct — the mechanism, not just the name.
If it's a bug, explain what would actually happen at runtime with that bug present.
End with one sentence of encouragement.
Do not start with "I" or "As Pip"."""

    response = await _client.messages.create(
        model=_MODEL,
        max_tokens=200,
        timeout=10.0,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text  # type: ignore[union-attr]


async def explain_headline(
    headline: str,
    body_snippet: str,
    market: str,
    user_level: int,
) -> str:
    """Markets tab: explain a financial headline in plain English."""
    prompt = f"""You are Pip, a friendly financial educator on Mastr.

Market: {market}
User level: {user_level}/50
Headline: "{headline}"
Context: {body_snippet}

Explain what this means for someone learning about markets.
100–120 words. Plain English — define jargon inline.
Structure: [what happened] → [why it matters] → [what to watch next].
End with: "What to watch: [one specific follow-up]".
Do not start with "I" or "As Pip"."""

    response = await _client.messages.create(
        model=_MODEL,
        max_tokens=250,
        timeout=10.0,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text  # type: ignore[union-attr]


async def deep_dive(topic: str, context: str, market: str, user_level: int) -> str:
    """User-initiated deep dive on a topic after a lesson question."""
    prompt = f"""You are a financial educator on Mastr.
Market: {market} | User level: {user_level}/50
Topic: {topic}
What the user just learned: {context}

130–160 words. Use a real historical example from {market} markets if possible.
Make it feel like insight, not a textbook. Write in prose, no bullet points."""

    response = await _client.messages.create(
        model=_MODEL,
        max_tokens=300,
        timeout=10.0,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text  # type: ignore[union-attr]
