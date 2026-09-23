# Installation Guide — Automation Suite

Playwright end-to-end test suite for the Okto Grid **Installation Guide** application (`https://devn-ig.oktogrid.io/`). It covers the full device installation wizard used by field technicians: login → new installation setup → device/transformer installation → asset details → power source & data collector selection → component photo capture — including both the happy path and negative/validation scenarios for each step.

## Tech stack

- **[Playwright Test](https://playwright.dev/)** (`@playwright/test` ^1.63.0) — test runner, browser automation, and assertions
- **Node.js** — JavaScript (CommonJS, `require`/`module.exports`), no TypeScript compilation step
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
  pictures/
    pictures.spec.js

data/                                  Static test data (JSON), grouped per feature
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

**Convention:** each feature gets its own subfolder under `tests/` containing a positive `*.spec.js` file and, where negative scenarios exist for that feature, a sibling `*.negative.spec.js` file. Features with no negative coverage yet (`select-power-and-data-collector`, `pictures`) only have a positive spec. Data files follow the same per-feature grouping and only exist where the corresponding spec actually needs external data.

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

- Node.js (LTS recommended; `@types/node` targets a recent major version, so Node 20+ is advised)
- Dependencies and browser binaries installed:

```bash
npm install
npx playwright install
```

There is no `.env` file or additional runtime configuration — the target URL and test credentials are defined in the `data/` JSON files consumed by each spec.

## How to run tests

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

Other useful flags (standard Playwright CLI — no custom npm scripts are defined in `package.json`):

```bash
npx playwright test --headed          # run with a visible browser
npx playwright test --debug           # open the Playwright inspector
npx playwright test --reporter=list   # readable console output instead of the default HTML reporter
```

The suite currently runs on a single `chromium` project (see `playwright.config.js`); Firefox and WebKit projects are present but commented out.

## Test reports

The configured reporter is `html`. After a run:

```bash
npx playwright show-report
```

This opens the report generated in `playwright-report/`. Failure artifacts (traces, screenshots) are written to `test-results/` — traces are captured `on-first-retry`, and CI is configured to retry failed tests twice (`retries: 2` when `process.env.CI` is set; locally there are no automatic retries).

## Writing new tests

When adding a new feature/screen to the wizard:

1. **Page object** — add `pages/<feature>.page.js` exporting a single class with locators in the constructor and action/assertion helper methods (see existing pages for the pattern).
2. **Data** — if the feature needs static data, add `data/<feature>/<feature>.data.json` (positive) and/or `data/<feature>/<feature>.negative.data.json` (negative scenarios), following the shape used by existing JSON files (a single object for one scenario, an array of `{ scenario, ... }` objects for data-driven cases).
3. **Specs** — add `tests/<feature>/<feature>.spec.js` for the happy path and `tests/<feature>/<feature>.negative.spec.js` for invalid input/error/boundary cases. Never mix positive and negative cases in the same file. Group related cases inside a `test.describe(...)` block.
4. **Fixtures** — reuse `utils/fixtures.js` instead of re-implementing login or step-chaining logic. If your feature depends on the app being in a certain state (e.g. "logged in", "device already installed"), add a new fixture there that builds on an existing one, rather than duplicating setup code inside the spec.

## Contribution guidelines

- Follow the naming convention above for every new page, spec, and data file.
- Keep positive and negative test cases in separate files — do not add negative cases to a `*.spec.js` file or positive cases to a `*.negative.spec.js` file.
- Page objects hold locators, actions, **and** their own assertion helpers (e.g. `assertErrorMessageVisible`, `assertNextButtonDisabled`, `assertFieldValidationError`) so specs stay declarative — specs call these helpers (or `expect()` directly for simple checks) rather than duplicating locator/assertion logic inline.
- Reuse and extend `utils/fixtures.js` for any shared setup instead of copy-pasting login/navigation steps between specs.
