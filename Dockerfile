FROM python:2.7-jessie
RUN apt-get update && apt-get install -y postgresql
ENV PYTHONUNBUFFERED 1
RUN mkdir /frontier
WORKDIR /frontier
ADD requirements.txt /frontier/
RUN pip install -r requirements.txt
