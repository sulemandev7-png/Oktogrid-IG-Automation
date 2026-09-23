const { test: customTest, expect } = require("../../utils/fixtures");
const {
  DeviceInstallationPage,
} = require("../../pages/device-installation.page");
const NegativeData = require("../../data/device-installation/device-installation.negative.data.json");
const NegativeInstallation = JSON.parse(JSON.stringify(NegativeData));

customTest.describe("Device Installation - negative", () => {
  customTest(`${NegativeInstallation.scenario}`, async ({ installedPage }) => {
    const device = new DeviceInstallationPage(installedPage);
    await device.deviceAdd(NegativeInstallation.deviceId);
    await device.assertErrorMessageVisible(
      NegativeInstallation.deviceInstallationMsg,
    );
  });

  customTest(
    "Next button stays disabled when device ID is empty",
    async ({ installedPage }) => {
      const device = new DeviceInstallationPage(installedPage);
      await device.enterDeviceId("");
      await device.assertNextButtonDisabled();
    },
  );
});
