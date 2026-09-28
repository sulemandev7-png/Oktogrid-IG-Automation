const { test: customTest, expect } = require("../../utils/fixtures");
const {
  SelectPowerAndDataCollectorPage,
} = require("../../pages/select-power-and-data-collector.page");

customTest.describe("Select Power and Data Collector - negative", () => {
  customTest(
    "Next button stays disabled when power source is not selected",
    async ({ assetDetailsCompletedPage }) => {
      const powerDataCollector = new SelectPowerAndDataCollectorPage(
        assetDetailsCompletedPage,
      );
      await powerDataCollector.transformerType.waitFor({ state: "visible" });
      await powerDataCollector.assertNextButtonDisabled();
    },
  );
});
