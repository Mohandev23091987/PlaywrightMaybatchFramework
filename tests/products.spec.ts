import {test,expect} from '../fixtures/products.fixture'
import { ExcelReader } from '../utils/excelReader'


//let productcases = ExcelReader.read('Products')

// console.log(JSON.stringify(productcases))
// console.log(ExcelReader.read('Products','SauceDemoTestData.xlsx'))

console.log('=================================')

console.log(JSON.stringify(ExcelReader.getRowByTestCaseId('Products','PROD-01')))


test.describe('SauceDemo Product Scenarios',()=>{


    test('PROD-01 - Verify products page is display and products count', async ({productsPage})=>{

    await productsPage.verifyPageLoaded();
     
      


    })

  




})