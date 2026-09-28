const { test: customTest, expect } = require("../../utils/fixtures");
const { DeviceDetailsPage } = require("../../pages/device-details.page");
const negativeData = require("../../data/device-details/device-details.negative.data.json");

customTest.describe("Device Details - negative", () => {
  customTest(
    "Next button stays disabled when required fields are empty",
    async ({ deviceInstalledPage }) => {
      const deviceDetails = new DeviceDetailsPage(deviceInstalledPage);
      await deviceDetails.assertNextButtonDisabled();
    },
  );

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
