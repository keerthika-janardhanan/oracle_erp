import { Page, Locator } from '@playwright/test';
// Importing locators and utility classes
import receiptLocators from "../../locators/receipt/receipt.ts";

class ReceiptTasksPage {
    page: Page;
    tasksDiv: Locator;
    createReceiptLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tasksDiv = page.locator(receiptLocators.tasksDiv);
        this.createReceiptLink = page.locator(receiptLocators.createReceiptLink);
    }

    /**
     * Navigate to Tasks and Create New Receipt
     */
    async navigateToTasks() {
        await this.tasksDiv.click();
    }

    /**
     * Create New Receipt Transaction
     */
    async createNewReceiptTransaction() {
        await this.createReceiptLink.click();
    }
}

export default ReceiptTasksPage;
