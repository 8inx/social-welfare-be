# Social Welfare REST API

A backend node server for social welfare project

## Installation

Install yarn:
```bash
npm install -g yarn
```

Install dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--databases\      # Database connection
 |--docs\           # Swagger files
 |--exceptions\     # Custom http exceptions
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:8080/api-docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions and paths are written in the src/docs files.