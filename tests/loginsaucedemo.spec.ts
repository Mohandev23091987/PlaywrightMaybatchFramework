import { test, expect } from '../fixtures/login.fixture'
import { JsonReader } from '../utils/jsonReader'

type LoginTestData = {
    credentails: {
        validuser: string
        validPassword: string
        lockedUser: string
        invalidPassword: string
    }
    expectedMessages: {
        lockedUser: string
        inValidCrendentails: string
        userNameRequired: string
        passwordRequired: string
    }
}

const testData = JsonReader.read<LoginTestData>('sauceDemoData.json')
const { credentails, expectedMessages } = testData

// spec: specs/login-manual-test-plan.md

test.describe('SauceDemo Login', () => {
    test('Valid standard user login', async ({ loginPage, page }) => {
        // 1. Open https://www.saucedemo.com/ in a fresh browser session.
        await expect(loginPage.userNameInput).toBeVisible()
        await expect(loginPage.passwordInput).toBeVisible()
        await expect(loginPage.loginButton).toBeEnabled()

        // 2. Enter standard_user in the Username field.
        await loginPage.enterUsername(credentails.validuser)
        await expect(loginPage.userNameInput).toHaveValue(credentails.validuser)

        // 3. Enter secret_sauce in the Password field.
        await loginPage.enterPassword(credentails.validPassword)
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password')

        // 4. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL(/\/inventory\.html/)
        await expect(loginPage.ProductPageTitle).toBeVisible()
        await expect(loginPage.errorMessage).toBeHidden()
    })

    test('Locked-out user cannot log in', async ({ loginPage, page }) => {
        // 1. Open the login page in a fresh browser session.
        await expect(loginPage.userNameInput).toBeVisible()
        // 2. Enter locked_out_user in the Username field.
        await loginPage.enterUsername(credentails.lockedUser)
        // 3. Enter secret_sauce in the Password field.
        await loginPage.enterPassword(credentails.validPassword)
        // 4. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.lockedUser)
        await expect(loginPage.ProductPageTitle).toBeHidden()
    })

    test('Invalid username and password are rejected', async ({ loginPage, page }) => {
        // 1. Open the login page in a fresh browser session.
        await expect(loginPage.userNameInput).toBeVisible()
        // 2. Enter an invalid username and password.
        await loginPage.enterUsername('invalid_user')
        await loginPage.enterPassword('invalid_password')
        // 3. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.inValidCrendentails)
        await expect(loginPage.ProductPageTitle).toBeHidden()
    })

    test('Login with blank username', async ({ loginPage, page }) => {
        // 1. Open the login page with blank fields.
        await expect(loginPage.userNameInput).toHaveValue('')
        // 2. Leave Username blank and enter secret_sauce in Password.
        await loginPage.enterPassword(credentails.validPassword)
        // 3. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.userNameRequired)
    })

    test('Login with blank password', async ({ loginPage, page }) => {
        // 1. Open the login page with blank fields.
        await expect(loginPage.passwordInput).toHaveValue('')
        // 2. Enter standard_user and leave Password blank.
        await loginPage.enterUsername(credentails.validuser)
        // 3. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.passwordRequired)
    })

    test('Login with both fields blank', async ({ loginPage, page }) => {
        // 1. Open the login page with both fields blank.
        await expect(loginPage.userNameInput).toHaveValue('')
        await expect(loginPage.passwordInput).toHaveValue('')
        // 2. Click Login without entering credentials.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.userNameRequired)
        await expect(loginPage.ProductPageTitle).toBeHidden()
    })

    test('Login credentials with whitespace are rejected consistently', async ({ loginPage, page }) => {
        // 1. Open the login page in a fresh browser session.
        await expect(loginPage.userNameInput).toBeVisible()
        // 2. Enter standard_user with surrounding whitespace and a valid password.
        await loginPage.enterUsername(` ${credentails.validuser} `)
        await loginPage.enterPassword(credentails.validPassword)
        // 3. Click Login.
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(loginPage.errorMessage).toHaveText(expectedMessages.inValidCrendentails)
    })

    test('Password is masked and login controls are keyboard accessible', async ({ loginPage, page }) => {
        // 1. Open the login page and verify the login controls.
        await expect(loginPage.userNameInput).toBeVisible()
        await expect(loginPage.passwordInput).toBeVisible()
        await expect(loginPage.loginButton).toBeEnabled()
        // 2. Enter a password value.
        await loginPage.enterPassword(credentails.validPassword)
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password')
        // 3. Use keyboard navigation from Username to Password to Login.
        await loginPage.userNameInput.focus()
        await page.keyboard.press('Tab')
        await expect(loginPage.passwordInput).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(loginPage.loginButton).toBeFocused()
        // 4. Reload the login page before submitting credentials.
        await page.reload()
        await expect(loginPage.userNameInput).toHaveValue('')
        await expect(loginPage.passwordInput).toHaveValue('')
        await expect(loginPage.loginButton).toBeVisible()
    })
})