import { test, expect } from '../fixtures/products.fixture'
import { CartPage } from '../pages/cartPage'
import { CheckoutPage } from '../pages/checkoutPage'

test.describe('Checkout', () => {
    test('Positive checkout', async ({ page, productsPage }) => {
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        // 1. Add a product, open the cart, and click Checkout.
        await productsPage.addItemToCart('Sauce Labs Backpack')
        await productsPage.openCart()
        await cartPage.checkout()
        await expect(page).toHaveURL(/checkout-step-one\.html/)

        // 2. Enter valid customer details and continue.
        await checkoutPage.enterCustomerDetails('Test', 'Customer', '12345')
        await checkoutPage.continueToOverview()
        await expect(page).toHaveURL(/checkout-step-two\.html/)

        const totals = await checkoutPage.getSummaryTotals()
        expect(totals.subtotal).toBe(29.99)
        expect(totals.tax).toBeGreaterThan(0)
        expect(totals.total).toBeCloseTo(totals.subtotal + totals.tax, 2)

        // 3. Finish the order.
        await checkoutPage.finishOrder()
        await expect(page).toHaveURL(/checkout-complete\.html/)
        await expect(checkoutPage.confirmationTitle).toBeVisible()
    })
})