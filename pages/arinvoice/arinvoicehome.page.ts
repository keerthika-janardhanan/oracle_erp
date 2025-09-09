import { Page, Locator } from '@playwright/test';
// Importing locators and utility classes
import arInvoiceLocators from "../../locators/arinvoice/arinvoice.ts";

class ArInvoiceHomePage {
    page: Page;
    homeIcon: Locator;
    receivablesLink: Locator;
    billingLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeIcon = page.locator(arInvoiceLocators.homeIcon);
        this.receivablesLink = page.locator(arInvoiceLocators.receivablesLink);
        this.billingLink = page.locator(arInvoiceLocators.billingLink);
    }

    /**
     * Navigate to AR Invoice Billing section
     */
    async navigateToArInvoiceBilling() {
        await this.homeIcon.click();
        await this.receivablesLink.click();
        await this.billingLink.click();
    }
}

export default ArInvoiceHomePage;
