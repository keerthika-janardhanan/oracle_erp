import { Page, Locator, expect } from "@playwright/test";
import HelperClass from "../../util/methods.utility";
import whenAndWhyLocatorX from "../../locators/hireanemployee/whenandwhylocator.ts";
const path = require('path');
class WhenAnDWhySection {

    page: Page
    hireDate: Locator
    legalEmployer: Locator
    legalEmployerText: Locator
    wayToHire: Locator
    whyHiring: Locator
    continue: Locator
    helperClass: HelperClass;

    constructor(page) {
        this.page = page;

        this.hireDate = page.locator(whenAndWhyLocatorX.hireDate);
        this.legalEmployer = page.locator(whenAndWhyLocatorX.legalEmployer);
        this.legalEmployerText = page.locator(whenAndWhyLocatorX.legalEmployerText);
        this.wayToHire = page.locator(whenAndWhyLocatorX.wayToHire);
        this.whyHiring = page.locator(whenAndWhyLocatorX.whyHiring);
        this.continue = page.locator(whenAndWhyLocatorX.continue);

        this.helperClass = new HelperClass(page);
    }


    async fillHireInfo(hiringInfo: any) {
        console.log("hiringInfo: ", hiringInfo);
        await this.hireDate.scrollIntoViewIfNeeded();
        await this.hireDate.fill(this.helperClass.todayDate());
        await this.legalEmployer.fill(hiringInfo.legalEmployer);
        await this.legalEmployer.click();
        const legalEmployerXpath = this.getDynamicXpath(hiringInfo.legalEmployer);
        await expect(this.page.locator(legalEmployerXpath)).toBeVisible({ timeout: 5000 });
        await this.page.locator(legalEmployerXpath).click();
        await this.wayToHire.fill(hiringInfo.WayToHire);
       

        for (let attempt = 0; attempt < 3; attempt++) {
            await this.whyHiring.fill(hiringInfo.HireReason);
            const dynamicXpath = `xpath=//*[text()="${hiringInfo.HireReason}"]`;
            if (await this.page.locator(dynamicXpath).isVisible({ timeout: 5000 })) {
                await this.page.locator(dynamicXpath).click();
                break;
            }
            await this.page.waitForTimeout(1000); // Wait before retrying
        }
        
        await this.page.screenshot({ path: 'screenshots/WhenAndWhyPage.png', fullPage: true });
    }

    async contineToOtherSection() {
        await this.continue.scrollIntoViewIfNeeded();
        await this.continue.click();
    }

    getDynamicXpath(value: string): string {
        return `xpath=//div[contains(text(),"${value}")]`;
    }
}
export default WhenAnDWhySection