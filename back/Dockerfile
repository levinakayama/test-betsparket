FROM golang

ENV TZ="America/Sao_Paulo"
RUN date

ADD . /app

WORKDIR /app

RUN go get 
RUN go install siios

ENTRYPOINT ["/go/bin/siios"]

EXPOSE 8000