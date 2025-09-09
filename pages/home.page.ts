import { Page, Locator } from "@playwright/test";
import homeLocators from "../locators/home.ts";
import payablesLocators from "../locators/payables.ts";
import payablesLocatorX from "../locators/createinvoice/payables.ts";
import clientgroupLocatorX from "../locators/hireanemployee/clientgroup.ts";
import newpersonLocatorX from "../locators/hireanemployee/newperson.ts";

class HomePage {
    page: Page;

    payableLinks: Locator;
    invoiceLinks: Locator;
    homeIcon: Locator;
    clientGroupIcon: Locator;
    newPersonIcon: Locator;
    hireAnEmployeeLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeIcon = page.locator(homeLocators.home);
        this.payableLinks = page.locator(payablesLocators.payables);
        this.invoiceLinks = page.locator(payablesLocatorX.invoices);
        this.clientGroupIcon = page.locator(clientgroupLocatorX.myClientGroups);
        this.newPersonIcon = page.locator(clientgroupLocatorX.newPerson);
        this.hireAnEmployeeLink = page.locator(newpersonLocatorX.hireanEmployeeHireanEmploy);

    }
    async navigateToHome() {
        await this.page.waitForLoadState('networkidle');
        await this.homeIcon.click()
        await this.page.screenshot({ path: 'code/Screenshot/' + 'HomePage.png' });
    }

    async navigateToInvoices() {
        await this.payableLinks.click();
        await this.invoiceLinks.click();
    }

    async navigateToPayable() {
        await this.payableLinks.click();
    }

    async navigateToHireAnEmployee() {
        await this.clientGroupIcon.click();
        await this.newPersonIcon.click();
        await this.hireAnEmployeeLink.click();
    }
}

export default HomePage;
function expect(hamburgerLocator: Locator) {
    throw new Error("Function not implemented.");
}

