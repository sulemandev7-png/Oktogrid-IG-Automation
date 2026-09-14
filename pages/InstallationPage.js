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
    const box = await knob.boundingBox();

    await this.authenticatedPage.mouse.move(
      box.x + box.width / 2,
      box.y + box.height / 2,
    );
    await this.authenticatedPage.mouse.down();
    await this.authenticatedPage.mouse.move(
      box.x + box.width / 2 + 190,
      box.y + box.height / 2,
      { steps: 10 },
    );
    await this.authenticatedPage.mouse.up();
  }
  async permissions() {
    console.log("Enabling Camera permission");
    await this.camera.click();
    console.log("Enabling Location permission");
    await this.location.click();
  }
  async nextButton() {
    console.log("Clicking Next button");
    await this.nextBtn.click();
  }
}
module.exports = { InstallationPage };
