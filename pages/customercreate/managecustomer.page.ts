import { Page, Locator } from "@playwright/test";
// Importing locators and utility classes
import customerManageLocators from "../../locators/customercreate/managecustomer.ts";
import HelperClass from "../../util/methods.utility.ts";

class CustomerManage {
    page: Page;
    helperClass: HelperClass;

    accountNumber: Locator;
    receiptmethodAddRow: Locator;
    receiptMethod: Locator;
    bankAccount: Locator;
    createBankAccount: Locator;
    bankCountry: Locator;
    bankAccountNumber: Locator;
    bankName: Locator;
    bankBranch: Locator;
    bankSaveandClose: Locator;
    communication: Locator;
    EditContact: Locator;
    createContact: Locator;
    firstname: Locator;
    Lastname: Locator;
    okButton: Locator;
    responsibilityfirstName: Locator;
    responsibilityLastName: Locator;
    contactPointCreate: Locator;
    phone: Locator;
    contactPointOkButton: Locator;
    doneButton: Locator;
    saveandClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);
        this.accountNumber = page.locator(customerManageLocators.accountNumber);
        this.receiptmethodAddRow = page.locator(customerManageLocators.receiptmethodAddRow);
        this.receiptMethod = page.locator(customerManageLocators.receiptMethod);
        this.bankAccount = page.locator(customerManageLocators.bankAccount);
        this.createBankAccount = page.locator(customerManageLocators.createBankAccount);
        this.bankCountry = page.locator(customerManageLocators.bankCountry);
        this.bankAccountNumber = page.locator(customerManageLocators.bankAccountNumber);
        this.bankName = page.locator(customerManageLocators.bankName);
        this.bankBranch = page.locator(customerManageLocators.bankBranch);
        this.bankSaveandClose = page.locator(customerManageLocators.bankSaveandClose);
        this.communication = page.locator(customerManageLocators.communication);
        this.EditContact = page.locator(customerManageLocators.EditContact);

        this.doneButton = page.locator(customerManageLocators.done);
        this.saveandClose = page.locator(customerManageLocators.saveAndClose);
    }

    async editAccount() {
        await this.accountNumber.scrollIntoViewIfNeeded();
        await this.accountNumber.click();
    }

    async fillCustomerPaymentDetails(customerData: any) {
        await this.receiptmethodAddRow.click();
        await this.receiptMethod.fill(customerData['Receipt Method']);
        await this.bankAccount.click();
        await this.createBankAccount.click();
        await this.bankCountry.fill(customerData['Bank Country']);
        await this.bankAccountNumber.click();
        await this.page.waitForTimeout(2000);
        const randomBankAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        await this.bankAccountNumber.fill(randomBankAccountNumber);
        await this.bankName.fill(customerData['Bank Name']);
        await this.bankBranch.fill(customerData['Bank Branch']);
        await this.bankSaveandClose.click();
    }

    async fillCommunicationDetails(customerData: any) {
        await this.communication.click();
        await this.EditContact.click();
    }

    async saveAndClose() {
        await this.communication.waitFor({ state: 'visible' });
        await this.saveandClose.click();
        await this.doneButton.click();
    }
}

export default CustomerManage;

