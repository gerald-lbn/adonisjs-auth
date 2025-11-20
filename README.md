# Adonisjs-auth

A playground to experiment with [AdonisJS] framework, authentication and [dependency injection](https://docs.adonisjs.com/guides/concepts/dependency-injection). This is not meant to be use in production.

## What's included

- Registration
- Login
- Account verification
- 2FA with TOTP

## Left to be done

- [x] Send the OTP code via email
- [x] Mark the user as verified
- [ ] Use the `valudUntil` when verify the OTP
- [ ] Test repositories
- [x] Add 2FA with QRCode

## Get started

### Docker deployment

Ensure your have [Docker](docs.docker.com/get-docker) and [Docker Compose](docs.docker.com/compose/install) installed.

#### 1. Set up your docker-compose.yml configuration

- Copy `.env.example` as `.env` in the same directory as your `docker-compose.yml`
- Generate an `APP_KEY` with `openssl` like so `openssl rand -base64 32`
- Set `DB_HOST` to `database` which will be the name of our database container
- Set `SMTP_HOST` to `mailer` which will be the name of our email server later

#### 2. Create a `docker-compose.yml` file that references the `.env` variables

```yml
services:
  app:
    image: ghcr.io/gerald-lbn/adonisjs-auth:main
    ports:
      - 3334:3334
    environment:
      - TZ=${TZ}
      - PORT=${PORT}
      - HOST=0.0.0.0
      - LOG_LEVEL=${LOG_LEVEL}
      - APP_KEY=${APP_KEY}
      - NODE_ENV=production
      - SESSION_DRIVER=cookie
      - DB_HOST=database
      - DB_PORT=${DB_PORT}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_DATABASE=${DB_DATABASE}
      - SMTP_HOST=mailer
      - SMTP_PORT=${SMTP_PORT}
    depends_on:
      - database

  database:
    image: postgres:16-alpine3.19
    ports:
      - 5432:5432
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}

  mailer:
    image: axllent/mailpit
    ports:
      - 1025:1025
      - 8025:8025
    restart: unless-stopped

volumes:
  postgres-data:
```

#### 3. Start the containers

```bash
docker compose -f docker-compose.yml up -d
```

#### 4. Access the app

Once the containers are up and running, access the app in your browser at

```
http://localhost:3334
```

### Development

- Clone the repo
- Install dependencies with `npm install`
- Copy `.env.example` in `.env`
- Run the development server with `npm run dev`

Routes:
- `/`: An empty home page
- `/login`: To log into your account
- `/register` To create an account
- `/verify-account` To verify your account with an OTP sent via email
- `/2fa/setup` To setup 2FA with TOTP

## Tests

Before running any test, make sure you have container with a database up and migrations up to date.
You can use docker with the following command: `docker compose -f compose.yml up` to start the containers and `node ace migrations:run` to run migrations

To run both unit and functional test use the following command: `node ace test`.

### Unit tests

These tests are stores in [tests/unit](./tests/unit)

### Functional tests

These tests are stores in [tests/functional](./tests/functional)


## Deployment

The application can be containerized in a docker container using [Dockerfile](./Dockerfile)
