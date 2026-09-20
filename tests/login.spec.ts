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

async function runWithExceptionHandling(
  testName: string,
  testBody: () => Promise<void>
): Promise<void> {
  try {
    await testBody()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[${testName}] failed: ${errorMessage}`)
    throw error
  }
}


test.describe('SauceDemo Login tests', () => {
    test('login with valid credetnails', async ({ loginPage, page }) => {
    await runWithExceptionHandling('login with valid credetnails', async () => {
      await loginPage.enterUsername(username)
      await loginPage.enterPassword(password)
      await loginPage.clickLoginButton()
      // loginPage.performLogin('standard_user','secret_sauce')
      // assertions
      await expect(page).toHaveURL(/\/inventory\.html/)
      await expect(loginPage.ProductPageTitle).toBeVisible()
    })
    })

    test('should not login with Locked user',async ({loginPage})=>{
    await runWithExceptionHandling('should not login with Locked user', async () => {
      await loginPage.performLogin(lockedUser,password)
      await expect(loginPage.errorMessage).toBeVisible()
      await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.lockedUser)
    })

    })

    //complete login without username 
    //login without password 
    // incorrect password 


    //parsing diffrent types of json

    test('should not login with incorrect password', async ({ loginPage, page }) => {
      try {
        await loginPage.performLogin(username, testData.credentails.invalidPassword)
        let age = 16;
        if(age>30){
          throw new Error('User is under 18 years old. Cannot proceed with login.')
        }

        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.inValidCrendentails)
      } 
      
      catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`[Test got] failed and error is : ${errorMessage}`)
        // throw error
        
        await page.screenshot({ path: 'error_screenshot.png', fullPage: true })
        //retry logic
        
        // console.log(error.name)
        // console.log(error.stack)
        // console.log(error.message)


        //throw error;

      }

      finally{

      //close DB connections 
      //close files 
      //cleanup activities

      }





    })

  test('should show validation when username is missing', async ({ loginPage }) => {
    try {
      await loginPage.enterPassword(password)
      await loginPage.loginButton.click()
      await expect(loginPage.errorMessage).toBeVisible()
      await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.userNameRequired)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`[should show validation when username is missing] failed: ${errorMessage}`)
      throw error
    }
  })

  test('should show validation when password is missing', async ({ loginPage }) => {
    try {
      await loginPage.enterUsername(username)
      await loginPage.loginButton.click()
      await expect(loginPage.errorMessage).toBeVisible()
      await expect(loginPage.errorMessage).toHaveText(testData.expectedMessages.passwordRequired)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`[should show validation when password is missing] failed: ${errorMessage}`)
      throw error
    }


    
  })





 






})
