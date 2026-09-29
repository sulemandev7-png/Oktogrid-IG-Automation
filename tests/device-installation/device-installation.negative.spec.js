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

  const disabledScenarios = [
    { scenario: "device ID is empty", value: "" },
    { scenario: "device ID is whitespace only", value: "   " },
    { scenario: "device ID contains only special characters", value: "!@#$" },
  ];

  for (const { scenario, value } of disabledScenarios) {
    customTest(
      `Next button stays disabled when ${scenario}`,
      async ({ installedPage }) => {
        const device = new DeviceInstallationPage(installedPage);
        await device.enterDeviceId(value);
        await device.assertNextButtonDisabled();
      },
    );
  }
});
