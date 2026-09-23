const { test: customTest, expect } = require("../../utils/fixtures");
const {
  DeviceInstallationPage,
} = require("../../pages/device-installation.page");
const DeviceData = require("../../data/device-installation/device-installation.data.json");
const Devdata = JSON.parse(JSON.stringify(DeviceData));

customTest.describe("Device Installation - positive", () => {
  customTest("Installing a device", async ({ installedPage }) => {
    const device = new DeviceInstallationPage(installedPage);
    await device.deviceAdd(Devdata.deviceId);
    await device.selectTransformerType();
    await device.toggle();
  });
});
