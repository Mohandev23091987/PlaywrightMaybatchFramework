import { test, expect } from '@playwright/test'

test.describe('Petstore Store negative scenarios', () => {
    test('STORE-NEG-01 - reject a request for an order below the valid ID range', async ({ request }) => {
        const response = await request.get('/v2/store/order/0')

        expect(response.status()).toBe(404)
        expect(response.headers()['content-type']).toContain('application/json')

        const body = await response.json() as { code: number; type: string; message: string }
        expect(body.code).toEqual(expect.any(Number))
        expect(body.type).toEqual(expect.any(String))
        expect(body.message).toEqual(expect.any(String))
    })

    test('STORE-NEG-02 - return an error for a nonexistent order', async ({ request }) => {
        const response = await request.get('/v2/store/order/9999')

        expect(response.status()).toBe(404)

        const body = await response.json() as { code: number; type: string; message: string }
        expect(body.code).toEqual(expect.any(Number))
        expect(body.type).toEqual(expect.any(String))
        expect(body.message).toMatch(/order not found|NumberFormatException/i)
    })

    test('STORE-NEG-03 - reject an unsupported request method on the order collection', async ({ request }) => {
        const response = await request.get('/v2/store/order')

        expect(response.status()).toBe(405)
    })

    test('STORE-NEG-04 - return an error when deleting a nonexistent order', async ({ request }) => {
        const response = await request.delete('/v2/store/order/9999')

        expect(response.status()).toBe(404)

        const body = await response.json() as { code: number; type: string; message: string }
        expect(body.code).toEqual(expect.any(Number))
        expect(body.type).toEqual(expect.any(String))
        expect(body.message).toMatch(/order not found/i)
    })
})