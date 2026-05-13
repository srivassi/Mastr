import os
import anthropic

_client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
_MODEL = "claude-sonnet-4-20250514"

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
    prompt = f"""You are Pip, Tradr's friendly financial coach. A user just got a question wrong.

Market context: {_MARKET_CTX[market]}
Question: {question}
They answered: {user_answer}
Correct answer: {correct_answer}
Hint: {short_explanation}
User level: {user_level}/50

Explain why they were wrong in 60–75 words. Be warm and encouraging, never condescending.
Use a real-world analogy relevant to their market where possible.
End with one short sentence of encouragement.
Do not start with "I" or "As Pip". Jump straight into the explanation."""

    response = _client.messages.create(
        model=_MODEL,
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


async def explain_headline(
    headline: str,
    body_snippet: str,
    market: str,
    user_level: int,
) -> str:
    prompt = f"""You are Pip, a friendly financial educator on Tradr.

Market: {market}
User level: {user_level}/50
Headline: "{headline}"
Context: {body_snippet}

Explain what this means for someone learning about markets.
100–120 words. Plain English — define jargon inline.
Structure: [what happened] → [why it matters] → [what to watch next].
End with: "What to watch: [one specific follow-up]".
Do not start with "I" or "As Pip"."""

    response = _client.messages.create(
        model=_MODEL,
        max_tokens=250,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


async def deep_dive(topic: str, context: str, market: str, user_level: int) -> str:
    prompt = f"""You are a financial educator on Tradr.
Market: {market} | User level: {user_level}/50
Topic: {topic}
What the user just learned: {context}

130–160 words. Use a real historical example from {market} markets if possible.
Make it feel like insight, not a textbook. Write in prose, no bullet points."""

    response = _client.messages.create(
        model=_MODEL,
        max_tokens=300,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text
