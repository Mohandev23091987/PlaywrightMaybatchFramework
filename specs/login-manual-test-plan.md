# SauceDemo Login Manual Test Plan

## Application Overview

Manual test coverage for the SauceDemo login page at https://www.saucedemo.com/. The login form contains Username, Password, and Login controls. SauceDemo provides standard_user and other documented users, with secret_sauce as the password. Each test starts from a fresh browser session on the login page with blank fields and no existing session.

## Test Scenarios

### 1. SauceDemo Login

**Seed:** `tests/login.spec.ts`

#### 1.1. Valid standard user login

**File:** `manual-tests/login/valid-standard-user-login.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The SauceDemo login page is displayed.
    - expect: Username and Password fields are empty.
    - expect: The Login button is visible and enabled.
  2. Enter standard_user in the Username field.
    - expect: The Username field displays standard_user.
  3. Enter secret_sauce in the Password field.
    - expect: The Password field accepts the value and masks the characters.
  4. Click Login.
    - expect: The user is authenticated successfully.
    - expect: The browser navigates to the inventory page at /inventory.html.
    - expect: The Products heading is visible.
    - expect: No login error is displayed.

#### 1.2. Locked-out user cannot log in

**File:** `manual-tests/login/locked-out-user.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed with blank Username and Password fields.
  2. Enter locked_out_user in the Username field.
    - expect: The Username field displays locked_out_user.
  3. Enter secret_sauce in the Password field.
    - expect: The Password value is masked.
  4. Click Login.
    - expect: The user remains on the login page.
    - expect: The error message reads: Epic sadface: Sorry, this user has been locked out.
    - expect: The inventory page is not opened.

#### 1.3. Invalid username and password are rejected

**File:** `manual-tests/login/invalid-credentials.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed.
  2. Enter an invalid username such as invalid_user.
    - expect: The Username field contains the entered value.
  3. Enter an invalid password such as invalid_password.
    - expect: The Password field contains masked characters.
  4. Click Login.
    - expect: The user remains on the login page.
    - expect: The error message reads: Epic sadface: Username and password do not match any user in this service.
    - expect: The inventory page is not opened.

#### 1.4. Login with blank username

**File:** `manual-tests/login/blank-username.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed with blank fields.
  2. Leave Username blank and enter secret_sauce in Password.
    - expect: The Password field contains masked characters.
    - expect: The Username field remains empty.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: The error message reads: Epic sadface: Username is required.
    - expect: The inventory page is not opened.

#### 1.5. Login with blank password

**File:** `manual-tests/login/blank-password.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed with blank fields.
  2. Enter standard_user in Username and leave Password blank.
    - expect: The Username field contains standard_user.
    - expect: The Password field remains empty.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: The error message reads: Epic sadface: Password is required.
    - expect: The inventory page is not opened.

#### 1.6. Login with both fields blank

**File:** `manual-tests/login/both-fields-blank.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed with both fields blank.
  2. Click Login without entering any credentials.
    - expect: The user remains on the login page.
    - expect: The error message reads: Epic sadface: Username is required.
    - expect: No inventory content is displayed.

#### 1.7. Login credentials are trimmed or rejected consistently

**File:** `manual-tests/login/credentials-with-whitespace.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The login page is displayed.
  2. Enter standard_user with leading or trailing spaces in Username and enter secret_sauce in Password.
    - expect: The entered username is visible in the field or the application handles the whitespace consistently.
  3. Click Login.
    - expect: The application follows its defined whitespace behavior consistently.
    - expect: If whitespace is not accepted, the user remains on the login page with the invalid-credentials message.
    - expect: If whitespace is trimmed, the user navigates to /inventory.html.

#### 1.8. Password is masked and login controls are usable

**File:** `manual-tests/login/login-controls-and-password-masking.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: The SauceDemo branding is visible.
    - expect: Username and Password fields are visible.
    - expect: The Login button is visible and enabled.
  2. Enter any password value in the Password field.
    - expect: The password is visually masked and is not shown as plain text.
  3. Use keyboard navigation from Username to Password to Login.
    - expect: Focus moves through the form controls in a logical order.
    - expect: The Login button can be activated using the keyboard.
  4. Reload the login page before submitting credentials.
    - expect: The page reloads successfully.
    - expect: Previously entered credentials are not exposed or unexpectedly submitted.
    - expect: The login page remains available.
