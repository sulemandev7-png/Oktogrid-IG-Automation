const { test: customTest, expect } = require("../utils/fixtures");
const {
  DeviceInstallationPage,
} = require("../pages/03_DeviceInstallationPage");
const DeviceData = require("../utils/DeviceData.json");
const NegativeData = require("../utils/DeviceInstallation.json");
const Devdata = JSON.parse(JSON.stringify(DeviceData));
const NegativeInstallation = JSON.parse(JSON.stringify(NegativeData));
customTest("Installing a device", async ({ installedPage }) => {
  const device = new DeviceInstallationPage(installedPage);
  await device.deviceAdd(Devdata.deviceId);
  await device.selectTransformerType();
  await device.toggle();
});
customTest(`${NegativeInstallation.scenario}`, async ({ installedPage }) => {
  const device = new DeviceInstallationPage(installedPage);
  await device.deviceAdd(NegativeInstallation.deviceId);
  await device.assertErrorMessageVisible(
    NegativeInstallation.deviceInstallationMsg,
  );
});
