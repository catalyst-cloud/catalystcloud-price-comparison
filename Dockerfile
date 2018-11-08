FROM python:3

ADD . /home

WORKDIR /home

RUN pip install -r requirements.txt

ENTRYPOINT /bin/bash
