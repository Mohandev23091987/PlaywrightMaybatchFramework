import { test, expect } from '../fixtures/products.fixture'
import { CartPage } from '../pages/cartPage'
import { ProductsPage } from '../pages/productPage'
import { Page } from '@playwright/test'

async function openCheckout(page: Page, productsPage: ProductsPage) {
    const cartPage = new CartPage(page)

    try {
        // 1. Add a product, open the cart, and click Checkout.
        await productsPage.addItemToCart('Sauce Labs Onesie')
        await productsPage.openCart()
        await cartPage.checkout()
        await expect(page).toHaveURL(/checkout-step-one\.html/)
    } catch (error) {
        console.error('Failed while opening checkout page:', error)
        throw error
    }
}

test.describe('Checkout', () => {
    test('Checkout edge cases', async ({ page, productsPage }) => {
        const firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        const lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        const postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' })
        const continueButton = page.getByRole('button', { name: 'Continue' })
        const errorMessage = page.locator('[data-test="error"]')

        try {
            await openCheckout(page, productsPage)

            // 2. Use long customer values and continue.
            const firstName = 'A'.repeat(40)
            const lastName = 'B'.repeat(40)
            const postalCode = '12345678901234567890'
            await firstNameInput.fill(firstName)
            await lastNameInput.fill(lastName)
            await postalCodeInput.fill(postalCode)
            await expect(firstNameInput).toHaveValue(firstName)
            await expect(lastNameInput).toHaveValue(lastName)
            await expect(postalCodeInput).toHaveValue(postalCode)
            await continueButton.click()
            await expect(page).toHaveURL(/checkout-step-two\.html/)

            // 3. Start a fresh checkout, enter a value, and cancel back to the cart.
            await page.goto('https://www.saucedemo.com/inventory.html')
            await productsPage.openCart()
            await page.getByRole('button', { name: 'Checkout' }).click()
            await firstNameInput.fill('Test')
            await page.getByRole('button', { name: 'Cancel' }).click()
            await expect(page).toHaveURL(/cart\.html/)
            await expect(page.getByText('Your Cart')).toBeVisible()
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

            // 4. Reopen checkout, correct a validation error, and continue.
            await page.getByRole('button', { name: 'Checkout' }).click()
            await firstNameInput.fill('Test')
            await continueButton.click()
            await expect(errorMessage).toHaveText('Error: Last Name is required')
            await expect(firstNameInput).toHaveValue('Test')
            await lastNameInput.fill('Customer')
            await postalCodeInput.fill('12345')
            await continueButton.click()
            await expect(page).toHaveURL(/checkout-step-two\.html/)
        } catch (error) {
            console.error('Checkout edge-case test failed with exception:', error)
            throw error
        }
    })
})