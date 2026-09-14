const { test: customTest, expect } = require("../utils/fixtures");
const { DeviceInstallationPage } = require("../pages/DeviceInstallationPage");
const DeviceData = require("../utils/DeviceData.json");

const Devdata = JSON.parse(JSON.stringify(DeviceData));
customTest("Installing a device", async ({ installedPage }) => {
  const device = new DeviceInstallationPage(installedPage);
  await device.deviceAdd(Devdata.deviceId);
  await device.selectTransformerType();
  await device.toggle();
});
