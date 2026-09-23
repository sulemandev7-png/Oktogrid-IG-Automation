const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login.page");

test.describe("Login - positive", () => {
  test("Selecting the language and loging into the portal", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goto(process.env.DEV_BASE_URL);
    await login.selectLanguage();
    await login.login(
      process.env.TEST_LOGIN_EMAIL,
      process.env.TEST_LOGIN_PASSWORD,
    );
  });
});
