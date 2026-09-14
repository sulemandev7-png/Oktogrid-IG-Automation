const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const loginData = require("../utils/loginData.json");

const data = JSON.parse(JSON.stringify(loginData));

test("Selecting the language", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto(data.devUrl);
  await login.selectLanguage();
  await login.login(data.Email, data.password);
});
