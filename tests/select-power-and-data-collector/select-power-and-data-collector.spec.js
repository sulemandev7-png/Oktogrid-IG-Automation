const { test: customTest, expect } = require("../../utils/fixtures");
const {
  SelectPowerAndDataCollectorPage,
} = require("../../pages/select-power-and-data-collector.page");
customTest(
  "Selecting power source and transformer type",
  async ({ assetDetailsCompletedPage }) => {
    const powerDataCollector = new SelectPowerAndDataCollectorPage(
      assetDetailsCompletedPage,
    );
    await powerDataCollector.selectTransformerAndDataCollector();
  },
);
