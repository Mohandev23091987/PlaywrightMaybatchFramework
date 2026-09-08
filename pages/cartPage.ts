import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly cartItems: Locator
    readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cartItems = page.locator('.cart_item')
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    }

    async verifyItems(items: string[]) {
        await expect(this.cartItems).toHaveCount(items.length)

        for (const item of items) {
            await expect(this.cartItems.filter({ hasText: item })).toHaveCount(1)
        }
    }

    async checkout() {
        await this.checkoutButton.click()
    }
}