# Installation Guide — Automation Suite

Playwright end-to-end test suite for the Okto Grid **Installation Guide** application (`https://devn-ig.oktogrid.io/`). It covers the full device installation wizard used by field technicians: login → new installation setup → device/transformer installation → asset details → power source & data collector selection → component photo capture — including both the happy path and comprehensive negative/validation scenarios for each step.

## Tech stack

- **[Playwright Test](https://playwright.dev/)** (`@playwright/test` ^1.63.0) — test runner, browser automation, and assertions
- **Node.js** — JavaScript (CommonJS, `require`/`module.exports`), no TypeScript compilation step
- **dotenv** — environment variable management
- **@types/node** — editor type support only

## Folder structure

```
pages/                                Page Object classes — one flat file per app screen/feature
  login.page.js
  installation.page.js
  device-installation.page.js
  device-details.page.js
  select-power-and-data-collector.page.js
  pictures.page.js

tests/                                 Spec files, grouped in one subfolder per feature
  login/
    login.spec.js                      Positive scenarios
    login.negative.spec.js             Negative scenarios
  installation/
    installation.spec.js
    installation.negative.spec.js
  device-installation/
    device-installation.spec.js
    device-installation.negative.spec.js
  device-details/
    device-details.spec.js
    device-details.negative.spec.js
  select-power-and-data-collector/
    select-power-and-data-collector.spec.js
    select-power-and-data-collector.negative.spec.js
  pictures/
    pictures.spec.js
    pictures.negative.spec.js

data/                                  Static test data (JSON/JS), grouped per feature
  login/
    login.data.json                    Valid credentials used for positive login
    login.negative.data.json           Invalid-login scenarios (server-side + client-side validation)
  device-installation/
    device-installation.data.json      Sample device/asset data (shared with device-details)
    device-installation.negative.data.json
  device-details/
    device-details.negative.data.json

utils/
  fixtures.js                          Shared custom Playwright fixtures used across all specs

playwright.config.js
```

**Convention:** each feature gets its own subfolder under `tests/` containing a positive `*.spec.js` file and a sibling `*.negative.spec.js` file for validation & negative scenarios. Data files follow the same per-feature grouping and exist where specs require external data.

## Naming conventions

| Pattern                        | Used for                                                            |
| ------------------------------ | ------------------------------------------------------------------- |
| `<feature>.page.js`            | Page Object class for a feature/screen, placed flat in `pages/`     |
| `<feature>.spec.js`            | Positive test cases for a feature, placed in `tests/<feature>/`     |
| `<feature>.negative.spec.js`   | Negative/invalid-input test cases for the same feature, same folder |
| `<feature>.data.json`          | Static positive test data for a feature, in `data/<feature>/`       |
| `<feature>.negative.data.json` | Static negative/invalid test data for a feature, same folder        |

Keep names lowercase, kebab-case, and dot-separated exactly as above so specs, page objects, and data files can be matched at a glance.

## Prerequisites

- Node.js (LTS recommended; Node 20+ advised)
- Dependencies and browser binaries installed:

```bash
npm install
npx playwright install
```

Environment settings are loaded via `.env` (using `dotenv`). An `.env.example` file is provided as a reference.

## How to run tests

### Convenient npm scripts:

Run all **positive** (happy path) tests:
```bash
npm run test:positive
```

Run all **negative** (validation / edge case) tests:
```bash
npm run test:negative
```

### Direct Playwright CLI commands:

Run the entire suite:
```bash
npx playwright test
```

Run all tests for a single feature (positive + negative):
```bash
npx playwright test tests/login
```

Run only the positive spec for a feature:
```bash
npx playwright test tests/login/login.spec.js
```

Run only the negative spec for a feature:
```bash
npx playwright test tests/login/login.negative.spec.js
```

Run every negative spec across all features:
```bash
npx playwright test tests/**/*.negative.spec.js
```

Other useful flags (standard Playwright CLI):

```bash
npx playwright test --headed          # run with a visible browser
npx playwright test --debug           # open the Playwright inspector
npx playwright test --reporter=list   # readable console output instead of default HTML reporter
```

The suite runs on `chromium` (see `playwright.config.js`).

## Test reports

The configured reporter is `html`. After a run:

```bash
npx playwright show-report
```

This opens the HTML report generated in `playwright-report/`. Failure artifacts (traces, screenshots) are written to `test-results/`.

## Writing new tests

When adding a new feature/screen to the wizard:

1. **Page object** — add `pages/<feature>.page.js` exporting a single class with locators in the constructor and action/assertion helper methods.
2. **Data** — if the feature needs static data, add `data/<feature>/<feature>.data.json` (positive) and/or `data/<feature>/<feature>.negative.data.json` (negative scenarios).
3. **Specs** — add `tests/<feature>/<feature>.spec.js` for happy path and `tests/<feature>/<feature>.negative.spec.js` for negative cases. Never mix positive and negative cases in the same file. Group related cases inside a `test.describe(...)` block.
4. **Fixtures** — reuse `utils/fixtures.js` instead of re-implementing login or step-chaining logic.

## Contribution guidelines

- Follow the naming convention above for every new page, spec, and data file.
- Keep positive and negative test cases in separate files.
- Page objects hold locators, actions, **and** their own assertion helpers (e.g. `assertErrorMessageVisible`, `assertNextButtonDisabled`) so specs stay declarative.
- Reuse and extend `utils/fixtures.js` for any shared setup instead of copy-pasting setup steps between specs.

