import { Page, Locator } from "@playwright/test";
import { BasePage } from './base_page'

export class CartPage extends BasePage {
    public cartTitle: Locator;
    public firstCartItemName: Locator;
    public secondCartItemName: Locator;
    public checkOutButton: Locator;
    public continueShopping: Locator;
    public removeItemButton: Locator;

    constructor (page: Page) {
        super(page);
        this.cartTitle = page.getByTestId('title');
        this.firstCartItemName = page.getByTestId('inventory-item-name').nth(0);
        this.secondCartItemName = page.getByTestId('inventory-item-name').nth(1);
        this.checkOutButton = page.getByRole('button', { name:'Checkout'});
        this.continueShopping = page.getByRole('button', { name: 'Go back Continue Shopping'});
        this.removeItemButton = page.getByRole('button', { name: 'Remove'});
    };
}