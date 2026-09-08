import { test, expect } from '../fixtures/products.fixture'
import { CartPage } from '../pages/cartPage'
import { ProductsPage } from '../pages/productPage'
import { Page } from '@playwright/test'

async function openCheckout(page: Page, productsPage: ProductsPage) {
    const cartPage = new CartPage(page)

    // 1. Add a product, open the cart, and click Checkout.
    await productsPage.addItemToCart('Sauce Labs Backpack')
    await productsPage.openCart()
    await cartPage.checkout()
    await expect(page).toHaveURL(/checkout-step-one\.html/)
}

test.describe('Checkout', () => {
    test('Negative checkout validation', async ({ page, productsPage }) => {
        const errorMessage = page.locator('[data-test="error"]')
        const continueButton = page.getByRole('button', { name: 'Continue' })
        const firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        const lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        const postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' })

        await openCheckout(page, productsPage)

        // 2. Submit checkout with the first name missing.
        await lastNameInput.fill('Customer')
        await postalCodeInput.fill('12345')
        await continueButton.click()
        await expect(errorMessage).toHaveText('Error: First Name is required')
        await expect(page).toHaveURL(/checkout-step-one\.html/)

        // 3. Submit checkout with the last name missing.
        await firstNameInput.fill('Test')
        await lastNameInput.fill('')
        await continueButton.click()
        await expect(errorMessage).toHaveText('Error: Last Name is required')
        await expect(page).toHaveURL(/checkout-step-one\.html/)

        // 4. Submit checkout with the postal code missing.
        await lastNameInput.fill('Customer')
        await postalCodeInput.fill('')
        await continueButton.click()
        await expect(errorMessage).toHaveText('Error: Postal Code is required')
        await expect(page).toHaveURL(/checkout-step-one\.html/)
    })
})