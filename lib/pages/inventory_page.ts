import { Page,Locator } from '@playwright/test';
import { BasePage } from './base_page.ts';

export class InventoryPage extends BasePage {
    public shoppingCartLink: Locator;
    public appLogo: Locator;
    public logoutLink: Locator;
    public openMenuButton: Locator;
    public inventoryContainer: Locator;
    public productTitle: Locator;
    public productSortContainer: Locator;
    public inventoryItem: Locator;
    public inventoryItemName: Locator;
    public socialTwitterLink: Locator;
    public socialFacebookLink: Locator;
    public socialLinkedInLink: Locator;
    public firstItemPrice: Locator;
    public secondItemPrice: Locator;
    public addtoCartButtonFirstItem: Locator;
    public addtoCartButtonSecondItem: Locator;

    constructor(page: Page) {
      super(page);
        //header locators
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.appLogo = page.getByText('Swag Labs');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        //inventory locators
        this.inventoryContainer = page.getByTestId('inventory-container');
        this.productTitle = page.getByTestId('title');
        this.productSortContainer = page.getByTestId('product-sort-container');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.inventoryItemName = page.getByTestId('inventory-item-name');
        //Item details locators
        this.firstItemPrice = page.getByTestId('inventory-item-price').nth(0);
        this.secondItemPrice = page.getByTestId('inventory-item-price').nth(1);
        this.addtoCartButtonFirstItem = page.getByRole('button', { name: 'Add to cart' }).nth(0);
        this.addtoCartButtonSecondItem = page.getByRole('button', { name: 'Add to cart' }).nth(1);
        //footer locators
        this.socialTwitterLink = page.getByTestId('social-twitter');
        this.socialFacebookLink = page.getByTestId('social-facebook');
        this.socialLinkedInLink = page.getByTestId('social-linkedin');
    }
};