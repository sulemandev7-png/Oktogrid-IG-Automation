const { expect } = require("@playwright/test");
const { dragSlider } = require("../utils/ui-helpers");

class InstallationPage {
  constructor(authenticatedPage) {
    this.authenticatedPage = authenticatedPage;
    this.installationBtn = authenticatedPage.getByRole("button", {
      name: "New Installation",
    });
    this.confirmToggle = authenticatedPage
      .locator("div")
      .filter({ hasText: "Confirm" })
      .nth(3);
    this.camera = authenticatedPage.getByRole("switch", { name: "Camera*" });
    this.location = authenticatedPage.getByRole("switch", {
      name: "Location*",
    });
    this.nextBtn = authenticatedPage.getByRole("button", { name: "Next" });
  }
  async clickInstallation() {
    console.log("Clicking New Installation button");
    await this.installationBtn.click();
  }
  async toggle() {
    console.log("Toggling Confirm switch");
    const knob = this.confirmToggle.locator(".absolute").first();
    await dragSlider(this.authenticatedPage, knob);
  }
  async permissions() {
    console.log("Enabling Camera permission");
    await this.camera.click();
    console.log("Enabling Location permission");
    await this.location.click();
  }
  async enableCameraPermission() {
    console.log("Enabling Camera permission");
    await this.camera.click();
  }
  async enableLocationPermission() {
    console.log("Enabling Location permission");
    await this.location.click();
  }
  async nextButton() {
    console.log("Clicking Next button");
    await this.nextBtn.click();
  }
  async assertNextButtonDisabled() {
    await expect(this.camera).toBeVisible();
    await expect(this.nextBtn).toBeDisabled();
  }
}
module.exports = { InstallationPage };
