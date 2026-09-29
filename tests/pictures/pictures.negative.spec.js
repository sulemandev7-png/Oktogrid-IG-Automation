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

  customTest(
    "Connect button stays disabled when only partial pictures are taken",
    async ({ powerAndDataCollectorSelectedPage }) => {
      customTest.setTimeout(60000);
      const pictures = new PicturesPage(powerAndDataCollectorSelectedPage);
      await pictures.takePictureButton.first().waitFor({ state: "visible" });
      await pictures.capturePhotos(1);
      await pictures.assertNextButtonDisabled();
    },
  );
});
