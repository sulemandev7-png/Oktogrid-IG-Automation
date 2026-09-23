const { test: customTest, expect } = require("../../utils/fixtures");
const { InstallationPage } = require("../../pages/installation.page");

customTest.describe("New Installation - positive", () => {
  customTest("Installing asset", async ({ authenticatedPage }) => {
    const installation = new InstallationPage(authenticatedPage);
    await installation.clickInstallation();
    await installation.toggle();
    await installation.permissions();
    await installation.nextButton();
  });
});
