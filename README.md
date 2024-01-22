# ExpressJS App implementing Authentication Flow

A simple **JASON Web Token** authentication system developed with **Node** and **Typescript**.

- **Prisma** with **PostgreSQL**
- **Express**

A demo for the project can be find at this [link](https://node-auth-otpd.onrender.com/)

## How to run it locally

After downloading this code a **.env** is required to setup some Environment variables.

- DATABASE_URL
- PORT
- JWT_SECRET
- JWT_EXPIRES_IN
- JWT_COOKIE_EXPIRES_IN
- RESEND_API_KEY

> **Resend** is the service used for emails

### Install all packages

```bash
yarn install
```

### Setup for DB

```bash
yarn prisma db push
```

### Run it

```bash
yarn dev
```
