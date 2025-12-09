import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page.ts';

export class LoginPage extends BasePage {
    public usernameInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public errorMessageLockedUser: Locator;
    
    constructor(page: Page) {
      super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        //error message locator
        this.errorMessageLockedUser = page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out' });
    };
};