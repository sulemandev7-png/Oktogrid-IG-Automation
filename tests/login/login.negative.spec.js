const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login.page");
const negativeLoginData = require("../../data/login/login.negative.data.json");
const devUrl = process.env.DEV_BASE_URL;
const negativeData = JSON.parse(JSON.stringify(negativeLoginData.serverErrors));
const invalidData = JSON.parse(
  JSON.stringify(negativeLoginData.clientValidation),
);

test.describe("Login - negative - server-side errors", () => {
  for (const scenario of negativeData) {
    test(` ${scenario.scenario}`, async ({ page }) => {
      const wrongLogin = new LoginPage(page);
      await wrongLogin.goto(devUrl);
      await wrongLogin.selectLanguage();
      await wrongLogin.login(scenario.Email, scenario.password);
      await wrongLogin.assertErrorMessageVisible(scenario.expectedError);
    });
  }
});

test.describe("Login - negative - client-side validation", () => {
  test("Log in button stays disabled when email and password fields are empty", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goto(devUrl);
    await login.selectLanguage();
    expect(await login.isLoginButtonDisabled()).toBe(true);
  });

  for (const scenario of invalidData) {
    test(` ${scenario.scenario}`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto(devUrl);
      await login.selectLanguage();
      await login.fillEmail(scenario.Email);
      await login.fillPassword(scenario.password);
      expect(await login.getEmailValidationMessage()).toBe(
        scenario.expectedValidationMessage,
      );
    });
  }
});
