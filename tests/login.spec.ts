import { test, expect } from '../fixtures/login.fixture'
import dotnev from 'dotenv'
import path from 'path'
import {JsonReader} from '../utils/jsonReader'

//tagging 
//tracing 

//reading the environment file 

dotnev.config({ path: path.resolve(__dirname,'../test.env') })
console.log(__dirname)
console.log(path.resolve(__dirname,'../test.env') )

let url =process.env.SAUCEDEMO_URL as string
let username = process.env.SUACEDEMO_USERNAME as string 
let password = process.env.SUACEDEMO_PASSWORD as string

//reading the data from json
let testData = JsonReader.read<any>('sauceDemoData.json')
let lockedUser = testData.credentails.lockedUser


test.describe('SauceDemo Login tests', () => {
    test('login with valid credetnails', async ({ loginPage, page }) => {
        await loginPage.enterUsername(username)
        await loginPage.enterPassword(password)
        await loginPage.clickLoginButton()
        // loginPage.performLogin('standard_user','secret_sauce')
        //assertions
        await expect(page).toHaveURL(/\/inventory\.html/)
        await expect(loginPage.ProductPageTitle).toBeVisible()
    })

    test('should not login with Locked user',async ({loginPage})=>{
        loginPage.performLogin(lockedUser,password)
        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.lockedUser)

    })

    //complete login without username 
    //login without password 
    // incorrect password 


    //parsing diffrent types of json

    test('should not login with incorrect password', async ({ loginPage }) => {
    await loginPage.performLogin(username, testData.credentails.invalidPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.inValidCrendentails);
  });

  test('should show validation when username is missing', async ({ loginPage }) => {


    await loginPage.enterPassword(password)
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.userNameRequired);
  });

  test('should show validation when password is missing', async ({ loginPage }) => {
    await loginPage.enterUsername(username)
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.passwordRequired);
  });

//added new code
//added new code
//added new code
//added new code
//added new code
//added new code
//added new code



 






})