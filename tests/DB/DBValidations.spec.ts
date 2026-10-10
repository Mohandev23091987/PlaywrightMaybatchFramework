import {test,expect} from '@playwright/test';
import {createConnection, RowDataPacket} from 'mysql2/promise';


// create a connection to the database 

let db : Awaited< ReturnType <typeof createConnection>>;



test.beforeAll(async () => {

    db = await createConnection(
     {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'intro_sql',
      connectTimeout: 10000,
     }
    );
}
)


test.afterAll(async () => {
    await db.end();
});


//validate db connected and able to query the database

test('Validate the Database connection',async ()=>{
    let [rows] = await db.execute<RowDataPacket[]>('select database() as database_name');
    console.log(rows[0].database_name)
    expect(rows[0].database_name).toBe('intro_sql')
})


test('validate the count of employees in employee table', async ()=>{

//form the query 

let query = 'select count(*) as Count from employees'

//execute the query and //store the results
let [rows] = await db.execute<RowDataPacket[]>(query);

expect(rows.length).toBeGreaterThan(0)

//validate the results
 expect(Number(rows[0].Count)).toBe(13)
})



test('validate the customer details', async ()=>{

//form the query 

let query = "select * from customers"

//execute the query and //store the results
let [rows] = await db.execute<RowDataPacket[]>(query);

//expect(rows).toHaveLength(13)

// expect(rows[0]).toMatchObject({
// id:2,
// employee_id:2,
// company_name:'Alfreds Futterkiste',
// address:'Obere Str. 57',
// city:'Berlin'
// })

let expectedCustomer = {
    id:2,
employee_id:2,
company_name:'Alfreds Futterkiste',
address:'Obere Str. 57',
city:'Berlin'
};

console.log(rows[0]['id'])
let isfound = false;

for(let i=0; i <rows.length; i++){

    if(rows[i]['company_name'] === "Alfreds Futterkisteghghg"){
       isfound= true;

       break;
    }

}

console.log(isfound)



})




