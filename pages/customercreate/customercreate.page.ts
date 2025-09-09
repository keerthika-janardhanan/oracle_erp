import { Page, Locator } from "@playwright/test";
// Importing locators and utility classes
import customerInformation from "../../locators/customercreate/customercreate.ts";
import HelperClass from "../../util/methods.utility.ts";

class CustomerDetails {
    page: Page;
    helperClass: HelperClass;
    customerName: Locator;
    dunsNumber: Locator;
    accountAddressSetting: Locator;
    country: Locator;
    city: Locator;
    postalCode: Locator;
    addressPurposeAddRow: Locator;
    purpose: Locator;
    saveAndClose: Locator;



    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);

        this.customerName = page.locator(customerInformation.customerName);
        this.dunsNumber = page.locator(customerInformation.dunsNumber);
        this.accountAddressSetting = page.locator(customerInformation.accountAddressSetting);
        this.country = page.locator(customerInformation.country);
        this.city = page.locator(customerInformation.city);
        this.postalCode = page.locator(customerInformation.postalCode);
        this.addressPurposeAddRow = page.locator(customerInformation.addressPurposeAddRow);
        this.purpose = page.locator(customerInformation.purpose);
        this.saveAndClose = page.locator(customerInformation.saveAndClose);



    }

    async fillCustomerDetails(customerData: any) {
        // Fill the "Company" field with test data
        const randomAlphabet = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
        await this.customerName.fill(`${customerData['Name']}_${randomAlphabet}`);

        // Generate a random 9-digit D-U-N-S Number
        const randomDunsNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
        await this.dunsNumber.fill(randomDunsNumber);
        await this.accountAddressSetting.fill(customerData['Account Address Set']);
        await this.country.scrollIntoViewIfNeeded();

        await this.country.click();
        await this.page.selectOption(customerInformation.country, { label: customerData['Country'] });
        await this.city.fill(customerData['City']);
        await this.postalCode.click();
        await this.page.waitForTimeout(2000);
        await this.postalCode.fill(customerData['Postal Code'].toString());
        // Add address purposes
        await this.addressPurposeAddRow.scrollIntoViewIfNeeded();
        await this.addressPurposeAddRow.click();
        await this.page.selectOption(customerInformation.purpose,{ label: customerData['Purpose1'] });
        // Save and close the form
        await this.saveAndClose.click();

    }

}

export default CustomerDetails;

