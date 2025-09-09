import { Page, Locator, expect } from '@playwright/test';
// Importing locators and utility classes
import arInvoiceLocators from "../../locators/arinvoice/arinvoice.ts";
import HelperClass from "../../util/methods.utility.ts";
import { time } from 'console';

class ArInvoiceFormPage {
    page: Page;
    helperClass: HelperClass;
    businessUnitInput: Locator;
    billToNameInput: Locator;
    paymentTermsInput: Locator;
    descriptionInput: Locator;
    uomInput: Locator;
    quantityInput: Locator;
    sellingPriceInput: Locator;
    saveButton: Locator;
    popAreaTd: Locator;
    completeAndReviewTd: Locator;
    statusLink: Locator;
    transactionNumberSpan: Locator;
    incompleteStatus: Locator;
    completeStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);
        this.businessUnitInput = page.locator(arInvoiceLocators.businessUnitInput);
        this.billToNameInput = page.locator(arInvoiceLocators.billToNameInput);
        this.paymentTermsInput = page.locator(arInvoiceLocators.paymentTermsInput);
        this.descriptionInput = page.locator(arInvoiceLocators.descriptionInput);
        this.uomInput = page.locator(arInvoiceLocators.uomInput);
        this.quantityInput = page.locator(arInvoiceLocators.quantityInput);
        this.sellingPriceInput = page.locator(arInvoiceLocators.sellingPriceInput);
        this.saveButton = page.locator(arInvoiceLocators.saveButton);
        this.popAreaTd = page.locator(arInvoiceLocators.popAreaTd);
        this.completeAndReviewTd = page.locator(arInvoiceLocators.completeAndReviewTd);
        this.statusLink = page.locator(arInvoiceLocators.statusLink);
        this.transactionNumberSpan = page.locator(arInvoiceLocators.transactionNumberSpan);
        this.incompleteStatus = page.locator(arInvoiceLocators.incompleteStatus);
        this.completeStatus = page.locator(arInvoiceLocators.completeStatus);
    }

    /**
     * Fill complete AR Invoice details (Header + Line Items)
     * @param invoiceData - Data from Excel
     */
    async fillArInvoiceDetails(invoiceData: any) {
        // Fill Header Details
        await this.businessUnitInput.click();
        await this.helperClass.compoundElementSelection(this.businessUnitInput, invoiceData['BusinessUnit']);
        await this.billToNameInput.fill(invoiceData['BillToName']);
        await this.paymentTermsInput.fill(invoiceData['PaymentTerms']);
        
        // Fill Line Items
        await this.descriptionInput.fill(invoiceData['Description']);
        await this.uomInput.fill(invoiceData['UOM']);
        await this.quantityInput.fill(String(invoiceData['Quantity']));
        await this.sellingPriceInput.fill(String(invoiceData['SellingPrice']));
    }

    /**
     * Save and complete AR Invoice transaction
     */
    async saveAndCompleteArInvoice() {
        await this.saveButton.click();
        
        // Wait for Status Incomplete to be visible
        await expect(this.incompleteStatus).toBeVisible({ timeout: 10000 });
        
        await this.popAreaTd.click();
        await this.completeAndReviewTd.click();

        // Wait for Status Complete to be visible
        await expect(this.completeStatus).toBeVisible();
    }

    /**
     * Get completed AR Invoice transaction number
     * @returns Transaction number
     */
    async getArInvoiceTransactionNumber(): Promise<string> {
        // Get transaction number
        const transactionNumber = await this.transactionNumberSpan.textContent() || '';
        console.log(`AR Invoice Transaction Number: ${transactionNumber}`);
        
        return transactionNumber.trim();
    }
}

export default ArInvoiceFormPage;
