const { test: customTest, expect } = require("../../utils/fixtures");
const { InstallationPage } = require("../../pages/installation.page");

customTest.describe("New Installation - negative", () => {
  customTest(
    "Next button should stay disabled without camera and location permissions",
    async ({ authenticatedPageNoPermissions }) => {
      const installation = new InstallationPage(authenticatedPageNoPermissions);
      await installation.clickInstallation();
      await installation.toggle();
      await installation.assertNextButtonDisabled();
    },
  );
});
