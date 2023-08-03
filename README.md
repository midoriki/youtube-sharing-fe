# Youtube video sharing app FE

This project is the frontend of Youtube video sharing app. The backend is [here](https://github.com/midoriki/youtube-sharing-be).

It was initialized by [Create-React-App](https://create-react-app.dev/) and customized with [Craco](https://craco.js.org/).

## Overview

This app allows users to share funny videos from Youtube to others. Users are not required to login to be able to see shared videos but will need to create an account to start sharing and leave impressions.

Simply copy Youtube video's link and let everyone experience the joy you have had.

## Development guide

### Prerequisites

- NodeJS version 16.20

- [Backend API](https://github.com/midoriki/youtube-sharing-be)

It's recommended to use [nvm](https://github.com/nvm-sh/nvm) as a Version manager

### Setup

Install dependencies

`npm install`

Make a copy of `.env.example`

`cp .env.example .env`

Start project in dev mode

`npm run dev`

By default project will run at port [8000](http://localhost:8000)

### Stories

We use [Ladle](https://ladle.dev/) as a light weight alternative to Storybook, to help us develop and test React's components faster.

Write your stories in `stories` directory and run `npm run ladle` to start.

### Testing

We use [Jest](https://jestjs.io/) and [React testing library](https://testing-library.com/docs/react-testing-library/intro/).

Components should have `data-testid` for easier query.

Mock data should be created with [fakerjs](https://fakerjs.dev/guide/) to ensure component can work with different value of data.

### Libraries

This project heavily make use of [Mantine](https://mantine.dev/pages/getting-started/) for styles and components.

Routing is done with the help of [ReactRouter](https://reactrouter.com/en/main).

## Scripts

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run test:coverage`

Launches the test runner in the interactive watch mode and generate coverage report.

### `npm run lint`

Run the linter.

### `npm run list:fix`

Run the linter and fix all auto-fixable issues.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run ladle`

Launches the [Ladle](https://ladle.dev/) storybook at http://localhost:61000/