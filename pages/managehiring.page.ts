import { Page, Locator } from "@playwright/test";
import manageOptionsLocatorX from "../locators/manageoptions.ts";

class ManageHireeOptions {
    page: Page;
    manageCommunicationInfoOptions: Locator;
    continueBtn: Locator;
    cancelBtn: Locator;
    constructor(page) {
        this.page = page;
        this.manageCommunicationInfoOptions = page.locator(manageOptionsLocatorX.communicationInfo);
        this.continueBtn = page.locator(manageOptionsLocatorX.continueBtn);
        this.cancelBtn = page.locator(manageOptionsLocatorX.cancelBtn);

    }

    async selectOptions(option: string) {
        switch (option.toLocaleLowerCase()) {
            case "communication info":
                await this.page.waitForTimeout(2000);
                await this.manageCommunicationInfoOptions.click();
                break;
            case "create invoice":
                console.log("need to implement when required");
                break;
            default:
                console.log("No such option exists!");
                break;
        }
        await this.continueBtn.click();
    }
}
export default ManageHireeOptions;