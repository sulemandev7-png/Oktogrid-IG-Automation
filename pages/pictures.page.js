class PicturesPage {
  constructor(page) {
    this.page = page;
    this.takePictureButton = page.getByRole("button", {
      name: "Take Picture",
    });
    this.captureFrameButton = page.getByRole("button", {
      name: "Capture frame",
    });
    this.confirmButton = page.getByRole("button", { name: "Confirm" });
    this.connectButton = page.getByRole("button", { name: "Connect" });
  }
  async capturePictures(count) {
    for (let i = 0; i < count; i++) {
      console.log("Capturing picture", i + 1);
      await this.takePictureButton.nth(i).click();
      await this.page.waitForTimeout(500);
      await this.captureFrameButton.click();
      await this.confirmButton.click();
      await this.page
        .getByRole("button", { name: "Retake" })
        .waitFor({ state: "hidden", timeout: 45000 });
    }
    await this.connectButton.click();
  }
}
module.exports = { PicturesPage };
