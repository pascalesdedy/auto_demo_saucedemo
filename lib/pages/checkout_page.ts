import { Locator, Page } from '@playwright/test'
import { BasePage } from './base_page'

export class CheckoutPage extends BasePage {
    public checkoutInfo: Locator;
    public firstNameInput: Locator;
    public lastNameInput: Locator;
    public zipInput: Locator;
    public cancelButton: Locator;
    public continueButton: Locator;
    public finishButton: Locator;
    public thankyouHeading: Locator;
    public backHomeButton: Locator;

    constructor (page: Page) {
        super(page);
        // Locators for checkout-step-one.html
        this.checkoutInfo = page.getByTestId('title');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.zipInput = page.getByTestId('postalCode');
        this.cancelButton = page.getByTestId('cancel');
        this.continueButton = page.getByTestId('continue');
        // locators for checkout-step-two.html
        this.finishButton = page.getByTestId('finish');
        // locator for checkout-complete.html
        this.thankyouHeading = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');


    } 
}