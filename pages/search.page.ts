import { Page, Locator } from "@playwright/test";
import HelperClass from "../util/methods.utility";
import searchPageLocatorsX from "../locators/searchpagelocators.ts";

class SearchWorkStream {

    page: Page
    searchBtn: Locator
    searchInput: Locator
    searchResult: Locator
    helperClass: HelperClass

    constructor(page) {
        this.page = page;
        this.searchBtn = this.page.locator(searchPageLocatorsX.searchBtn);
        this.searchInput = this.page.locator(searchPageLocatorsX.searchInput);
        this.searchResult = this.page.locator(searchPageLocatorsX.searchResult);
       

        this.helperClass = new HelperClass(page);
    }

    async searchWrokStream(workStream: string) {
        await this.page.waitForTimeout(5000);
        await this.searchBtn.click();
        await this.page.waitForTimeout(2000);
        await this.searchInput.click();
        await this.helperClass.slowTyping(workStream, this.searchInput);

        await this.page.screenshot({ path: 'Screenshots/SearchPage.png', fullPage: true });

        const baseXPath = searchPageLocatorsX.searchResult.replace('searchResult', workStream);
        const cellLocator = this.page.locator(baseXPath);
        await cellLocator.click({ timeout: 10000 });
    }
}
export default SearchWorkStream