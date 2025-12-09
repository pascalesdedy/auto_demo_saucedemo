import { test, expect} from '@playwright/test';
import { InventoryPage } from '../lib/pages/inventory_page';

test.describe('Inventory Page Tests', () => {
    let inventoryPage: InventoryPage;

    test.use({ storageState: 'storageState.json' });
    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await page.goto('/inventory.html');
    });
    test('User should be able to view all mandatory components', async ({ page }) => {
        //header components
        await expect(inventoryPage.appLogo).toBeVisible();
        await expect(inventoryPage.shoppingCartLink).toBeVisible();
        await expect(inventoryPage.openMenuButton).toBeVisible();
        //inventory components
        await expect(inventoryPage.inventoryContainer).toBeVisible();
        await expect(inventoryPage.productTitle).toBeVisible();
        await expect(inventoryPage.productSortContainer).toBeVisible();
        //footer components
        await expect(inventoryPage.socialTwitterLink).toBeVisible();
        await expect(inventoryPage.socialFacebookLink).toBeVisible();
        await expect(inventoryPage.socialLinkedInLink).toBeVisible();
    });
    test('User should be able to view 6 inventory items', async ({page}) => {
        const inventoryItemsCount = await inventoryPage.inventoryItem.count();
        expect(inventoryItemsCount).toEqual(6);
    });
    test('User should be able to sort products by Price (low to high)', async ({page}) => {
        await inventoryPage.productSortContainer.click();
        await inventoryPage.productSortContainer.selectOption('lohi');
        const firstProductPrice = await inventoryPage.firstItemPrice.innerText();
        const secondProductPrice = await inventoryPage.secondItemPrice.innerText();
        expect(parseFloat(firstProductPrice.replace('$',''))).toBeLessThanOrEqual(parseFloat(secondProductPrice.replace('$','')));
    });
        test('User should be able to sort products by Price (high to low)', async ({page}) => {
        await inventoryPage.productSortContainer.click();
        await inventoryPage.productSortContainer.selectOption('hilo');
        const firstProductPrice = await inventoryPage.firstItemPrice.innerText();
        const secondProductPrice = await inventoryPage.secondItemPrice.innerText();
        expect(parseFloat(secondProductPrice.replace('$',''))).toBeLessThanOrEqual(parseFloat(firstProductPrice.replace('$','')));
    });
    test('User should be able to add first item to the shoppping cart', async ({page}) => {
        await inventoryPage.addtoCartButtonFirstItem.click();
        await expect(inventoryPage.shoppingCartLink).toHaveText('1');
    });
    test('User should be able to add multiple item to the shopping cart', async ({page}) => {
        await inventoryPage.addtoCartButtonFirstItem.click();
        await inventoryPage.addtoCartButtonSecondItem.click();
        await expect(inventoryPage.shoppingCartLink).toHaveText('2');
    });
    test('User should be able to view all inventory detail', async ({ page }) => {
        const itemsName = inventoryPage.inventoryItemName;
        const count = await itemsName.count();
        // klik semua item dan cek detail page
        for (let i = 0; i < count; i++) {
            const item = itemsName.nth(i);
            const name = await item.textContent();
            await item.click();
            const nameDetail = await page.getByTestId('inventory-item-name').textContent();
            await page.screenshot({ path: `screenshots/detail-${i + 1}.png` }); // screenshot to makesure it opens detail item page
            expect(name?.trim()).toEqual(nameDetail?.trim());
            await page.goBack();
        }
    });
});