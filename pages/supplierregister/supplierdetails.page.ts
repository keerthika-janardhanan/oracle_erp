import { Page, Locator, expect } from "@playwright/test";
// Importing locators and utility classes
import supplierInformation from "../../locators/supplierregister/supplierInformation.ts";
import HelperClass from "../../util/methods.utility.ts";

class SupplierDetailsSection {
    page: Page;
    helperClass: HelperClass;
    companyField: Locator;
    reqReasonDropdown: Locator;
    requestReasonDropdown: Locator;
    taxOrganizationTypeDropdown: Locator;
    supplierTypeDropdown: Locator;
    dunsNumberField: Locator;
    taxCountryField: Locator;
    contactCreateIcon: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    emailField: Locator;
    createUserAccountCheckbox: Locator;
    contactokButton: Locator;
    addressCreateIcon: Locator;
    addressNameField: Locator;
    addressCountryField: Locator;
    orderingCheckbox: Locator;
    remitToCheckbox: Locator;
    cityField: Locator;
    okButton: Locator;
    businessClassifications: Locator;
    selctandAdd: Locator;
    checkboxExpenseItem: Locator;
    checkboxNewHireSupplies: Locator;
    productOkButton: Locator;
    registerbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);

        // Initializing locators in the sequence they are used
        this.companyField = page.locator(supplierInformation.companyField);
        this.reqReasonDropdown = page.locator(supplierInformation.requestReasonDropdown);
        this.requestReasonDropdown = page.locator(supplierInformation.requestReasonDropdown);
        this.taxOrganizationTypeDropdown = page.locator(supplierInformation.taxOrganizationTypeDropdown);
        this.supplierTypeDropdown = page.locator(supplierInformation.supplierTypeDropdown);
        this.dunsNumberField = page.locator(supplierInformation.dunsNumberField);
        this.taxCountryField = page.locator(supplierInformation.taxCountryField);

        // Contact
        this.contactCreateIcon = page.locator(supplierInformation.contactCreateIcon);
        this.firstNameField = page.locator(supplierInformation.firstNameField);
        this.lastNameField = page.locator(supplierInformation.lastNameField);
        this.emailField = page.locator(supplierInformation.emailField);
        this.createUserAccountCheckbox = page.locator(supplierInformation.createUserAccountCheckbox);
        this.contactokButton = page.locator(supplierInformation.contactokButton);

        // Address
        this.addressCreateIcon = page.locator(supplierInformation.addressCreateIcon);
        this.addressNameField = page.locator(supplierInformation.addressNameField);
        this.addressCountryField = page.locator(supplierInformation.countryField);
        this.orderingCheckbox = page.locator(supplierInformation.orderingCheckbox);
        this.remitToCheckbox = page.locator(supplierInformation.remitToCheckbox);
        this.cityField = page.locator(supplierInformation.cityField);
        this.okButton = page.locator(supplierInformation.okButton);

        // Products and Services
        this.businessClassifications = page.locator(supplierInformation.businessClassifications);
        this.selctandAdd = page.locator(supplierInformation.selctandAdd);
        this.checkboxExpenseItem = page.locator(supplierInformation.checkboxExpenseItem);
        this.checkboxNewHireSupplies = page.locator(supplierInformation.checkboxNewHireSupplies);
        this.productOkButton = page.locator(supplierInformation.productOkButton);

        // Register button
        this.registerbutton = page.locator(supplierInformation.registerbutton);
    }

    async fillCompanyDetails(supplierData: any) {
        // Fill the "Company" field with test data
        await this.companyField.click();
        const randomAlphabet = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
        await this.companyField.fill(`${supplierData['Supplier Name']}_${randomAlphabet}`);
        await this.companyField.click();
        await this.page.selectOption(supplierInformation.requestReasonDropdown, { label: supplierData['Request Reason'] });
        await this.page.selectOption(supplierInformation.taxOrganizationTypeDropdown, { label: supplierData['Tax Organization Type'] });
        await this.page.selectOption(supplierInformation.supplierTypeDropdown, { label: supplierData['Supplier Type'] });

        // Generate a random 9-digit D-U-N-S Number
        const randomDunsNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
        await this.dunsNumberField.fill(randomDunsNumber);
        await this.taxCountryField.fill(supplierData['Country']);
    }

    // Click Add icon to add contact details
    async addContactDetails(supplierData: any) {
        await this.contactCreateIcon.click();
        await this.firstNameField.fill(supplierData['First Name']);
        await this.lastNameField.fill(supplierData['Last Name']);
        await this.emailField.fill(supplierData['Email']);
        await this.createUserAccountCheckbox.click({ force: true });
        await this.contactokButton.click();
    }


    // Click Add icon to add address details
    async addAddressDetails(supplierData: any) {
        await this.addressCreateIcon.click();
        await this.addressNameField.fill(supplierData['Address Name']);
        await this.addressCountryField.fill(supplierData['Country']);
        await this.orderingCheckbox.click({ force: true });
        await this.page.waitForTimeout(3000);
        await this.remitToCheckbox.click({ force: true });
        await expect(this.cityField).toBeVisible();
        await this.cityField.fill(supplierData['City']);
        await this.okButton.click();
    }

    async addbusinessClassifications() {
        await this.businessClassifications.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.businessClassifications.click({ force: true });
    }

    async addProductsandServicesCategories(supplierData: any) {
        await this.selctandAdd.scrollIntoViewIfNeeded();
        await this.selctandAdd.click();
        await this.checkboxExpenseItem.click({ force: true });
        await this.checkboxNewHireSupplies.click({ force: true });
        await this.productOkButton.click();
        await this.registerbutton.click();
    }
}

export default SupplierDetailsSection;