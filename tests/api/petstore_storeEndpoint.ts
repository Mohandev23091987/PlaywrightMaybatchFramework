import {test,expect} from '@playwright/test';


test.describe('Test group', () => {


    test('store endpoin tests', async ({request}) => {
        const response = await request.get('https://petstore.swagger.io/v2/store/inventory')
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        console.log(responseBody)
    });


    test('order a pet through store', async ({request}) => {
        const orderPayload = {
            "id": 0,
            "petId": 75,
            "quantity": 1,
            "shipDate": "2024-06-19T10:30:00.000Z",
            "status": "placed",
            "complete": true
        }

        const response = await request.post('https://petstore.swagger.io/v2/store/order', {
            data: orderPayload
        })

        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        console.log(responseBody)
        expect(responseBody.petId).toBe(orderPayload.petId)
        expect(responseBody.status).toBe(orderPayload.status)
    });

});
