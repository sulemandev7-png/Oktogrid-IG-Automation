const { test: customTest, expect } = require("../utils/fixtures");
const { DeviceDetailsPage } = require("../pages/04_DeviceDetailsPage");
const DeviceData = require("../utils/DeviceData.json");
const NegativeData = require("../utils/DeviceDetailsNegative.json");

const Devdata = JSON.parse(JSON.stringify(DeviceData));
const negativeData = JSON.parse(JSON.stringify(NegativeData));
customTest("Adding asset details", async ({ deviceInstalledPage }) => {
  const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
  await deviceDetails.assetDetails(Devdata);
  await deviceDetails.setDeviceLocation();
  await deviceDetails.takeDevicePicture();
  await deviceDetails.clickNext();
});
for (const scenario of negativeData) {
  customTest(scenario.scenario, async ({ deviceInstalledPage }) => {
    const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
    await deviceDetails.assertFieldValidationError(
      scenario.field,
      scenario.value,
      scenario.expectedError,
    );
  });
}
