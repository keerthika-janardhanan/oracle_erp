import { Page, Locator, expect } from "@playwright/test";
import HelperClass from "../../util/methods.utility";
const path = require('path')
import invoicelocatorX from "../../locators/createinvoice/createinvoice.ts";
import supplierLocatorX from "../../locators/createinvoice/suppliersearch.ts";
import createInvoiceMoreFieldsLocatorX from "../../locators/createinvoice/createInvoiceMoreField.ts";
import accountingLocatorX from "../../locators/createinvoice/accounting.ts";
import linesLocatorX from "../../locators/createinvoice/lines.ts";
import { TIMEOUT } from "dns";

class CreateInvoicePage {
    page: Page;
    searchBusinessUnitInput: Locator;
    searchSupplierInput: Locator;
    searchSupplierResult: Locator;
    supplierInput: Locator;
    searchButton: Locator;
    supplierTable: Locator;
    okButton: Locator;
    supplierNumberValue: Locator;
    numberInput: Locator;
    amountInput: Locator;

    showMore: Locator;
    accounting: Locator;
    accountingDateText: Locator;
    accountingDate: Locator;

    expandLines: Locator;
    addRow: Locator;
    amount: Locator;
    lineAmounts: Locator;
    description: Locator;
    distributionContribution: Locator;
    invoiceActions: Locator;
    validate: Locator;
    validated: Locator;

    save: Locator;
    saveAndCloseButton: Locator;
    validation: Locator;
    helperClass: HelperClass;

    constructor(page: Page) {
        this.page = page;
        this.searchBusinessUnitInput = page.locator(invoicelocatorX.searchBusinessUnit);
        this.supplierInput = page.locator(supplierLocatorX.supplierSupplierSupplier).locator("input").first();
        this.searchButton = page.locator(supplierLocatorX.search);
        this.supplierTable = page.locator(supplierLocatorX.supplierSupplierNumberTaxpaye).first();
        this.okButton = page.locator(supplierLocatorX.okTag, { hasText: supplierLocatorX.okText }).nth(0);
        this.supplierNumberValue = page.locator(invoicelocatorX.supplierNumber);
        this.numberInput = page.locator(invoicelocatorX.number);
        this.amountInput = page.locator(invoicelocatorX.amount);
        this.description = page.locator(invoicelocatorX.description);
        this.save = page.locator(invoicelocatorX.save);
        this.saveAndCloseButton = page.locator(supplierLocatorX.saveAndClose);

        this.searchSupplierInput = page.locator(supplierLocatorX.searchSupplier);
        this.searchSupplierResult = page.locator(supplierLocatorX.searchSupplierResult);
        this.showMore = page.locator(supplierLocatorX.showMore);
        this.accounting = page.locator(createInvoiceMoreFieldsLocatorX.accounting);
        this.accountingDate = page.locator(accountingLocatorX.accountingDate);

        // lines
        this.expandLines = page.locator(createInvoiceMoreFieldsLocatorX.expandLines);
        this.addRow = page.locator(linesLocatorX.addRow);
        this.amount = page.locator(linesLocatorX.amount);
        this.lineAmounts = page.locator(linesLocatorX.lineAmounts);
        this.distributionContribution = page.locator(linesLocatorX.distributionContribution);
        this.invoiceActions = page.locator(createInvoiceMoreFieldsLocatorX.invoiceActions);
        this.validate = page.locator(createInvoiceMoreFieldsLocatorX.validate);

        this.validated= page.locator(createInvoiceMoreFieldsLocatorX.validated);

        this.helperClass = new HelperClass(page);
    }

