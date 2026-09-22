class SelectPowerAndDataCollectorPage {
  constructor(page) {
    this.page = page;
    this.transformerType = page.getByRole("radio", {
      name: "Battery",
    });
    this.dataCollector = page.getByRole("button", {
      name: "Next",
    });
    this.next = page.getByRole("button", { name: "Next" });
  }
  async selectTransformerAndDataCollector() {
    await this.transformerType.click();
    await this.dataCollector.click();
    console.log("Waiting for Install Data Collector screen to load");
    await this.page
      .getByText("Install Data Collector")
      .waitFor({ state: "visible" });
    await this.next.click();
  }
}
module.exports = { SelectPowerAndDataCollectorPage };
