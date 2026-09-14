const { expect } = require("@playwright/test");

class DeviceDetailsPage {
  constructor(page) {
    this.page = page;
    this.assetNameField = page.getByTestId("assetName");
    this.primaryKV = page.getByTestId("primaryKv");
    this.secondaryKv = page.getByTestId("secondaryKv");
    this.tertiaryKv = page.getByTestId("tertiaryKv");
    this.ratingMva = page.getByTestId("ratingMva");
    this.coolingTrigger = page
      .locator("label", { hasText: "Cooling" })
      .locator("..")
      .getByRole("combobox");
    this.coolingType = page.getByTestId("coolingType-1");
    this.housingTrigger = page
      .locator("label", { hasText: "Housing" })
      .locator("..")
      .getByRole("combobox");
    this.housing = page.getByTestId("housing-0");
    this.yearOfManufacture = page.getByTestId("yearOfManufacture");
    this.setLocation = page.getByTestId("setLocationButton");
    this.locationConfirm = page.getByRole("button", { name: "Confirm" });
    this.takePicture = page.getByTestId("takePictureButton");
    this.captureBtn = page.getByRole("button", { name: "Capture frame" });
    this.picConfirm = page.getByRole("button", { name: "Confirm" });
    this.nextButton = page.getByRole("button", { name: "Next" });
  }
  async assetDetails(data) {
    console.log("Filling asset name:", data.assetName);
    await this.assetNameField.fill(data.assetName);
    console.log("Filling primary/secondary/tertiary kV and rating MVA");
    await this.primaryKV.fill(data.primaryKv);
    await this.secondaryKv.fill(data.secondaryKv);
    await this.tertiaryKv.fill(data.tertiaryKv);
    await this.ratingMva.fill(data.ratingMva);
    console.log("Selecting cooling type and housing options");
    await this.coolingTrigger.click();
    await this.coolingType.click();
    await this.housingTrigger.click();
    await this.housing.click();
    console.log("Filling year of manufacture:", data.yearOfManufacture);
    await this.yearOfManufacture.fill(data.yearOfManufacture);
  }
  async setDeviceLocation() {
    console.log("Setting device location");
    await this.setLocation.click();
    console.log("Waiting for geolocation to resolve and Confirm to enable");
    await expect(this.locationConfirm).toBeEnabled({ timeout: 20000 });
    await this.locationConfirm.click();
  }
  async takeDevicePicture() {
    console.log("Capturing device picture");
    await this.takePicture.click();
    await this.captureBtn.click();
    await this.picConfirm.click();
  }
  async clickNext() {
    console.log("Clicking Next button");
    await this.nextButton.click();
  }
}
module.exports = { DeviceDetailsPage };
