import { test, expect } from '@playwright/test'

type Inventory = Record<string, number>

type Order = {
    id: number
    petId: number
    quantity: number
    shipDate: string
    status: 'placed' | 'approved' | 'delivered'
    complete: boolean
}

const orderPayload: Omit<Order, 'id'> & { id: number } = {
    id: 0,
    petId: 1,
    quantity: 1,
    shipDate: '2026-09-07T00:00:00.000Z',
    status: 'placed',
    complete: true
}

test.describe('Petstore Store positive scenarios', () => {
    test('STORE-01 - retrieve inventory by status', async ({ request }) => {
        const response = await request.get('/v2/store/inventory')

        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain('application/json')

        const inventory = await response.json() as Inventory
        expect(Object.keys(inventory).length).toBeGreaterThan(0)

        for (const quantity of Object.values(inventory)) {
            expect(quantity).toEqual(expect.any(Number))
            expect(quantity).toBeGreaterThanOrEqual(0)
        }
    })

    test('STORE-02 - place an order with a valid payload', async ({ request }) => {
        const response = await request.post('/v2/store/order', {
            data: orderPayload
        })

        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain('application/json')

        const order = await response.json() as Order
        expect(order.id).toEqual(expect.any(Number))
        expect(order.petId).toBe(orderPayload.petId)
        expect(order.quantity).toBe(orderPayload.quantity)
        expect(order.status).toBe(orderPayload.status)
        expect(order.complete).toBe(orderPayload.complete)
        expect(order.shipDate).toContain('2026-09-07')
    })
})