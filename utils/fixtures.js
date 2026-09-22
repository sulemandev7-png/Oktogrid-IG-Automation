const base = require("@playwright/test");
const { LoginPage } = require("../pages/01_LoginPage");
const loginData = require("./loginData.json");
const { InstallationPage } = require("../pages/02_InstallationPage");
const {
  DeviceInstallationPage,
} = require("../pages/03_DeviceInstallationPage");
const { DeviceDetailsPage } = require("../pages/04_DeviceDetailsPage");
const {
  SelectPowerAndDataCollectorPage,
} = require("../pages/05_SelectPowerAndDataCollectorPage");
const Devdata = require("./DeviceData.json");

const loginAsEndUser = async (page) => {
  const login = new LoginPage(page);
  await login.goto(loginData.devUrl);
  await login.selectLanguage();
  await login.login(loginData.Email, loginData.password);
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
