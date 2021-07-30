# student crud microservice

Using Fastify framework

### Prerequisites:

1. Download and Install node.js > 14 [(link)](https://nodejs.org/en/download/)
2. MongoDB

### Setup

```
mkdir fastify-crud
cd fastify-crud
```

For boilerplate fastify code, type

```
npm init fastify
npm install
```

Create file with .env by filling values of fields in `env.example`

### Development

To run in dev mode for auto reload and pretty logging

`npm run-script dev`

The server will be listening by default at `http://localhost:3000`

API Documentation is available at `http://localhost:3000/documentation`

- [x] CRUD REST APIs
- [x] Request validations
- [x] API Documentation

### Docker

```
docker build --tag crud_ms:0.0.1 .
docker image ls
docker container run --publish 3000:3000 crud_ms:0.0.1
docker ps -a
```
