const { test: customTest, expect } = require("../utils/fixtures");
const { InstallationPage } = require("../pages/02_InstallationPage");
customTest("Installing asset", async ({ authenticatedPage }) => {
  const installation = new InstallationPage(authenticatedPage);
  await installation.clickInstallation();
  await installation.toggle();
  await installation.permissions();
  await installation.nextButton();
});
customTest(
  "Next button should stay disabled without camera and location permissions",
  async ({ authenticatedPageNoPermissions }) => {
    const installation = new InstallationPage(authenticatedPageNoPermissions);
    await installation.clickInstallation();
    await installation.toggle();
    await installation.assertNextButtonDisabled();
  },
);
