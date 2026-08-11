/*
declaration of locators 
intialization of locators in contructor
write reusable methods
*/

import { Locator, Page, expect } from '@playwright/test'
export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly ProductPageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'username' })
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
        this.ProductPageTitle =page.getByText('Products')
    }

    //methods 
    async navigateToLogInPage(url: string): Promise<void> {
        await this.page.goto(url);
        await expect(this.page).toHaveURL(url)
    }
    async enterUsername(username: string): Promise<void> {
        await this.userNameInput.fill(username)
    }
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }
    async performLogin(username: string, password: string): Promise<void> {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.clickLoginButton()
    }

    async getErrorText(): Promise<string> {
        return this.errorMessage.innerText()
    }

    async validateLandingPage(): Promise<boolean> {
        return await this.ProductPageTitle.isVisible()
    }

    


}

