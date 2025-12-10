import { test, expect } from '@playwright/test';
import { InventoryPage } from '../lib/pages/inventory_page';
import { CartPage } from '../lib/pages/cart_page';
import { CheckoutPage } from '../lib/pages/checkout_page';

test.describe('Checkout Page Test', ()=> {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.use({ storageState: 'storageState.json' });
    test.beforeEach(async ({page})=>{
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });
    test('User should be able to do checkout multiple items', async ({page}) =>{
        // add items to chart
        await page.goto('/inventory.html');
        await inventoryPage.addtoCartButtonFirstItem.click();
        await inventoryPage.addtoCartButtonSecondItem.click();
        await inventoryPage.shoppingCartLink.click();
        await expect(page).toHaveURL('/cart.html')
        // continue to checkout step one
        await cartPage.checkOutButton.click();
        await expect(page).toHaveURL('/checkout-step-one.html');
        await checkoutPage.firstNameInput.fill('Pascales');
        await checkoutPage.lastNameInput.fill('Kurniawan');
        await checkoutPage.zipInput.fill('55573');
        await checkoutPage.continueButton.click();
        // continue to checkout step two
        await expect(page).toHaveURL('/checkout-step-two.html');
        await checkoutPage.finishButton.click();
        // complete checkout
        await expect(checkoutPage.thankyouHeading).toContainText('Thank you for your order!');
        expect(checkoutPage.backHomeButton).toBeVisible;
    });
    test('User should Not be able to do checkout with no information added in page checkout-step-one', async ({page}) =>{
        // add items to chart
        await page.goto('/inventory.html');
        await inventoryPage.addtoCartButtonFirstItem.click();
        await inventoryPage.addtoCartButtonSecondItem.click();
        await inventoryPage.shoppingCartLink.click();
        await expect(page).toHaveURL('/cart.html')
        // continue to checkout step one - no information added
        await cartPage.checkOutButton.click();
        await expect(page).toHaveURL('/checkout-step-one.html');
        await checkoutPage.continueButton.click();
        expect(checkoutPage.errorFirstNameRequired).toBeVisible;
        // continue to checkout step two

    });
})

