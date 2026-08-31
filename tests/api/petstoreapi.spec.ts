import { test, expect, page } from '@playwright/test'
import { validateSchemaZod } from 'playwright-schema-validator'
import { z } from 'zod';


let petPayload = {
    "id": 75,
    "category": {
        "id": 0,
        "name": 123
    },
    "name": "Tony",
    "tags": [
        {
            "id": 1,
            "name": "TonyDO"
        }
    ],
    "status": "available"
};

let petId = petPayload.id;


let petSchema = z.object({
    id: z.number(),

    category: z.object({
        id: z.number(),
        name: z.number()
    }),

    name: z.string(),

    tags: z.array(
        z.object({
            id: z.number(),
            name: z.string()
        })
    ),

    status: z.string()
});

let token = 'hakjhdkjfhakjdfhkj8y876876'

const responseSchema = z.object({
    name: z.string(),
    job: z.string(),
    id: z.string(),
    createdAt: z.string(),

    _meta: z.object({
        powered_by: z.string(),
        docs_url: z.string().url(),
        upgrade_url: z.string().url(),
        example_url: z.string().url(),
        variant: z.string(),
        message: z.string(),

        cta: z.object({
            label: z.string(),
            url: z.string().url()
        }),

        context: z.string()
    })
});



let expectedDeleteRes = {
    "code": 200,
    "type": "unknown",
    "message": "747"
};


//CRUD
test.describe.serial('Api petstore tests', () => {

    test('POST -create a pet', async ({ request }) => {
        //1. create api request 
        let response = await request.post('/v2/pet', {
            data: petPayload
        })
        console.log(response)
        expect(response.status()).toBe(200)
        expect(response.ok()).toBeTruthy()
        let resposeBody = await response.json();
        console.log(resposeBody)
        console.log("from req petPayload.id -" + petPayload.id)
        console.log("from res resposeBody.id -" + resposeBody.id)
        expect(petPayload.id).toBe(resposeBody.id)
        expect(petPayload.name).toBe(resposeBody.name)
        expect(petPayload.status).toBe(resposeBody.status)


        //schema validation
        await validateSchemaZod({ page }, resposeBody, petSchema)

    })

    test('GET - fetch the pet details', async ({ request }) => {
        let getResponse = await request.get(`/v2/pet/${petId}`)
        console.log(getResponse)
        expect(getResponse.status()).toBe(200)
        expect(getResponse.ok()).toBeTruthy()
        //validate body
        let getResponseJson = await getResponse.json();
        expect(petPayload.name).toBe(getResponseJson.name)
        expect(petPayload.status).toBe(getResponseJson.status)
    })

    test('PUT - Updating the pet details', async ({ request }) => {

        let updatePayload = {
            "id": 75,
            "category": {
                "id": 0,
                "name": 123
            },
            "name": "Tony123",
            "tags": [
                {
                    "id": 1,
                    "name": "TonyDO"
                }
            ],
            "status": "unavailable"
        }
        let updateResponse = await request.put('/v2/pet', {

            data: updatePayload

        })

        console.log(updateResponse)
        expect(updateResponse.status()).toBe(200)
        expect(updateResponse.ok()).toBeTruthy()

        //validate body
        let getResponseJson = await updateResponse.json();
        expect(updatePayload.name).toBe(getResponseJson.name)
        expect(updatePayload.status).toBe(getResponseJson.status)
        console.log('expected name:' + updatePayload.name)
        console.log('name from response:' + getResponseJson.name)
    })



    test('Delete - Deleting the pet details', async ({ request }) => {
        let delResponse = await request.delete(`/v2/pet/${petId}`)
        console.log(delResponse)
        expect(delResponse.status()).toBe(200)
        expect(delResponse.ok()).toBeTruthy()
        //validate body
        let delResponseJson = await delResponse.json();
        expect(expectedDeleteRes.code).toBe(delResponseJson.code)
        expect(expectedDeleteRes.type).toBe(delResponseJson.type)
        expect(expectedDeleteRes.message).toBe(delResponseJson.message)

        let getResponse = await request.get(`/v2/pet/${petId}`)
        console.log(getResponse)
        expect(getResponse.status()).toBe(404)
        expect(getResponse.ok()).toBeFalsy()
        //validate body
    })


    // this test from req-resapi
    test('POST -create a user', async ({ request }) => {
        //1. create api request 
        let response = await request.post('https://reqres.in/api/users', {
            data: {
                "name": "Ravi",
                "job": "leader"
            },

            // headers:{
            //     //Authorization:`Basic ${credentails}`
            //     //Authorization:` Bearer ${token}`
            //     // 'api-key' : 'jhjkhjkhkjhk979879'
            // }
        })
        console.log(response)
        expect(response.status()).toBe(201)

        let resposeBody = await response.json();
        console.log(resposeBody)

        //schema validation
        await validateSchemaZod({ page }, resposeBody, responseSchema)

    })




    //crud


    //scheme validate

    // mock the api

    //

    //res

    //api mocking 
    //api test with bear or jwt





})