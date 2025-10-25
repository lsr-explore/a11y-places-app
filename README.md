# A11y Places Workshop

An accessible places management application built with React, Material-UI, and Capacitor. This project demonstrates accessibility best practices and modern web development tools.

## Features

- **Accessible UI**: Built with Material-UI v7 and follows WCAG guidelines
- **Mobile Ready**: Capacitor integration for native mobile capabilities
- **Icon Picker**: Select from Material-UI icons for your places
- **Data Persistence**: Uses Capacitor Preferences for storage
- **ESLint with jsx-a11y**: Enforces accessibility rules during development
- **Testing**: React Testing Library for component testing
- **E2E Testing**: Playwright with @axe-core/playwright for accessibility testing
- **Storybook**: Component documentation with a11y addon for accessibility checks
- **Chromatic**: Visual regression testing

## Tech Stack

- **React 19** with TypeScript
- **Material-UI v7** for UI components
- **React Router v7** for navigation
- **Capacitor v7** for native capabilities
- **ESLint** with jsx-a11y plugin
- **React Testing Library** for component tests
- **Playwright** with @axe-core/playwright for E2E and accessibility testing
- **Storybook v9** with a11y addon for component development
- **Chromatic** for visual testing

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Layout.tsx
│   └── IconPicker.tsx
├── pages/          # Page components
│   ├── Home.tsx
│   ├── Places.tsx
│   └── AddPlace.tsx
├── types/          # TypeScript type definitions
│   └── Place.ts
└── utils/          # Utility functions
    └── storage.ts  # Capacitor Preferences wrapper
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

Start the development server:
```bash
pnpm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Running Tests

Run the component test suite in watch mode:
```bash
pnpm test
```

Run tests once with coverage (no watch mode):
```bash
pnpm run test:coverage
```

Run tests in CI mode (no watch mode):
```bash
pnpm run test:ci
```

### Running E2E Tests with Playwright

**First time setup** - Install Playwright browsers:
```bash
pnpm exec playwright install
```

Run E2E tests:
```bash
pnpm run test:e2e
```

Run E2E tests with visual UI (recommended for debugging):
```bash
pnpm run test:e2e:ui
```

Run E2E tests in headed mode (see browser):
```bash
pnpm run test:e2e:headed
```

Debug E2E tests:
```bash
pnpm run test:e2e:debug
```

View test report:
```bash
pnpm run test:e2e:report
```

**Note**: The E2E tests include accessibility testing using @axe-core/playwright. The accessible pages (`/places`) should pass with 0 violations, while the inaccessible pages (`/places-inaccessible`) intentionally contain violations for workshop demonstration purposes.

See [e2e/README.md](./e2e/README.md) for detailed E2E testing documentation.

### Running Storybook

View component documentation:
```bash
pnpm run storybook
```
Open [http://localhost:6006](http://localhost:6006) to view Storybook.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm run test:coverage`

Runs the test suite once and generates a coverage report. Does not run in watch mode.

### `pnpm run test:e2e`

Runs the Playwright end-to-end test suite with accessibility checks using @axe-core/playwright.\
See [e2e/README.md](./e2e/README.md) for more E2E testing options.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `pnpm run storybook`

Runs Storybook for component development and documentation.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `pnpm run build-storybook`

Builds Storybook as a static web application for deployment.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
