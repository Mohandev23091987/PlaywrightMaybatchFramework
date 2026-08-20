import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import {ProductsPage} from '../pages/productPage'

//declartion of fixtures

export type ProuctsPageFixture ={
    productsPage:ProductsPage
}

base.extend<ProuctsPageFixture>({

productsPage: async({page},use)=>{

let loginPage = new LoginPage(page);
await loginPage.navigateToLogInPage(process.env.SAUCEDEMO_URL as string)
await loginPage.performLogin(process.env.SUACEDEMO_USERNAME as string, process.env.SUACEDEMO_PASSWORD as string)

let productsPage = new ProductsPage(page)
await productsPage.verifyPageLoaded()

await use(productsPage)

}

})





