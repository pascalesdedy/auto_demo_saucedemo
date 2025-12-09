import { test, expect} from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../lib/pages/login_page';
import { InventoryPage } from '../lib/pages/inventory_page';


const standardUser = process.env.USERNAME || '';
const password = process.env.PASSWORD || '';
const url = process.env.BASE_URL || '';
const lockedUser = 'locked_out_user';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await page.goto('/');
    });
    test('User should be able to go to Login page and Components are visible', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
    test('User should be able to Login with valid credentials and then Logout', async ({ page }) => {
        await loginPage.usernameInput.fill(standardUser);
        await loginPage.passwordInput.fill(password);
        await loginPage.loginButton.click();
        await expect(page).toHaveURL(url + '/inventory.html');
        await expect(inventoryPage.shoppingCartLink).toBeVisible();
        //Logout process
        await inventoryPage.openMenuButton.click();
        await inventoryPage.logoutLink.isVisible();
        await inventoryPage.logoutLink.click();
        await expect(page).toHaveURL(url);
    });
    test('User should not be able to login with locked user credential and error message is displayed', async ({ page }) => {
        await loginPage.usernameInput.fill(lockedUser);
        await loginPage.passwordInput.fill(password);
        await loginPage.loginButton.click();
        await expect(page).toHaveURL(url);
        await expect(loginPage.errorMessageLockedUser).toBeVisible();
    });
});