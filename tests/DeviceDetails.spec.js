const { test: customTest, expect } = require("../utils/fixtures");
const { DeviceDetailsPage } = require("../pages/DeviceDetailsPage");
const DeviceData = require("../utils/DeviceData.json");

const Devdata = JSON.parse(JSON.stringify(DeviceData));
customTest("Adding asset details", async ({ deviceInstalledPage }) => {
  const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
  await deviceDetails.assetDetails(Devdata);
  await deviceDetails.setDeviceLocation();
  await deviceDetails.takeDevicePicture();
  await deviceDetails.clickNext();
});
