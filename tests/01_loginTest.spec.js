const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/01_LoginPage");
const loginData = require("../utils/loginData.json");
const negativeLoginData = require("../utils/negativeLoginData.json");
const data = JSON.parse(JSON.stringify(loginData));
const negativeData = JSON.parse(JSON.stringify(negativeLoginData));
test("Selecting the language and loging into the portal", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto(data.devUrl);
  await login.selectLanguage();
  await login.login(data.Email, data.password);
});
for (const scenario of negativeData) {
  test(` ${scenario.scenario}`, async ({ page }) => {
    const wrongLogin = new LoginPage(page);
    await wrongLogin.goto(data.devUrl);
    await wrongLogin.selectLanguage();
    await wrongLogin.login(scenario.Email, scenario.password);
    await wrongLogin.assertErrorMessageVisible(scenario.expectedError);
  });
}
