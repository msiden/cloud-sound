FROM python:3.11-slim-buster as builder

COPY ./requirements.txt /tmp/requirements.txt
COPY . /usr/src/app

RUN pip install -r /tmp/requirements.txt

WORKDIR /usr/src/app

EXPOSE 8080

CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:8080", "app:app()"]
