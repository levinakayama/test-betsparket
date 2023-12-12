FROM node:18

# Criação do diretório de trabalho do aplicativo
WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y openssl

RUN git config --global --add safe.directory /app

RUN npm install --global serve

RUN yarn install

CMD yarn $YARN_COMMAND
