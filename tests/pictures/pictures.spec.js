const { test: customTest, expect } = require("../../utils/fixtures");
const { PicturesPage } = require("../../pages/pictures.page");
customTest(
  "Adding pcitures at the end",
  async ({ powerAndDataCollectorSelectedPage }) => {
    customTest.setTimeout(90000);
    const pictures = new PicturesPage(powerAndDataCollectorSelectedPage);
    await pictures.capturePictures(5);
  },
);
