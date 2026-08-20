import * as path from 'path'
import * as XLSX from 'xlsx' 


export class ExcelReader {

static read<T>(sheetName:string,fileName:string='SauceDemoTestData.xlsx') : T[] {

    let filePath = path.join(process.cwd(),'testdata',fileName)   //C:\SauceDemoPlaywrightFramework\testdata\SauceDemoTestData.xlsx
    let workbook = XLSX.readFile(filePath) 
    let worksheet = workbook.Sheets[sheetName]

    if(!worksheet){
       throw new Error(`sheet "${sheetName}" is not found in the ${fileName}`)
    }

    return XLSX.utils.sheet_to_json(worksheet,{defval:'',raw:false})

}

//{TestCaseID:PROD-02, Functionality:Products,Username:standard_user,Password:secret_sauce,ProductName:Sauce Labs Backpack | Sauce Labs Bike Light | Sauce Labs Bolt T-Shirt | Sauce Labs Fleece Jacket | Sauce Labs Onesie | Test.allTheThings() T-Shirt (Red)}

static getRowByTestCaseId<T>(sheetName:string,testCaseId:string,fileName:string='SauceDemoTestData.xlsx'):T|undefined
{
    let rows = this.read<T>(sheetName,fileName)
    return rows.find((row:any) => 
        String(row.TestCaseID ?? '').trim() === testCaseId    
    )
}

static getCellValue<T>(sheetName:string,testCaseId:string,columnName:string,fileName:string='SauceDemoTestData.xlsx'):string{
let row:any = this.getRowByTestCaseId(sheetName,testCaseId,fileName)
return String(row?.[columnName]??'').trim();
}










}