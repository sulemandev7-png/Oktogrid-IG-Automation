const { test: customTest, expect } = require("../utils/fixtures");
const {
  SelectPowerAndDataCollectorPage,
} = require("../pages/SelectPowerAndDataCollectorPage");
customTest(
  "Selecting power source and transformer type",
  async ({ assetDetailsCompletedPage }) => {
    const powerDataCollector = new SelectPowerAndDataCollectorPage(
      assetDetailsCompletedPage,
    );
    await powerDataCollector.selectTransformerAndDataCollector();
  },
);
