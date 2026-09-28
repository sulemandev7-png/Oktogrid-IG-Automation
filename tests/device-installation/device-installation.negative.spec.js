const { test: customTest, expect } = require("../../utils/fixtures");
const {
  DeviceInstallationPage,
} = require("../../pages/device-installation.page");
const NegativeInstallation = require("../../data/device-installation/device-installation.negative.data.json");

customTest.describe("Device Installation - negative", () => {
  for (const scenario of NegativeInstallation) {
    customTest(scenario.scenario, async ({ installedPage }) => {
      const device = new DeviceInstallationPage(installedPage);
      await device.deviceAdd(scenario.deviceId);
      await device.assertErrorMessageVisible(scenario.deviceInstallationMsg);
    });
  }

  customTest(
    "Next button stays disabled when device ID is empty",
    async ({ installedPage }) => {
      const device = new DeviceInstallationPage(installedPage);
      await device.enterDeviceId("");
      await device.assertNextButtonDisabled();
    },
  );
});
