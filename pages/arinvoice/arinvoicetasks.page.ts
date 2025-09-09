import { Page, Locator } from '@playwright/test';
// Importing locators and utility classes
import arInvoiceLocators from "../../locators/arinvoice/arinvoice.ts";

class ArInvoiceTasksPage {
    page: Page;
    tasksDiv: Locator;
    createTransactionLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tasksDiv = page.locator(arInvoiceLocators.tasksDiv);
        this.createTransactionLink = page.locator(arInvoiceLocators.createTransactionLink);
    }

    /**
     * Navigate to Tasks section
     */
    async navigateToTasks() {
        await this.tasksDiv.click();
    }

    /**
     * Create new AR Invoice transaction
     */
    async createNewArInvoiceTransaction() {
        await this.createTransactionLink.click();
    }
}

export default ArInvoiceTasksPage;
