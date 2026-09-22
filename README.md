# Oktogrid-IG-Automation

Playwright end-to-end test suite for the Okto Installation Guide app (`https://devn-ig.oktogrid.io/`), covering the full device installation wizard: login → new installation → device/transformer setup → asset details → power source/data collector selection → component photo capture.

## Getting started

```bash
npm install
npx playwright install
```

Run the whole suite:

```bash
npx playwright test
```

Run a single spec (recommended while debugging a specific screen):

```bash
npx playwright test tests/DeviceDetails.spec.js --reporter=list
```

Useful flags: `--headed` (watch the browser), `--reporter=list` (readable console output).
View the last HTML report with `npx playwright show-report`.

## Project structure

```
pages/     Page Object classes — one per app screen, holding locators + actions
tests/     Spec files — one per wizard step, built on top of shared fixtures
utils/
  fixtures.js       Custom Playwright fixtures that chain the wizard steps together
  loginData.json    Test account credentials
  DeviceData.json   Sample asset/device data used to fill forms
```

## How the fixtures work

The wizard is linear, so each fixture in `utils/fixtures.js` builds on the previous one and represents "the app state after screen X is completed":

| Fixture                             | Gets you to                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `authenticatedPage`                 | Logged in, language selected                                                    |
| `installedPage`                     | Past "New Installation" + permissions screen                                    |
| `deviceInstalledPage`               | Device ID entered, transformer type selected                                    |
| `assetDetailsCompletedPage`         | Asset details, location and name-plate photo submitted                          |
| `powerAndDataCollectorSelectedPage` | Power source + data collector confirmed, "Install Data Collector" screen passed |

A test simply destructures whichever fixture matches the screen it needs to start from, e.g.:

```js
customTest(
  "Adding pictures at the end",
  async ({ powerAndDataCollectorSelectedPage }) => {
    const pictures = new PicturesPage(powerAndDataCollectorSelectedPage);
    await pictures.capturePictures(5);
  },
);
```

## Page Objects

Each class in `pages/` takes a Playwright `Page` in its constructor and exposes locators plus higher-level action methods (e.g. `LoginPage`, `InstallationPage`, `DeviceInstallationPage`, `DeviceDetailsPage`, `SelectPowerAndDataCollectorPage`, `PicturesPage`).

## Notes on flaky/slow steps

- Geolocation is faked via `context.setGeolocation()` in the `authenticatedPage` fixture — required for the "Set Location" step to ever enable its Confirm button.
- Photo capture/confirm steps depend on network upload timing; `pictures.spec.js` raises its test timeout and the `Retake` button's hidden-wait timeout to absorb that variability.
- Camera/microphone permissions use `--use-fake-device-for-media-stream --use-fake-ui-for-media-stream` (see `playwright.config.js`) so picture capture works headlessly in CI.
