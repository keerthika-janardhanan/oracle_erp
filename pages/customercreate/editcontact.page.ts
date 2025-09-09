import { Page, Locator } from "@playwright/test";
// Importing locators and utility classes
import editContactLocators from "../../locators/customercreate/editcontact.ts";
import HelperClass from "../../util/methods.utility.ts";

class EditContact {
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
        this.createContact = page.locator(editContactLocators.createContact);
        this.firstname = page.locator(editContactLocators.firstname);
        this.Lastname = page.locator(editContactLocators.Lastname);
        this.okButton = page.locator(editContactLocators.okButton);
        this.responsibilityfirstName = page.locator(editContactLocators.responsibilityfirstName);
        this.responsibilityLastName = page.locator(editContactLocators.responsibilityLastName);
        this.contactPointCreate = page.locator(editContactLocators.contactPointCreate);
        this.phone = page.locator(editContactLocators.phone);
        this.contactPointOkButton = page.locator(editContactLocators.contactPointOkButton);
        this.saveandClose = page.locator(editContactLocators.saveAndClose);
    }

    async fillContactDetails(customerData: any) {
        await this.createContact.click();
        await this.firstname.fill(customerData['First Name']);
        await this.Lastname.fill(customerData['Last Name']);
        await this.okButton.click();
        await this.contactPointCreate.click();
        await this.phone.fill(customerData['Phone'].toString());
        await this.contactPointOkButton.click();
    }

    async saveAndCloseEditContact() {
        await this.saveandClose.scrollIntoViewIfNeeded();
        await this.saveandClose.click();
        await this.page.waitForTimeout(1000);
    }
}

export default EditContact;