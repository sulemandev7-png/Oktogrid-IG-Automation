const { test: customTest, expect } = require("../../utils/fixtures");
const { DeviceDetailsPage } = require("../../pages/device-details.page");
const DeviceData = require("../../data/device-installation/device-installation.data.json");
const Devdata = JSON.parse(JSON.stringify(DeviceData));

customTest.describe("Device Details - positive", () => {
  customTest("Adding asset details", async ({ deviceInstalledPage }) => {
    const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
    await deviceDetails.assetDetails(Devdata);
    await deviceDetails.setDeviceLocation();
    await deviceDetails.takeDevicePicture();
    await deviceDetails.clickNext();
  });
});
