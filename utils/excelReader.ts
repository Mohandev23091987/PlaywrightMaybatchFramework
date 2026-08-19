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








}