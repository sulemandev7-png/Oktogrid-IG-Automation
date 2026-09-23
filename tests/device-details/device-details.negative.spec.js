const { test: customTest, expect } = require("../../utils/fixtures");
const { DeviceDetailsPage } = require("../../pages/device-details.page");
const NegativeData = require("../../data/device-details/device-details.negative.data.json");
const negativeData = JSON.parse(JSON.stringify(NegativeData));

customTest.describe("Device Details - negative", () => {
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
});
