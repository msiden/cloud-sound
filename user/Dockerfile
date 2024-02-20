FROM python:3.9-slim

ENV PORT=8000
ENV UVICORN_PORT=${PORT}

COPY requirements.txt /tmp/
RUN groupadd --gid 10001 app && \
    useradd -g app --uid 10001 --shell /usr/sbin/nologin --create-home --home-dir /app app

RUN pip install --no-cache wheel -r /tmp/requirements.txt

WORKDIR /app

COPY src/main.py .

USER app

ENTRYPOINT ["uvicorn"]

CMD ["main:app", "--host", "0.0.0.0"]
