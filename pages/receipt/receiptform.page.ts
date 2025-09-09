import { Page, Locator } from '@playwright/test';
// Importing locators and utility classes
import receiptLocators from "../../locators/receipt/receipt.ts";
import HelperClass from "../../util/methods.utility.ts";

class ReceiptFormPage {
    page: Page;
    helperClass: HelperClass;
    businessUnitInput: Locator;
    receiptMethodInput: Locator;
    receiptNumberInput: Locator;
    enteredAmountInput: Locator;
    remittanceBankNameInput: Locator;
    remittanceBankBranchInput: Locator;
    remittanceBankAccountInput: Locator;
    customerNameInput: Locator;
    customerSearchButton: Locator;
    searchButton: Locator;
    firstSearchResult: Locator;
    okButton: Locator;
    addRowButton: Locator;
    invoiceReferenceInput: Locator;
    submitAndCreateAnotherButton: Locator;
    submitAndAutoApplyButton: Locator;
    saveAndCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);
        this.businessUnitInput = page.locator(receiptLocators.businessUnitInput);
        this.receiptMethodInput = page.locator(receiptLocators.receiptMethodInput);
        this.receiptNumberInput = page.locator(receiptLocators.receiptNumberInput);
        this.enteredAmountInput = page.locator(receiptLocators.enteredAmountInput);
        this.remittanceBankNameInput = page.locator(receiptLocators.remittanceBankNameInput);
        this.remittanceBankBranchInput = page.locator(receiptLocators.remittanceBankBranchInput);
        this.remittanceBankAccountInput = page.locator(receiptLocators.remittanceBankAccountInput);
        this.customerNameInput = page.locator(receiptLocators.customerNameInput);
        this.customerSearchButton = page.locator(receiptLocators.customerSearchButton);
        this.searchButton = page.locator(receiptLocators.searchButton);
        this.firstSearchResult = page.locator(receiptLocators.firstSearchResult);
        this.okButton = page.locator(receiptLocators.okButton);
        this.addRowButton = page.locator(receiptLocators.addRowButton);
        this.invoiceReferenceInput = page.locator(receiptLocators.invoiceReferenceInput);
        this.submitAndCreateAnotherButton = page.locator(receiptLocators.submitAndCreateAnotherButton);
        this.submitAndAutoApplyButton = page.locator(receiptLocators.submitAndAutoApplyButton);
        this.saveAndCloseButton = page.locator(receiptLocators.saveAndCloseButton);
    }

    /**
     * Fill Receipt Header Details
     * @param receiptData - Data from Excel/CSV
     */
    async fillReceiptHeaderDetails(receiptData: any) {
        // Fill Business Unit using compoundElementSelection
        await this.businessUnitInput.click();
        await this.helperClass.compoundElementSelection(this.businessUnitInput, receiptData['BusinessUnit']);

        // Fill Receipt Method
        await this.receiptMethodInput.click();
        await this.receiptMethodInput.fill(receiptData['ReceiptMethod']);
        
        // Fill Receipt Number
        await this.receiptNumberInput.click();
        await this.receiptNumberInput.fill(receiptData['ReceiptNumber'].toString());

        // Fill Entered Amount
        await this.enteredAmountInput.click();
        await this.enteredAmountInput.fill(receiptData['EnteredAmount'].toString());

        // Fill Remittance Bank Details
        await this.fillRemittanceBankDetails(receiptData);

        // Fill Customer Name and Search
        await this.fillCustomerNameAndSearch(receiptData);
    }

    /**
     * Fill Remittance Bank Details
     * @param receiptData - Data from Excel/CSV
     */
    async fillRemittanceBankDetails(receiptData: any) {
        // Fill Bank Name using compoundElementSelection
        await this.remittanceBankNameInput.click();
        await this.remittanceBankNameInput.fill(receiptData['RemittanceBankName']);
        await this.helperClass.compoundElementSelection(this.remittanceBankNameInput, receiptData['RemittanceBankName']);

        // Fill Account using compoundElementSelection
        await this.remittanceBankAccountInput.click();
        await this.remittanceBankAccountInput.fill(receiptData['RemittanceBankAccount']);
        await this.helperClass.compoundElementSelection(this.remittanceBankAccountInput, receiptData['RemittanceBankAccount']);
    
         // Fill Branch using compoundElementSelection
        // await this.remittanceBankBranchInput.click();
        // await this.helperClass.compoundElementSelection(this.remittanceBankBranchInput, receiptData['RemittanceBankBranch']);
    }

    /**
     * Fill Customer Name and perform search
     * @param receiptData - Data from Excel/CSV
     */
    async fillCustomerNameAndSearch(receiptData: any) {
        // Fill Customer Name
        await this.customerNameInput.click();
        await this.customerNameInput.fill(receiptData['CustomerName']);

        // Click Search button for customer
        await this.customerSearchButton.click();

        // Click Search button
        await this.searchButton.click();

        // Click first search result
        await this.firstSearchResult.click();

        // Click OK button
        await this.okButton.click();
    }

    /**
     * Add Remittance Reference Detail
     * @param receiptData - Data from Excel/CSV
     */
    async addRemittanceReferenceDetail(receiptData: any) {
        // Click Add Row button
        await this.addRowButton.click();

        // Fill Invoice Reference
        await this.invoiceReferenceInput.click();
        await this.invoiceReferenceInput.fill(receiptData['InvoiceNumber']);
    }

    /**
     * Submit and Process Receipt
     */
    async submitAndProcessReceipt() {
        // Click Submit and Create Another
        await this.submitAndCreateAnotherButton.click();

        // Click Submit and AutoApply Now
        await this.submitAndAutoApplyButton.click();

        // Click Save and Close
        await this.saveAndCloseButton.click();
    }

    /**
     * Fill complete Receipt details and submit
     * @param receiptData - Data from Excel/CSV
     */
    async fillCompleteReceiptDetails(receiptData: any) {
        // Fill Header Details
        await this.fillReceiptHeaderDetails(receiptData);
        
        // Add Remittance Reference Detail
        await this.addRemittanceReferenceDetail(receiptData);
        
        // Submit and Process Receipt
        await this.submitAndProcessReceipt();
    }
}

export default ReceiptFormPage;
