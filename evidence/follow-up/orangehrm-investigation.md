# OrangeHRM: reset-link assertion investigation

## Question

Does the failed test demonstrate that password recovery is missing or broken?

## Evidence reviewed

- Saved pytest report: `test_forgot_password_link_opens_reset_page` failed at the presence assertion, before `click_forgot_password()`.
- Failure screenshot: “Forgot your password?” is visible below the Login button.
- Current project locator: `//*[contains(normalize-space(text()), 'Forgot your password')]`.
- `is_forgot_password_link_displayed()` calls a presence check. Despite its name, it does not assert visibility.
- The test checks the URL immediately after the click, without waiting for reset-page navigation. That is a separate timing risk, not the cause established by this saved failure.

## Disposition

The saved result is a failed automation check. The screenshot contradicts treating it as evidence of a missing visual control. The reset click and destination were never exercised in that run. The precise cause remains unresolved: the screenshot was captured after the assertion, and it does not provide the DOM or prove which locator revision ran.

Do not mark the product recovery feature broken, or change this historical failure to a pass, based on this review.

## Next execution

1. Record the checked-out commit and active locator.
2. Wait for the login page, then capture locator match count, matching element HTML and visibility at failure time.
3. Assert the reset control is visible and clickable, click it, then explicitly wait for the reset URL and form.
4. Attach the resulting report and screenshot, and record whether the cause is locator behaviour, timing or the application.

This is an evidence and source review, not a fresh run against the OrangeHRM demo. No passing retest is claimed.
