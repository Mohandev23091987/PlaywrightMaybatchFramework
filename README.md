# SauceDemo Playwright Framework

This project is a Playwright-based automation framework for testing the SauceDemo website.

## Overview

The framework follows a Page Object Model (POM) structure and includes:
- reusable page classes in `pages/`
- custom fixtures in `fixtures/`
- test suites in `tests/`
- test data in `testdata/`
- reports output in `reports/`

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Project Structure

```text
SauceDemoPlaywrightFramework/
├── fixtures/
│   └── login.fixture.ts
├── pages/
│   └── loginPage.ts
├── reports/
├── testdata/
├── tests/
│   ├── example.spec.ts
│   ├── login.spec.ts
│   ├── checkout/
│   ├── login/
│   └── payments/
├── utils/
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── package-lock.json
```

## Prerequisites

Install Node.js version 18 or above.

## Installation

```bash
npm install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Configuration

The Playwright configuration is in:

```text
playwright.config.ts
```

It includes:
- test directory
- browser projects
- reporter setup
- tracing on retry

## Custom Fixture

The project uses a custom fixture for login page setup. It creates a `loginPage` object and navigates to the SauceDemo login page before the test runs.

Example:

```ts
import { test, expect } from '../fixtures/login.fixture';

test('login test', async ({ loginPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
});
```

## Notes

- Keep page actions inside the page classes under `pages/`.
- Keep reusable logic and setup in `fixtures/`.
- Store input data in `testdata/` when needed.
- Use `reports/` for generated output.

## License

This project is for learning and automation testing purposes.
