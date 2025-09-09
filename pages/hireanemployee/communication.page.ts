import { Page, Locator, expect } from "@playwright/test";
import communicationLocatorX from "../../locators/hireanemployee/communicationlocator.ts";
import HelperClass from "../../util/methods.utility";

class CommunicationSection {
    page: Page;
    phoneType: Locator;
    phoneNumber: Locator;
    emailType: Locator;
    email: Locator;

    helperClass: HelperClass;

    constructor(page) {
        this.page = page;
        this.helperClass = new HelperClass(page);
        this.phoneType = page.locator(communicationLocatorX.phoneType);
        this.phoneNumber = page.locator(communicationLocatorX.phoneNumber);
        this.emailType = page.locator(communicationLocatorX.emailType);
        this.email = page.locator(communicationLocatorX.email);
    }

    async fillCommunicationDetails(communicationDetails: any) {
        await this.helperClass.compoundElementSelection(this.phoneType, communicationDetails.PhoneType);
        await expect(this.phoneNumber).toBeVisible({ timeout: 5000 });
        await this.phoneNumber.fill(communicationDetails.PhoneNumber.toString());
        await this.helperClass.compoundElementSelection(this.emailType, communicationDetails.EmailType);
        await expect(this.email).toBeVisible({ timeout: 5000 });
        await this.email.fill(communicationDetails.Email);
        await this.page.screenshot({ path: 'screenshots/Communication.png', fullPage: true });
    }
}
export default CommunicationSection;