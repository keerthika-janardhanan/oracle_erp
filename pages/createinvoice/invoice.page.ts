import { Page, Locator, expect } from "@playwright/test";
import invoiceLocatorX from "../../locators/createinvoice/invoices.ts";

class InvoicePage {
    page: Page;
    createInvoiceLocator: Locator;
    invoiceTableLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createInvoiceLocator = page.locator(invoiceLocatorX.createInvoice);
        this.invoiceTableLocator = page.locator(invoiceLocatorX.invoiceTable);
    }

    async createInvoice() {
        await this.page.screenshot({ path: 'code/Screenshot/' + 'payables.png' });
        await this.page.waitForLoadState('networkidle');
        await this.createInvoiceLocator.click();
    }

    async validateInvoiceNumber(invoiceNumber:string) {
        await this.page.screenshot({ path: 'code/Screenshot/' + 'payables.png' });
        await this.page.waitForLoadState('networkidle');
        await expect((this.invoiceTableLocator).filter({ hasText:invoiceNumber })).toContainText(invoiceNumber);
    }
}

export default InvoicePage;
