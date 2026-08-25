import { Locator, Page, expect } from '@playwright/test'

export class ProductsPage {

    //locators 
    readonly page: Page;
    readonly pageTitle;
    readonly sortDropDown;
    readonly inventoryItems;
    readonly shoppingCartButton;

    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Products')
        this.sortDropDown = page.locator('[data-test="product-sort-container"]')
        this.inventoryItems = page.locator('.inventory_item')
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]')
        
    }

    //methods
    async verifyPageLoaded() {
        await expect(this.pageTitle).toBeVisible()
    }
    async sortBy(optionValue: string) {
        await this.sortDropDown.selectOption(optionValue)
    }
    async addItemToCart(itemName: string) {
        let itemCard = this.inventoryItems.filter({ hasText: itemName })
        await itemCard.getByRole('button', { name: 'Add to cart' }).click()
    }

    async removeItemFromCart(itemName: string) {
        let itemCard = this.inventoryItems.filter({ hasText: itemName })
        await itemCard.getByRole('button', { name: 'Remove' }).click()
    }
    async openItemDetails(itemName: string) {
        let itemCard = this.inventoryItems.filter({ hasText: itemName })
        await itemCard.locator('[data-test="inventory-item-name"]').click()
    }
    async getAllProductNames() {
        return await this.inventoryItems.locator('[data-test="inventory-item-name"]').allInnerTexts()
    }
    async getAllProductCards() {
        
    }


    async openCart() {
        await this.shoppingCartButton.click()
    }

    async getProductsCount(){

        return await this.inventoryItems.count()

    }

}
