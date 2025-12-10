# auto_demo_saucedemo
Automation Test using Playwright on saucedemo.com

### Test Cases:

**1. Login page**
 - User should be able to go to Login page and Components are visible.
 - User should be able to Login with valid credentials and then Logout.
 - User should not be able to login with locked user credential and error message is displayed.

**2. Inventory**
- User should be able to view all mandatory components.
- User should be able to view inventory items (6 items).
- User should be able to sort products by Price (low to high).
- User should be able to sort products by Price (high to low).
- User should be able to sort products A to Z
- User should be able to sort products Z to A
- User should be able to add first item to the shoppping cart.
- User should be able to add multiple item to the shopping cart.
- User should be able to view all inventory detail.

**3. Cart**
- User should be able to view all cart page component.
- User should be able to add Multiple Items to cart and view the items in the cart.
- User should be able to remove item from cart.

**4. CheckOut**
- User should be able to do checkout multiple items.
- User should Not be able to do checkout with no information added in page checkout-step-one.
