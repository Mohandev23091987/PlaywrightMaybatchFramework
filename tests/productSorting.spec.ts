import { test, expect } from '../fixtures/products.fixture'
import { CartPage } from '../pages/cartPage'
import { ExcelReader } from '../utils/excelReader'

type SortingTestData = {
    TestCaseID: string
    ProductName: string
    AdditionalProduct: string
    SortOption: string
    'Expected Test Data / Message': string
}

const sortOptions: Record<string, string> = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo'
}

function getSortingCase(testCaseId: string): SortingTestData {
    const sortingCase = ExcelReader.getRowByTestCaseId<SortingTestData>('Product Sorting', testCaseId)

    if (!sortingCase) {
        throw new Error(`Test data not found for ${testCaseId}`)
    }

    return sortingCase
}

async function verifyNameSorting(productsPage: any, sortSelection: string) {
    const productNames = await productsPage.getAllProductNames()
    const expectedNames = [...productNames].sort((first, second) => first.localeCompare(second))

    if (sortSelection === 'Name (Z to A)') {
        expectedNames.reverse()
    }

    expect(productNames).toEqual(expectedNames)
}

async function verifyPriceSorting(productsPage: any, sortSelection: string) {
    const productPrices = await productsPage.getAllProductPrices()
    const expectedPrices = [...productPrices].sort((first, second) => first - second)

    if (sortSelection === 'Price (high to low)') {
        expectedPrices.reverse()
    }

    expect(productPrices).toEqual(expectedPrices)
}

test.describe('SauceDemo Product Sorting Scenarios', () => {
    test('SORT-01 - verify the default product order', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-01')
        const sortSelection = sortingCase.SortOption.replace(' [default]', '')

        await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])
        await verifyNameSorting(productsPage, sortSelection)
    })

    test('SORT-02 - sort products by name ascending', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-02')
        const sortSelection = sortingCase.SortOption

        await productsPage.sortBy(sortOptions[sortSelection])
        await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])
        await verifyNameSorting(productsPage, sortSelection)
    })

    test('SORT-03 - sort products by name descending', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-03')
        const sortSelection = sortingCase.SortOption

        await productsPage.sortBy(sortOptions[sortSelection])
        await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])
        await verifyNameSorting(productsPage, sortSelection)
    })

    test('SORT-04 - sort products by price low to high', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-04')
        const sortSelection = sortingCase.SortOption

        await productsPage.sortBy(sortOptions[sortSelection])
        await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])
        await verifyPriceSorting(productsPage, sortSelection)
    })

    test('SORT-05 - sort products by price high to low', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-05')
        const sortSelection = sortingCase.SortOption

        await productsPage.sortBy(sortOptions[sortSelection])
        await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])
        await verifyPriceSorting(productsPage, sortSelection)
    })

    test('SORT-06 - preserve cart items and badge while sorting', async ({ page, productsPage }) => {
        const sortingCase = getSortingCase('SORT-06')
        const selectedProducts = [sortingCase.ProductName, sortingCase.AdditionalProduct]
        const cartPage = new CartPage(page)

        for (const product of selectedProducts) {
            await productsPage.addItemToCart(product)
        }

        await productsPage.sortBy('za')
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')
        await productsPage.openCart()
        await cartPage.verifyItems(selectedProducts)
    })

    test('SORT-07 - apply every sorting option in sequence', async ({ productsPage }) => {
        const sortingCase = getSortingCase('SORT-07')
        const sortSelections = sortingCase.SortOption.split(';').map(option => option.trim())

        for (const sortSelection of sortSelections) {
            await productsPage.sortBy(sortOptions[sortSelection])
            await expect(productsPage.sortDropDown).toHaveValue(sortOptions[sortSelection])

            if (sortSelection.startsWith('Name')) {
                await verifyNameSorting(productsPage, sortSelection)
            } else {
                await verifyPriceSorting(productsPage, sortSelection)
            }
        }
    })

    test('SORT-08 - reset sorting to the default after page reload', async ({ page, productsPage }) => {
        getSortingCase('SORT-08')

        await productsPage.sortBy('za')
        await expect(productsPage.sortDropDown).toHaveValue('za')
        await page.reload()
        await expect(productsPage.sortDropDown).toHaveValue('az')
    })
})
