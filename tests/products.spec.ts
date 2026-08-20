import {test,expect} from '../fixtures/products.fixture'
import { ExcelReader } from '../utils/excelReader'


//let productcases = ExcelReader.read('Products')

// console.log(JSON.stringify(productcases))
console.log(ExcelReader.read('Products','SauceDemoTestData.xlsx'))
console.log('=================================')
console.log(ExcelReader.getRowByTestCaseId<any>('Products','PROD-01'));
console.log((ExcelReader.getRowByTestCaseId<any>('Products','PROD-01'))?.ProductsCount)
console.log(JSON.stringify(ExcelReader.getCellValue('Products','PROD-01','ProductsCount')))


test.describe('SauceDemo Product Scenarios',()=>{
    test('PROD-01 - Verify products page is display and products count', async ({productsPage})=>{
    await productsPage.verifyPageLoaded();
    })

  




})