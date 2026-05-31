FROM python:3.12-slim
WORKDIR /app

RUN pip install uv

COPY pyproject.toml agent.py ./

# Inject all secrets as environment variables at runtime — never COPY .env in production
ENV UV_LINK_MODE=copy

CMD ["sh", "-c", "uv sync --frozen && uv run agent.py serve --host 0.0.0.0 --port 8080"]
