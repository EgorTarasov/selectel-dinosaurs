FROM python:3.11-buster

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN ["pip3", "install", "-r", "requirements.txt"]
COPY . /app/