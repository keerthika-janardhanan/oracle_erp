import { Locator, Page, expect } from "@playwright/test";
import personaldetailsLocatorX from "../../locators/hireanemployee/personaldetailslocator.ts";
import HelperClass from "../../util/methods.utility";
const path = require('path')

class PersonalDetailsSection {

    page: Page
    title: Locator
    lastname: Locator
    firstname: Locator
    gender: Locator
    correspondencelanguage: Locator
    dateofbirth: Locator
    country: Locator
    nationalidtype: Locator
    nationalid: Locator
    NoMatchAddPerson: Locator
    continue: Locator

    helperClass: HelperClass;

    constructor(page) {
        this.page = page;
        this.title = page.locator(personaldetailsLocatorX.title);
        this.lastname = page.locator(personaldetailsLocatorX.lastname);
        this.firstname = page.locator(personaldetailsLocatorX.firstname);
        this.gender = page.locator(personaldetailsLocatorX.gender);
        this.correspondencelanguage = page.locator(personaldetailsLocatorX.correspondencelanguage);
        this.dateofbirth = page.locator(personaldetailsLocatorX.dateofbirth);
        this.country = page.locator(personaldetailsLocatorX.country);
        this.nationalidtype = page.locator(personaldetailsLocatorX.nationalidtype);
        this.nationalid = page.locator(personaldetailsLocatorX.nationalid);
        this.NoMatchAddPerson=page.locator(personaldetailsLocatorX.NoMatchAddPerson);
        this.continue = page.locator(personaldetailsLocatorX.continue);
        this.helperClass = new HelperClass(page);
    }

    async fillPersonalDetails(personalDetails: any) {
        await expect(this.title).toBeVisible({ timeout: 10000 });
        await this.title.scrollIntoViewIfNeeded();
        await this.helperClass.compoundElementSelection(this.title, personalDetails.Title);
        await this.firstname.fill(`${personalDetails.FirstName}${await this._randomAlphabetString()}`);
        await this.lastname.fill(`${personalDetails.LastName}${await this._randomAlphabetString()}`);
        await this.helperClass.compoundElementSelection(this.gender, personalDetails.Gender);
        await this.dateofbirth.fill(personalDetails.DateOfBirth);
        await this.helperClass.compoundElementSelection(this.nationalidtype, personalDetails.NationalIdType);
        await expect(this.nationalid).toBeVisible({ timeout: 10000 });

        //Below 2 lines are for testing purposes only, to generate a random national ID
        const randomNationalId = `${Math.floor(100000000 + Math.random() * 900000000)}/${Math.floor(100000 + Math.random() * 900000)}`;
        await this.nationalid.fill(randomNationalId);
        await this.page.screenshot({ path: 'screenshots/PersonalDetails.png', fullPage: true });

    }

    async noMatchAddPersonfun(){

        await this.NoMatchAddPerson.check();
        await this.contineToOtherSection();
    }

    async _random7digit() {
        const number = Math.floor(1000000 + Math.random() * 9000000); // ensures a 7-digit number
        return `_${number}`;
      }

      async _randomAlphabetString(length: number = 7): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async contineToOtherSection() {
        await this.continue.click();
    }

    escapeCssId(id: string): string {
        return id.replace(/[&/\\#,+()$~%.'":*?<>{}0-9_]/g, '');
    }

}
export default PersonalDetailsSection