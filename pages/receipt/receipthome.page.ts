import { Page, Locator } from '@playwright/test';
// Importing locators and utility classes
import receiptLocators from "../../locators/receipt/receipt.ts";

class ReceiptHomePage {
    page: Page;
    homeIcon: Locator;
    receivablesLink: Locator;
    accountsReceivableLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeIcon = page.locator(receiptLocators.homeIcon);
        this.receivablesLink = page.locator(receiptLocators.receivablesLink);
        this.accountsReceivableLink = page.locator(receiptLocators.accountsReceivableLink);
    }

    /**
     * Navigate to Accounts Receivable section
     */
    async navigateToAccountsReceivable() {
        await this.homeIcon.click();
        await this.receivablesLink.click();
        await this.accountsReceivableLink.click();
    }
}

export default ReceiptHomePage;
