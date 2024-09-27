# Comment Management App

## Overview

This project is a simple web application for creating and deleting comments, built with **React**, **Vite**, and *
*TypeScript**. It showcases best practices in code organization, performance optimization, and user experience.
The application ensures that all comments added by users are stored in the Redux state. This state is persisted using
redux-persist, meaning that even if the user reloads the page, all previously added comments will remain visible. The
form input values (Full Name, Username, and Comment Body) are saved in the Redux store. If the user is in the middle of
filling out the form and the page is accidentally reloaded or navigated away from, their progress will be retained, and
the form will reload with the values they had previously entered.

## Features

- **Create Comments**: Users can add comments to a designated area.
- **Delete Comments**: Users can remove comments they no longer wish to display.
- **Responsive Design**: The app works seamlessly across various devices and screen sizes.
- **Real-time Updates**: Comments are displayed immediately without needing to refresh the page.
- **Persistent Data**: Both comments and form state are saved in the Redux store and persist even after a page reload.
  This ensures users don't lose their data and can continue where they left off.

## Technology Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Linting and Formatting**: ESLint, Prettier
- **Deployment**: GitHub Pages

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-link>
   cd <repository-folder>

   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up your environment variables by creating a .env file in the root directory and adding the following line:

   ```
   VITE_API_URL=<your_api_url>
   ```

## Scripts

The following scripts are available in `package.json`:

- **Development**: Start the development server.

  ```bash
  yarn dev
  ```

- **Build**: Compile TypeScript and build the project for production.

  ```bash
  yarn build
  ```

- **Preview**: Preview the built project locally.

  ```bash
  yarn preview
  ```

- **Deploy**: Build the project and deploy to GitHub Pages.

  ```bash
  yarn deploy
  ```

- **Lint**: Run ESLint to check for code quality issues.

  ```bash
  yarn lint
  ```

- **Fix Linting Issues**: Automatically fix linting issues.

  ```bash
  yarn lint:fix
  ```

- **Format Code**: Format the codebase using Prettier.

  ```bash
  yarn format
  ```

- **Run Unit tests**: Run unit tests.

  ```bash
  yarn test
  ```

## CI/CD

This project includes CI scripts for automated build and deployment processes. You can set up GitHub Actions to run
tests and deploy the app on each push to the main branch. Below is a basic structure of how to set up your GitHub
This configuration checks out your code, sets up Node.js, installs dependencies, builds the project, and deploys it to
GitHub Pages.

## Codebase Organization

The codebase is structured for maintainability and readability. Key files and directories include:

- **src/**: Contains the main application code.
- **tests/**: Contains unit tests for various components.
- **public/**: Contains static assets.

## Testing

Unit tests are included to ensure the functionality of the application. Components are covered by unit tests to verify
that they work correctly and handle expected inputs and outputs. Tests is created by using **Vitest**. To run the tests,
you can use one of the following commands:

    yarn test

or

    npx vitest run

## Live Demo

You can view the live application [here](https://petro97.github.io/comments-list-app/).
