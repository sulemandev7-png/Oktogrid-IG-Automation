const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.languageRadio = page.getByRole("radio", { name: "English" });
    this.selectLanguageButton = page.getByRole("button", { name: "Select" });
    this.endUserEmail = page.getByRole("textbox", {
      name: "person@company.io",
    });
    this.endUserPassword = page.getByRole("textbox", { name: "••••••••••••" });
    this.loginBtn = page.locator("div").filter({ hasText: /^Log in$/ });
  }
  async goto(devUrl) {
    console.log("Navigating to:", devUrl);
    await this.page.goto(devUrl);
  }
  async selectLanguage() {
    await this.languageRadio.click();
    await this.selectLanguageButton.click();
  }
  async login(email, password) {
    console.log("Logging in as:", email);
    await this.endUserEmail.fill(email);
    await this.endUserPassword.fill(password);
    await this.loginBtn.click();
  }
  async assertErrorMessageVisible(expectedError) {
    const errorMessage = this.page
      .locator("div[data-content]")
      .filter({ hasText: expectedError });
    await expect(errorMessage).toBeVisible();
  }
}
module.exports = { LoginPage };
