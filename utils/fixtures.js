const base = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InstallationPage } = require("../pages/installation.page");
const { DeviceInstallationPage } = require("../pages/device-installation.page");
const { DeviceDetailsPage } = require("../pages/device-details.page");
const {
  SelectPowerAndDataCollectorPage,
} = require("../pages/select-power-and-data-collector.page");
const Devdata = require("../data/device-installation/device-installation.data.json");

const loginAsEndUser = async (page) => {
  const login = new LoginPage(page);
  await login.goto(process.env.DEV_BASE_URL);
  await login.selectLanguage();
  await login.login(
    process.env.TEST_LOGIN_EMAIL,
    process.env.TEST_LOGIN_PASSWORD,
  );
};

const customTest = base.test.extend({
  authenticatedPage: async ({ page, context }, use) => {
    await context.grantPermissions(["camera", "geolocation"]);
    await context.setGeolocation({ latitude: 25.2048, longitude: 55.2708 });
    await loginAsEndUser(page);
    await use(page);
  },
  // same login flow, but the browser context is never granted camera/location permissions
  authenticatedPageNoPermissions: async ({ page }, use) => {
    await loginAsEndUser(page);
    await use(page);
  },
  installedPage: async ({ authenticatedPage }, use) => {
    const installation = new InstallationPage(authenticatedPage);
    await installation.clickInstallation();
    await installation.toggle();
    await installation.permissions();
    await installation.nextButton();
    await use(authenticatedPage);
  },
  deviceInstalledPage: async ({ installedPage }, use) => {
    const device = new DeviceInstallationPage(installedPage);
    await device.deviceAdd(Devdata.deviceId);
    await device.selectTransformerType();
    await device.toggle();
    await use(installedPage);
  },
  assetDetailsCompletedPage: async ({ deviceInstalledPage }, use) => {
    const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
    await deviceDetails.assetDetails(Devdata);
    await deviceDetails.setDeviceLocation();
    await deviceDetails.takeDevicePicture();
    await deviceDetails.clickNext();
    await use(deviceInstalledPage);
  },
  powerAndDataCollectorSelectedPage: async (
    { assetDetailsCompletedPage },
    use,
  ) => {
    const powerDataCollector = new SelectPowerAndDataCollectorPage(
      assetDetailsCompletedPage,
    );
    await powerDataCollector.selectTransformerAndDataCollector();
    await use(assetDetailsCompletedPage);
  },
});

module.exports = { test: customTest, expect: base.expect };
