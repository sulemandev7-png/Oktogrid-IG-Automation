const { test: customTest, expect } = require("../../utils/fixtures");
const { PicturesPage } = require("../../pages/pictures.page");

customTest.describe("Pictures - negative", () => {
  customTest(
    "Next button stays disabled when pictures are not taken",
    async ({ powerAndDataCollectorSelectedPage }) => {
      const pictures = new PicturesPage(powerAndDataCollectorSelectedPage);
      await pictures.takePictureButton.first().waitFor({ state: "visible" });
      await pictures.assertNextButtonDisabled();
    },
  );
});
