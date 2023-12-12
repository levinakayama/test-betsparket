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

- Install packages React.js
```
npm install
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

- Try access the link
- http://localhost:3000

## What was created
- Water Jug Challenge

## How was it resolved
- Create the layout first, with the buttons specified in the rules and animations
- Allows entry of 3 values, X, Y and Z, according to test restrictions
- To identify when there is no solution, check the smallest limit between X and Y and apply %2 of the result and compare it with %2 of Z.
- Success is when X or Y reaches the value of Z.