    async fillInvoiceDetails(invoiceDetails: any) {
        await this.searchBusinessUnitInput.waitFor({ state: 'visible' });
        console.log("business unit ------------------- " + invoiceDetails.BusinessUnit);
        await this.helperClass.compoundElementSelection(this.searchBusinessUnitInput, invoiceDetails.BusinessUnit);
        await this.searchSupplierInput.click();
        await this.helperClass.typeAndSelect(this.searchSupplierInput, invoiceDetails.SupplierName);
        await expect(this.supplierNumberValue).toContainText(/\d+/);
        await this.page.waitForLoadState('networkidle');

        await this.numberInput.click();
        await this.numberInput.fill(invoiceDetails.InvoiceNumber);

        await this.amountInput.click();
        await this.helperClass.slowTyping(String(invoiceDetails.InvoiceAmount),this.amountInput);
        await this.page.waitForLoadState('networkidle');
        await this.helperClass.slowTyping(invoiceDetails.Description,this.description);
        await this.page.waitForLoadState('domcontentloaded');
        await this.showMore.click({ position: { x: 10, y: 5 } });
        await this.accounting.waitFor({ state: 'visible' });
        await this.accounting.click();
        await this.accountingDate.waitFor({ state: 'visible' });
        await this.accountingDate.fill(invoiceDetails.AccountingDate);
    }

    async addLines(lines: any) {

        await this.expandLines.waitFor({ state: 'visible' });
        await this.expandLines.click();
        await this.addRow.waitFor({ state: 'visible' });


        for (const line of lines) {
            // Dynamically generate the XPath for the current line Amount input
            const baseXPathAmount = linesLocatorX.lineAmounts.replace('tr[1]', `tr[${line.LineNumber}]`);
            const inputXPathAmount = `${baseXPathAmount}//input`;

            const baseXPathDistCont = linesLocatorX.lineDistributionCont.replace('/tbody/tr[1]/td[5]', `/tbody/tr[${line.LineNumber}]/td[5]`);

            // Locate the cell and input elements
            const cellLocatorAmount = this.page.locator(baseXPathAmount);
            const inputLocatorAmount = this.page.locator(inputXPathAmount);

            const cellDistCont = this.page.locator(baseXPathDistCont);

            // Ensure the cell is visible and click it
            await cellLocatorAmount.waitFor({ state: 'visible' });
            await cellLocatorAmount.scrollIntoViewIfNeeded();
            await cellLocatorAmount.click();
            // Ensure the input field is visible and fill it with the Amount
            await inputLocatorAmount.waitFor({ state: 'visible' });
            await this.page.waitForTimeout(1000);
            await inputLocatorAmount.waitFor({ state: 'visible' });
            await inputLocatorAmount.click();
            await inputLocatorAmount.waitFor({ state: 'visible' });
            await inputLocatorAmount.fill(line.Amount.toString());

            await cellDistCont.waitFor({ state: 'visible' });
            await cellDistCont.click();
            await this.distributionContribution.click();
            await this.distributionContribution.waitFor({ state: 'visible' });
            await this.page.waitForTimeout(1000);
            await this.distributionContribution.click();
            await this.distributionContribution.waitFor({ state: 'visible' });
            await this.page.waitForTimeout(1000);
            await this.distributionContribution.fill(line.DistributionCombination);
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(1000);
        }
    }

    async validateAndSaveInvoice() {
        // Perform invoice actions
        // Retry logic to ensure "validate" is clicked if it appears
        await this.invoiceActions.scrollIntoViewIfNeeded();
        for (let attempt = 0; attempt < 10; attempt++) {
            await this.invoiceActions.click();
            // await this.page.waitForTimeout(500);
            if (await this.validate.isVisible()) {
                await this.validate.click();
                break;
            }
            await this.page.waitForTimeout(2000); // Wait before retrying
        }

        // Wait for the validation to complete
        await this.validated.waitFor({ state: 'visible' }); 
        await expect(this.validated).toHaveText("Validated");


        // Save and close the invoice
        await this.saveAndCloseButton.waitFor({ state: 'visible' });
        await this.saveAndCloseButton.click();
        
    }

}
export default CreateInvoicePage;