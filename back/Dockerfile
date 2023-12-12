FROM golang

ENV TZ="America/Sao_Paulo"
RUN date

ADD . /app

WORKDIR /app

RUN go get 
RUN go install bucket

ENTRYPOINT ["/go/bin/bucket"]

EXPOSE 8000