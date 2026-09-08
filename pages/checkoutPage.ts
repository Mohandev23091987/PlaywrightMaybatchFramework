import { expect, Locator, Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly continueButton: Locator
    readonly finishButton: Locator
    readonly backHomeButton: Locator
    readonly summarySubtotal: Locator
    readonly summaryTax: Locator
    readonly summaryTotal: Locator
    readonly confirmationTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' })
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.finishButton = page.getByRole('button', { name: 'Finish' })
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' })
        this.summarySubtotal = page.locator('[data-test="subtotal-label"]')
        this.summaryTax = page.locator('[data-test="tax-label"]')
        this.summaryTotal = page.locator('[data-test="total-label"]')
        this.confirmationTitle = page.getByText('Thank you for your order!')
    }

    async enterCustomerDetails(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.postalCodeInput.fill(postalCode)
    }

    async continueToOverview() {
        await this.continueButton.click()
    }

    async getSummaryTotals() {
        const subtotal = await this.summarySubtotal.innerText()
        const tax = await this.summaryTax.innerText()
        const total = await this.summaryTotal.innerText()

        return {
            subtotal: Number(subtotal.replace(/[^\d.]/g, '')),
            tax: Number(tax.replace(/[^\d.]/g, '')),
            total: Number(total.replace(/[^\d.]/g, ''))
        }
    }

    async finishOrder() {
        await this.finishButton.click()
    }

    async returnHome() {
        await this.backHomeButton.click()
    }
}