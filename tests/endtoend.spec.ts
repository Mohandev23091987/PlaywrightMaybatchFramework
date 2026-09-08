import { test, expect } from '../fixtures/products.fixture'
import { CartPage } from '../pages/cartPage'
import { CheckoutPage } from '../pages/checkoutPage'

test('E2E-01 - complete a purchase with two products', async ({ page, productsPage }) => {
    const selectedProducts = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    await productsPage.addItemToCart(selectedProducts[0])
    await productsPage.addItemToCart(selectedProducts[1])
    await productsPage.openCart()

    await cartPage.verifyItems(selectedProducts)
    await cartPage.checkout()

    await checkoutPage.enterCustomerDetails('Test', 'Customer', '12345')
    await checkoutPage.continueToOverview()

    const totals = await checkoutPage.getSummaryTotals()
    expect(totals.subtotal).toBe(39.98)
    expect(totals.total).toBeCloseTo(totals.subtotal + totals.tax, 2)

    await checkoutPage.finishOrder()
    await expect(checkoutPage.confirmationTitle).toBeVisible()

    await checkoutPage.returnHome()
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(productsPage.pageTitle).toBeVisible()
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0)
})