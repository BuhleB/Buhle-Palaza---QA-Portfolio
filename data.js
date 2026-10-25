// Portfolio evidence. Keep historical outcomes separate from new execution results.
var EVIDENCE = {
  "makwande": [
    {
      "id": "mk-app",
      "category": "APPLICATION",
      "title": "Application walkthrough",
      "description": "The 4-step CV submission flow — Personal Info, Career Details, Documents and Review & Pay — showing the multi-step form a jobseeker completes end to end.",
      "source": "real",
      "asset": "images/makwande/mk-app.png",
      "tags": [
        "Flask",
        "Frontend"
      ]
    },
    {
      "id": "mk-arch",
      "category": "ARCHITECTURE",
      "title": "System architecture",
      "description": "Application architecture snapshot: Flask blueprints, SQLAlchemy persistence, Paystack and Resend integrations, and the configured deployment flow.",
      "source": "real",
      "asset": "images/makwande/mk-arch.png",
      "tags": [
        "Flask",
        "PostgreSQL"
      ]
    },
    {
      "id": "mk-admin",
      "category": "APPLICATION",
      "title": "Admin dashboard — submissions",
      "description": "The admin submissions view, filtering across all form types (Jobseeker CV, Employer Request, Career Enquiry, Talent Pipeline) with search and CSV export.",
      "source": "real",
      "asset": "images/makwande/mk-admin.png",
      "tags": [
        "Admin"
      ]
    },
    {
      "id": "mk-payments",
      "category": "APPLICATION",
      "title": "Payments flow — Paystack checkout",
      "description": "Paystack checkout shown in TEST mode. This screenshot documents the integration interface; it is not an executed payment test matrix.",
      "source": "real",
      "asset": "images/makwande/mk-payments.png",
      "tags": [
        "Paystack"
      ]
    },
    {
      "id": "mk-api",
      "category": "API",
      "title": "API authentication testing",
      "description": "API validation of the authentication workflow, independent of the UI.",
      "source": "pending",
      "replaceWith": "Postman screenshot (auth endpoint) — redact tokens/credentials first",
      "asset": null,
      "tags": [
        "Postman",
        "API",
        "Auth"
      ]
    },
    {
      "id": "mk-db",
      "category": "DATABASE",
      "title": "Data model",
      "description": "SQLAlchemy data-model snapshot for submission forms, membership and admin authentication.",
      "source": "real",
      "asset": "images/makwande/mk-db.png",
      "tags": [
        "PostgreSQL",
        "SQLAlchemy"
      ]
    },
    {
      "id": "mk-testing",
      "category": "TESTING",
      "title": "Test execution evidence",
      "description": "Saved PowerShell backend report: 30 passing HTTP checks in 60.66 seconds. See the results section for scope and security-label limitations.",
      "source": "real",
      "asset": "images/makwande/mk-testing.png",
      "tags": [
        "Backend testing",
        "Execution report"
      ]
    },
    {
      "id": "mk-security",
      "category": "SECURITY",
      "title": "Security controls",
      "description": "Implementation snapshot of password hashing, CSRF configuration and upload validation. Current source exempts selected routes; implementation is distinct from verified security coverage.",
      "source": "real",
      "asset": "images/makwande/mk-security.png",
      "tags": [
        "bcrypt",
        "CSRF"
      ]
    },
    {
      "id": "mk-cicd",
      "category": "CI/CD",
      "title": "Deployment pipeline",
      "description": "GitHub Actions configuration for four basic pytest checks and a dependent Render deploy hook. The 30-check PowerShell report is separate.",
      "source": "real",
      "asset": "images/makwande/mk-cicd.png",
      "tags": [
        "GitHub Actions",
        "Render"
      ]
    }
  ],
  "loomee": [
    {
      "id": "lm-app",
      "category": "APPLICATION",
      "title": "Forgot Password ROI — homepage",
      "description": "The application introduces its advertising, lead-generation and reporting features, with registration and login entry points.",
      "source": "real",
      "asset": "images/loomee/lm-home.png",
      "tags": [
        "Application",
        "Navigation"
      ]
    },
    {
      "id": "lm-advert",
      "category": "USER JOURNEY",
      "title": "Advertisement display",
      "description": "A product advertisement appears after the user selects forgot password. A Skip control continues the journey.",
      "source": "real",
      "asset": "images/loomee/lm-advert.png",
      "tags": [
        "User flow"
      ]
    },
    {
      "id": "lm-interest",
      "category": "FORMS",
      "title": "Conditional interest form",
      "description": "Selecting Yes reveals a purchase-date field. The completed example captures product interest, intended purchase date and a test email address.",
      "source": "real",
      "asset": "images/loomee/lm-interest.png",
      "tags": [
        "Dynamic forms",
        "Input handling"
      ]
    },
    {
      "id": "lm-database",
      "category": "DATABASE",
      "title": "Stored interest record",
      "description": "A saved example record shows product interest, purchase date and a test email address. This is a captured record, rather than a live database view.",
      "source": "real",
      "asset": "images/loomee/lm-database.png",
      "tags": [
        "MySQL",
        "Persistence"
      ]
    },
    {
      "id": "lm-reset",
      "category": "AUTHENTICATION",
      "title": "Password-reset request confirmation",
      "description": "The recovery screen displays confirmation that a password-reset link has been emailed.",
      "source": "real",
      "asset": "images/loomee/lm-reset-request.png",
      "tags": [
        "Password recovery",
        "Feedback"
      ]
    },
    {
      "id": "lm-reset-form",
      "category": "AUTHENTICATION",
      "title": "New-password form",
      "description": "The reset form contains email, password and password-confirmation fields. This view documents the interface before submission.",
      "source": "real",
      "asset": "images/loomee/lm-reset-form.png",
      "tags": [
        "Authentication",
        "Forms"
      ]
    },
    {
      "id": "lm-validation",
      "category": "VALIDATION",
      "title": "Client and server validation",
      "description": "JavaScript checks the interest form before submission; Laravel FormRequest rules validate submitted values on the server.",
      "source": "real",
      "asset": "images/loomee/lm-validation.png",
      "tags": [
        "Laravel",
        "Validation"
      ]
    }
  ],
  "qa": [
    {
      "id": "qa-ohrm-defects",
      "category": "APPLICATION",
      "title": "OrangeHRM — historical observations",
      "description": "Screenshots from the manual review. Username case behaviour and reset-email delivery require requirement or environment confirmation before classification as product defects.",
      "source": "real",
      "asset": "images/qa/qa-ohrm-defects.png",
      "tags": [
        "Selenium",
        "Manual QA"
      ]
    },
    {
      "id": "qa-ohrm-cases",
      "category": "TESTING",
      "title": "OrangeHRM — historical manual case table",
      "description": "Seven documented manual cases. The historical table marks an invalid-login run as Fail although the described rejection matches the expected result; the reviewed interpretation is recorded above. Automated source coverage is presented separately.",
      "source": "real",
      "asset": "images/qa/qa-ohrm-cases.png",
      "tags": [
        "Test Design"
      ]
    },
    {
      "id": "qa-sd-evidence",
      "category": "TESTING",
      "title": "SauceDemo — code and historical findings",
      "description": "A code excerpt and historical manual findings. Postal-code format validity requires a country-specific requirement; this image is not the execution report for the Selenium suite.",
      "source": "real",
      "asset": "images/qa/qa-sd-evidence.png",
      "tags": [
        "Selenium",
        "TestNG",
        "Java"
      ]
    },
    {
      "id": "qa-sd-coverage",
      "category": "TESTING",
      "title": "SauceDemo — historical manual coverage",
      "description": "Historical documentation lists 70 manual cases and an earlier pass-rate summary. These figures are not the current automation results; the saved Extent reports record 54 passing executions.",
      "source": "real",
      "asset": "images/qa/qa-sd-coverage.png",
      "tags": [
        "Test Coverage"
      ]
    }
  ]
};
var CASE_LINKS = {
  "makwande": {
    "github": "https://github.com/IviweHlatana/Makwande_Platform",
    "live": "https://makwande-platform.onrender.com/"
  },
  "loomee": {
    "github": null,
    "live": null
  },
  "qa": {
    "github": null,
    "live": null,
    "repositories": [
      {
        "label": "ORANGEHRM SOURCE",
        "url": "https://github.com/BuhleB/orangehrm-selenium-tests"
      },
      {
        "label": "SAUCEDEMO SOURCE",
        "url": "https://github.com/BuhleB/saucedemo-selenium-testng-framework"
      },
      {
        "label": "MAKWANDE SOURCE",
        "url": "https://github.com/IviweHlatana/Makwande_Platform"
      }
    ]
  },
  "automation": {
    "github": null,
    "live": null,
    "repositories": [
      {
        "label": "ORANGEHRM SOURCE",
        "url": "https://github.com/BuhleB/orangehrm-selenium-tests"
      },
      {
        "label": "SAUCEDEMO SOURCE",
        "url": "https://github.com/BuhleB/saucedemo-selenium-testng-framework"
      }
    ]
  }
};
var QA_LAB = {
  "testCases": [
    {
      "id": "testSuccessfulLogin",
      "title": "SauceDemo: successful login",
      "type": "positive",
      "source": "real",
      "precondition": "SauceDemo login page; fresh browser session.",
      "steps": [
        "Log in as standard_user using the demo password",
        "Read the Products page title"
      ],
      "expected": "The Products page title is displayed.",
      "result": "pass",
      "actual": "PASS in the saved Chrome full-regression report.",
      "note": "Source: LoginTests.java; full-regression Extent report."
    },
    {
      "id": "testLockedOutUser",
      "title": "SauceDemo: locked-out user",
      "type": "negative",
      "source": "real",
      "precondition": "SauceDemo login page; fresh browser session.",
      "steps": [
        "Log in as locked_out_user",
        "Check the error text and URL"
      ],
      "expected": "The lockout message appears and the user does not reach inventory.",
      "result": "pass",
      "actual": "PASS in the saved Chrome full-regression report.",
      "note": "Source: LoginTests.java."
    },
    {
      "id": "testCheckoutEmptyPostalCode",
      "title": "SauceDemo: required postal code",
      "type": "negative",
      "source": "real",
      "precondition": "SauceDemo login page; fresh browser session.",
      "steps": [
        "Log in as standard_user and add an item",
        "Open checkout, fill the name fields and leave postal code empty",
        "Continue"
      ],
      "expected": "The Postal Code is required error appears; checkout remains on step one.",
      "result": "pass",
      "actual": "PASS in the saved Chrome full-regression report.",
      "note": "Checks a required value; it does not establish country-specific postal-code format validation."
    },
    {
      "id": "testLoginDataDriven",
      "title": "SauceDemo: six login data rows",
      "type": "data-driven",
      "source": "real",
      "precondition": "SauceDemo login page; fresh browser session.",
      "steps": [
        "Run loginData for standard_user, locked_out_user, problem_user, performance_glitch_user, error_user and visual_user",
        "Assert the expected destination or error"
      ],
      "expected": "Five user types reach inventory; locked_out_user receives the lockout message.",
      "result": "pass",
      "actual": "All 6 data rows passed in the saved Chrome full-regression report.",
      "note": "One parameterized method; six executions. Source: DataDrivenTests.java."
    },
    {
      "id": "testCompletePurchaseFlow",
      "title": "SauceDemo: cross-browser purchase flow",
      "type": "positive",
      "source": "real",
      "precondition": "SauceDemo login page; fresh browser session.",
      "steps": [
        "Log in, add two items and verify the cart",
        "Complete checkout using the supplied test data",
        "Assert the order confirmation"
      ],
      "expected": "Two items are present and checkout ends with Thank you for your order!",
      "result": "pass",
      "actual": "PASS on Chrome, Firefox and Edge in the saved 15-execution report.",
      "note": "Source: CrossBrowserTests.java."
    },
    {
      "id": "test_successful_login",
      "title": "OrangeHRM: successful login",
      "type": "positive",
      "source": "real",
      "precondition": "OrangeHRM public demo; Chrome browser fixture available.",
      "steps": [
        "Open the login page",
        "Log in with the public demo credentials",
        "Check dashboard presence"
      ],
      "expected": "The dashboard loads after valid credentials.",
      "result": "pass",
      "actual": "PASS in the saved pytest-html report.",
      "note": "Outcome from my saved OrangeHRM pytest-html report."
    },
    {
      "id": "test_login_with_invalid_credentials_is_rejected",
      "title": "OrangeHRM: invalid credentials",
      "type": "data-driven",
      "source": "real",
      "precondition": "OrangeHRM public demo; Chrome browser fixture available.",
      "steps": [
        "Run the wrong_password and wrong_username data rows",
        "Check the error and current URL"
      ],
      "expected": "Invalid credentials is displayed and the dashboard is not reached.",
      "result": "pass",
      "actual": "Both parameterized cases PASS in the saved pytest-html report.",
      "note": "Outcome from my saved OrangeHRM pytest-html report."
    },
    {
      "id": "test_forgot_password_link_opens_reset_page",
      "title": "OrangeHRM: reset-page navigation",
      "type": "positive",
      "source": "real",
      "precondition": "OrangeHRM public demo; Chrome browser fixture available.",
      "steps": [
        "Open login",
        "Locate the recovery control by text and click it",
        "Check the reset-page URL"
      ],
      "expected": "The recovery link is found and opens a URL containing passwordreset.",
      "result": "fail",
      "actual": "FAIL in the saved pytest-html report: Forgot password link not found on login page.",
      "note": "The recorded failure is a link-presence assertion. The project source uses a text-based locator; the saved report does not establish a successful retest. This is not evidence that the application has no recovery link."
    },
    {
      "id": "test_username_is_not_case_sensitive",
      "title": "OrangeHRM: username case observation",
      "type": "positive",
      "source": "real",
      "precondition": "OrangeHRM public demo; Chrome browser fixture available.",
      "steps": [
        "Use the lower-case demo username",
        "Check dashboard presence"
      ],
      "expected": "Logging in with the lower-case demo username reaches the dashboard.",
      "result": "pass",
      "actual": "PASS in the saved pytest-html report.",
      "note": "The observation passes for lower-case usernames. Whether that behaviour is a defect depends on requirements."
    },
    {
      "id": "test_apply_leave_form_is_available",
      "title": "OrangeHRM: leave-form availability",
      "type": "positive",
      "source": "real",
      "precondition": "OrangeHRM public demo; Chrome browser fixture available.",
      "steps": [
        "Log in and navigate to Leave, then Apply Leave",
        "Check the balance message and dropdown"
      ],
      "expected": "The no-balance message is absent and the leave-type dropdown is available.",
      "result": "xfail",
      "actual": "XFAIL in the saved pytest-html report: Leave type dropdown not available.",
      "note": "The saved failure occurs at the dropdown assertion, after the no-balance check. The test is marked xfail(strict=False); an XPASS would not by itself prove a product fix."
    }
  ],
  "defects": [
    {
      "id": "BUG-MK-001",
      "title": "FREE PIPELINE SUBMISSIONS NOT PERSISTED TO DATABASE",
      "source": "real",
      "severity": "Critical",
      "priority": "Critical",
      "environment": "Production — Render / PostgreSQL",
      "status": "Fix present; retest recorded",
      "description": "The recorded investigation describes successful uploads and notification emails, but no saved Free Talent Pipeline submission in the admin list.",
      "steps": [
        "Submit the Free Pipeline Membership form with a valid CV upload",
        "Confirm the success message and admin notification email arrive",
        "Check the admin dashboard's Talent Pipeline list"
      ],
      "expected": "The new submission appears in the admin dashboard's Talent Pipeline list.",
      "actual": "No record exists — db.session.add() and db.session.commit() were never called after the object was built, so the insert silently never happened.",
      "lifecycle": [
        {
          "stage": "DISCOVERED",
          "time": "0 pipeline records despite emails sending"
        },
        {
          "stage": "ROOT CAUSE FOUND",
          "time": "missing db.session.commit()"
        },
        {
          "stage": "DATA RECOVERED",
          "time": "16 submissions rebuilt from logs"
        },
        {
          "stage": "FIXED",
          "time": "save calls added"
        },
        {
          "stage": "RETESTED & REGRESSION-CHECKED",
          "time": "Recorded as PASS for four other form types; retest log not attached"
        }
      ]
    }
  ],
  "crossBrowser": [
    {
      "feature": "Invalid login — testInvalidLogin",
      "source": "real",
      "chrome": "pass",
      "edge": "pass",
      "firefox": "pass"
    },
    {
      "feature": "Valid login — testValidLogin",
      "source": "real",
      "chrome": "pass",
      "edge": "pass",
      "firefox": "pass"
    },
    {
      "feature": "Purchase flow — testCompletePurchaseFlow",
      "source": "real",
      "chrome": "pass",
      "edge": "pass",
      "firefox": "pass"
    },
    {
      "feature": "Logout — testLogout",
      "source": "real",
      "chrome": "pass",
      "edge": "pass",
      "firefox": "pass"
    },
    {
      "feature": "Add/remove cart items — testAddRemoveItemsFromCart",
      "source": "real",
      "chrome": "pass",
      "edge": "pass",
      "firefox": "pass"
    }
  ]
};
