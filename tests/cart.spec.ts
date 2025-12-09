import { test, expect } from '@playwright/test'
import { CartPage } from '../lib/pages/cart_page';
import { InventoryPage } from '../lib/pages/inventory_page';

test.describe('Cart Page Testing', () =>{
    let cartPage : CartPage;
    let inventoryPage: InventoryPage;

    test.use({ storageState: 'storageState.json' });
    test.beforeEach (async ({page}) => {
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);
    });

    test('User should be able to view all cart page component', async ({page}) =>{
        await page.goto('/cart.html')
        await expect(cartPage.cartTitle).toBeVisible();
        await expect(cartPage.checkOutButton).toBeVisible();
        await expect(cartPage.continueShopping).toBeVisible();
    });
    test('User should be able to add Multiple Items to cart and view the cart page', async ({page})=> {
        await page.goto('/inventory.html');
        await inventoryPage.addtoCartButtonFirstItem.click();
        await inventoryPage.addtoCartButtonSecondItem.click();
        await inventoryPage.shoppingCartLink.click();
        await expect(page).toHaveURL('/cart.html')
        expect(cartPage.firstCartItemName).toBeVisible;
        expect(cartPage.secondCartItemName).toBeVisible;
    })
    test('User should be able to remove item from cart', async ({page})=> {
        await page.goto('/inventory.html');
        await inventoryPage.addtoCartButtonFirstItem.click();
        await inventoryPage.addtoCartButtonSecondItem.click();
        await inventoryPage.shoppingCartLink.click();
        await expect(page).toHaveURL('/cart.html');
        await cartPage.removeItemButton.nth(0).click();
        const cartItemCount = await cartPage.removeItemButton.count();
        expect(cartItemCount).toEqual(1);
    });
});