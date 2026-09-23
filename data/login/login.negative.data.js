require("dotenv").config();

module.exports = {
  serverErrors: [
    {
      scenario: "Logging in with wrong email ",
      Email: "malicksuleman440@gmail.com",
      password: process.env.TEST_LOGIN_PASSWORD || "",
      expectedError: "User does not exist.",
    },
    {
      scenario: "Incompelte password requirement missing special character",
      Email: process.env.TEST_LOGIN_EMAIL || "",
      password: process.env.TEST_LOGIN_PASSWORD_NO_SYMBOL || "",
      expectedError:
        "Password: Password must contain at least 1 special character.",
    },
    {
      scenario: " wrong password",
      Email: process.env.TEST_LOGIN_EMAIL || "",
      password: process.env.TEST_LOGIN_PASSWORD_WRONG || "",
      expectedError: "Incorrect username or password.",
    },
  ],
  clientValidation: [
    {
      scenario: "Invalid email format missing '@' symbol",
      Email: "notanemail",
      password: process.env.TEST_LOGIN_PASSWORD || "",
      expectedValidationMessage:
        "Please include an '@' in the email address. 'notanemail' is missing an '@'.",
    },
    {
      scenario: "SQL injection attempt in email field",
      Email: "' OR '1'='1@test.com",
      password: "' OR '1'='1",
      expectedValidationMessage:
        "A part followed by '@' should not contain the symbol ' '.",
    },
  ],
};
