class SelectPowerAndDataCollectorPage {
  constructor(page) {
    this.page = page;
    this.transformerType = page.getByRole("radio", {
      name: "Battery",
    });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.next = this.nextButton;
    this.dataCollector = this.nextButton;
  }
  async selectTransformerAndDataCollector() {
    await this.transformerType.click();
    await this.nextButton.click();
    console.log("Waiting for Install Data Collector screen to load");
    await this.page
      .getByText("Install Data Collector")
      .waitFor({ state: "visible" });
    await this.nextButton.click();
  }
}
module.exports = { SelectPowerAndDataCollectorPage };
