const { expect } = require("@playwright/test");

class DeviceInstallationPage {
  constructor(installedPage) {
    this.installedPage = installedPage;
    this.deviceField = installedPage.getByRole("textbox", { name: "xxxxx" });
    this.nextButton = installedPage.getByRole("button", { name: "Next" });
    this.transformerType = installedPage.getByRole("radio", {
      name: "Dry-Type",
    });
    this.transformerNextButton = installedPage.getByRole("button", {
      name: "Next",
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
    await expect(this.transformerNextButton).toBeEnabled();
    await this.transformerNextButton.click();
    try {
      await this.confirmToggle.waitFor({ state: "visible", timeout: 5000 });
    } catch {
      if (await this.transformerNextButton.isVisible()) {
        await this.transformerNextButton.click();
        await this.confirmToggle.waitFor({ state: "visible" });
      }
    }
  }
  async toggle() {
    console.log("Toggling Confirm switch");
    const knob = this.confirmToggle;
    await knob.waitFor({ state: "visible" });
    const box = await knob.boundingBox();
    console.log("Knob position before drag:", box);

    await this.installedPage.mouse.move(
      box.x + box.width / 2,
      box.y + box.height / 2,
    );
    await this.installedPage.mouse.down();
    await this.installedPage.mouse.move(
      box.x + box.width / 2 + 190,
      box.y + box.height / 2,
      { steps: 10 },
    );
    await this.installedPage.mouse.up();

    const boxAfter = await knob.boundingBox();
    console.log("Knob position after drag:", boxAfter);

    console.log("Waiting for Asset Details screen to load");
    await this.installedPage
      .getByTestId("assetName")
      .waitFor({ state: "visible" });
  }
}
module.exports = { DeviceInstallationPage };
