# MSMI-News - README

Welcome to MSMI-News! This project provides an API for a news app that can be used to server articles to the end user.

The database consists of articles, comments, topics and users. This data can be requested by users and certain endpoints can be queried, as is detailed in the endpoints.json file, or at https://msmi-news.onrender.com/api/.

## Hosted database

The hosted database can be accessed [here](https://msmi-news.onrender.com/api/).

## Cloning the repository

The repository can be cloned via [GitHub](https://github.com/msmi1433/nc-news-project).

### Dependencies

The app has several dependencies that can be installed by executing `npm i` in the terminal.

For details regarding what these dependencies are, please refer to the package.json file.

### Seeding the database

To seed the database, execute the `npm run seed` script in the terminal.

## Running tests

Jest tests can be run by executing the `npm t` script.

## Environment variables

You will need to create environment variables (.env) for the test and development databases in order to connect to them.

They should be formatted as:

- .env.development
- .env.test

## Minimum requirements

Please ensure that you are running the below versions or higher:

- Node: v20.3.1
- PSQL: 15.3
