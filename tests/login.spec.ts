import { test, expect } from '../fixtures/login.fixture'


test.describe('SauceDemo Login tests', () => {


    test('login with valid credetnails', async ({ loginPage, page }) => {
        await loginPage.enterUsername('standard_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()

        // loginPage.performLogin('standard_user','secret_sauce')
        //assertions
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(loginPage.ProductPageTitle).toBeVisible()
    })

 






})