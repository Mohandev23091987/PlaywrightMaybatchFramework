import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import {ProductsPage} from '../pages/productPage'
import dotnev from 'dotenv'
import path from 'path'
dotnev.config({ path: path.resolve(__dirname,'../test.env') })
//declartion of fixtures

export type ProuctsPageFixture ={
    productsPage:ProductsPage
}

export let test =base.extend<ProuctsPageFixture>({

productsPage: async({page},use)=>{

    console.log('this setup run by fixture')
let loginPage = new LoginPage(page);
await loginPage.navigateToLogInPage(process.env.SAUCEDEMO_URL as string)
await loginPage.performLogin(process.env.SUACEDEMO_USERNAME as string, process.env.SUACEDEMO_PASSWORD as string)

let productsPage = new ProductsPage(page)
await productsPage.verifyPageLoaded()

await use(productsPage)

console.log('this is teardown')

}




})

export {expect}


// intialization 
//teardown 

//test  console.log('this is my test')





