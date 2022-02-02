// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "spellcheck"],
  extends: [
    "plugin:jest/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  "rules": {
    "@typescript-eslint/ban-ts-comment": "off",
    "spellcheck/spell-checker": [1,
      {
        "identifiers": false,
        "templates": true,
        "lang": "en_US",
        "skipWords": [
          "BerkShares",
          "checkcircleo",
          "exclamationcircleo",
          "closecircleo",
          "Dwolla",
          "arrowright",
          "arrowleft",
          "Firstname",
          "Lastname",
          "Businessname",
          "American",
          "Mastercard",
          "Deployer",
          "Barrington",
          "Plex",
          "Passcode",
          "Onboarding",
          "mainscreen",
          "Signup",
          "Cashout",
          "Loadup",
          "Cognito",
          "esraa",
          "signinresponse",
          "signin",
          "signedup",
          "webhook",
          "authed"
        ],
        "minLength" : 4
      }
    ]
  }
};
