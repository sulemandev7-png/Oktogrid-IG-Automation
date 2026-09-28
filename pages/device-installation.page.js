const { expect } = require("@playwright/test");
const { dragSlider } = require("../utils/ui-helpers");

class DeviceInstallationPage {
  constructor(installedPage) {
    this.installedPage = installedPage;
    this.deviceField = installedPage.getByRole("textbox", { name: "xxxxx" });
    this.nextButton = installedPage.getByRole("button", { name: "Next" });
    this.transformerNextButton = this.nextButton;
    this.transformerType = installedPage.getByRole("radio", {
      name: "Dry-Type",
    });
    this.confirmToggle = installedPage
      .locator('div[class*="cursor-grab"]')
      .first();
  }
  async deviceAdd(deviceID) {
    console.log("Entering device ID:", deviceID);
    await this.deviceField.fill(deviceID);
    await this.nextButton.click();
  }
  async enterDeviceId(deviceID) {
    console.log("Entering device ID:", deviceID);
    await this.deviceField.fill(deviceID);
  }
  async assertErrorMessageVisible(expectedError) {
    const errorMessage = this.installedPage
      .locator("div[data-content]")
      .filter({ hasText: expectedError });
    await expect(errorMessage).toBeVisible();
  }
  async assertNextButtonDisabled() {
    await expect(this.nextButton).toBeDisabled();
  }
  async selectTransformerType() {
    console.log("Selecting transformer type: Dry-Type");
    await this.transformerType.click();
    await expect(this.transformerType).toBeChecked();
    await expect(this.nextButton).toBeEnabled();
    await this.nextButton.click();
    try {
      await this.confirmToggle.waitFor({ state: "visible", timeout: 5000 });
    } catch {
      if (await this.nextButton.isVisible()) {
        await this.nextButton.click();
        await this.confirmToggle.waitFor({ state: "visible" });
      }
    }
  }
  async toggle() {
    console.log("Toggling Confirm switch");
    await dragSlider(this.installedPage, this.confirmToggle);
    console.log("Waiting for Asset Details screen to load");
    await this.installedPage
      .getByTestId("assetName")
      .waitFor({ state: "visible" });
  }
}
module.exports = { DeviceInstallationPage };
