import { test, expect } from '@playwright/test'

type Order = {
    id: number
    petId: number
    quantity: number
    shipDate: string
    status: string
    complete: boolean
}

test.describe('Petstore Store edge scenarios', () => {
    test('STORE-EDGE-01 - place an order with the minimum quantity', async ({ request }) => {
        const response = await request.post('/v2/store/order', {
            data: {
                id: 0,
                petId: 1,
                quantity: 1,
                shipDate: '2026-09-07T00:00:00.000Z',
                status: 'placed',
                complete: false
            }
        })

        expect(response.status()).toBe(200)
        const order = await response.json() as Order
        expect(order.quantity).toBe(1)
        expect(order.complete).toBe(false)
    })

    test('STORE-EDGE-02 - support each documented order status', async ({ request }) => {
        for (const status of ['placed', 'approved', 'delivered']) {
            const response = await request.post('/v2/store/order', {
                data: {
                    id: 0,
                    petId: 1,
                    quantity: 1,
                    shipDate: '2026-09-07T00:00:00.000Z',
                    status,
                    complete: true
                }
            })

            expect(response.status()).toBe(200)
            const order = await response.json() as Order
            expect(order.status).toBe(status)
        }
    })

    test('STORE-EDGE-03 - preserve inventory response value types for unusual status keys', async ({ request }) => {
        const response = await request.get('/v2/store/inventory')

        expect(response.status()).toBe(200)
        const inventory = await response.json() as Record<string, unknown>

        for (const [status, quantity] of Object.entries(inventory)) {
            expect(status).toEqual(expect.any(String))
            expect(quantity).toEqual(expect.any(Number))
        }
    })
})