# A11y Places Workshop

An accessible places management application built with React, Material-UI, and Capacitor. This project demonstrates accessibility best practices and modern web development tools.

## Features

- **Accessible UI**: Built with Material-UI v5 and follows WCAG guidelines
- **Mobile Ready**: Capacitor integration for native mobile capabilities
- **Icon Picker**: Select from Material-UI icons for your places
- **Data Persistence**: Uses Capacitor Preferences for storage
- **ESLint with jsx-a11y**: Enforces accessibility rules during development
- **Testing**: React Testing Library for component testing
- **Storybook**: Component documentation and visual testing
- **Chromatic**: Visual regression testing

## Tech Stack

- **React** with TypeScript
- **Material-UI v5** for UI components
- **React Router** for navigation
- **Capacitor** for native capabilities
- **ESLint** with jsx-a11y plugin
- **React Testing Library** for tests
- **Storybook** for component development
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
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Running Tests

Run the test suite:
```bash
npm test
```

### Running Storybook

View component documentation:
```bash
npm run storybook
```
Open [http://localhost:6006](http://localhost:6006) to view Storybook.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run storybook`

Runs Storybook for component development and documentation.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `npm run build-storybook`

Builds Storybook as a static web application for deployment.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
