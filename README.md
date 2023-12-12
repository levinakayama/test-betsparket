# TEST BETSPARKET

## Requirements
- Docker
- Docker Compose (version '2')
- React.js (18)
- Go (1.20)

## Understanding the structure
- ***/back*** (backend folder Go)
  - controllers/ (application layer)
  - helpers/ (helpers)
- ***/front*** (frontend folder React.js)

## Installation Instructions

> **_NOTA:_**  Use a Shell terminal.

- Access a folder of your choice to clone the project

- Clone the project with ***SSH***
```
git clone git@github.com:levinakayama/test-betsparket.git
```

- Or ***HTTPS***
```
git clone https://github.com/levinakayama/test-betsparket.git
```

- Access folder
```
cd test-betsparket
```

- Copy docker-compose file example
```
cp sample-docker-compose.yml docker-compose.yml
```

- Change the ***docker-compose.yml*** file if you have conflicts in the backend container port
```
ports:
  - '8040:8000'
```

- Change the ***docker-compose.yml*** file if you have conflicts in the frontend container port
```
ports:
  - '3000:3000'
```

- Access folder back
```
cd back/
```

- Copy backend env ***sample.env*** to ***.env***
```
cp sample.env .env
```

- Back folder and access frontend folder
```
cd ../front/
```

- Copy front env ***sample.env*** to ***.env***
```
cp sample.env .env
```

- Unzip ***node_modules.zip*** OR install packages ```npm install```
```
unzip node_modules.zip
```

- Back folder
```
cd ../
```

- Create bridge network
```
docker network create bucket-net
```
> **_NOTA:_**  If exists ignore this action.

- Build containers
```
docker-compose up -d --build
```

- Ao finalizar vamos instalar os pacotes das dependências
```
docker exec -it teste.api composer install
```
> **_NOTA:_**  O nome **teste.api** é o nome dado no container via atributo **container_name**, caso o atributo não funcionar na sua versão do docker-compose, é só renomear o container utilizando o comando `docker rename {id_do_container} teste.api`, o id do container pode ser consultado utilizando o comando `docker ps` procure o id na coluna **CONTAINER ID**.

- Vamos rodar o migrate da aplicação, por padrão já é criado automáticamente um usuário para acessar o sistema.
```
docker exec -it teste.api php artisan migrate
```
> **_NOTA:_**  O migrate irá criar um usuário **admin** e senha **admin** para acessar o ambiente e testar o CRUD

## Se sua máquina for linux ou mac leia
- No caso desses sitemas operacionais, as pastas do laravel **storage** ficam sem permissão de escrita, caso for execute os comandos abaixo.
```
sh chmod.sh
```
> **_NOTA:_**  O arquivo **chmod.sh** é um bash aplicando chmod nas pastas necessárias

## Testes unitários
- Caso queira executar os testes unitários, foram criados alguns cenários para atestar o conhecimento em PHPUnit.
```
docker exec -it teste.api vendor/bin/phpunit 
```

## Rodando a aplicação
- Na porta externa configurada no container **teste.api** no utilize para acessar o sistema http://localhost:{porta_configurada}/, caso não tenha alterado as portas basta acessar a parte default da configuração http://localhost:8016

## O que foi criado
- Seguindo os requisitos foi criado um CRUD de incidentes e adicionei um crud de usuários de acesso ao sistema.

## Dos requisitos algum não foi usado ?
- Todos os requisitos foram aplicados no teste com excessão do **redux**, no mais tudo foi seguido de acordo com o enunciado do teste.