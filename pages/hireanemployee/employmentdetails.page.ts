import { Page, Locator, expect } from "@playwright/test";
// Importing locators and utility classes
import employmentdetailsLocatorX from "../../locators/hireanemployee/employeedetails.ts";
import HelperClass from "../../util/methods.utility";

class EmploymentDetailsSection {
    page: Page;
    businessUnit: Locator;
    regularOrTemp: Locator;
    job: Locator;
    fullOrPartTime: Locator;
    businessTitle: Locator;
    grade: Locator;
    probationPeriodInput: Locator;
    probationPeriodDrop: Locator;
    probationEndDateInput: Locator;
    department: Locator;
    location: Locator;
    submit: Locator;
    helperClass: HelperClass;

    constructor(page: Page) {
        this.page = page;
        this.helperClass = new HelperClass(page);

        // Initializing locators
        this.businessUnit = page.locator(employmentdetailsLocatorX.businessUnit);
        this.regularOrTemp = page.locator(employmentdetailsLocatorX.regularOrTemp);
        this.job = page.locator(employmentdetailsLocatorX.job);
        this.fullOrPartTime = page.locator(employmentdetailsLocatorX.fullTime);
        this.businessTitle = page.locator(employmentdetailsLocatorX.businessTitle);
        this.grade = page.locator(employmentdetailsLocatorX.grade);
        this.probationPeriodInput = page.locator(employmentdetailsLocatorX.probationPeriodInput);
        this.probationPeriodDrop = page.locator(employmentdetailsLocatorX.probationPeriodDropdown);
        this.probationEndDateInput = page.locator(employmentdetailsLocatorX.probationEndDate);
        this.department = page.locator(employmentdetailsLocatorX.department);
        this.location = page.locator(employmentdetailsLocatorX.location);
        this.submit = page.locator(employmentdetailsLocatorX.submit);
    }

    /**
     * Fills the employment details form with the provided data.
     * @param employmentDetails - Array containing employment details.
     */
    async fillEmploymentDetails(employmentDetails: any) {
        // Ensure the business unit dropdown is visible and interactable
        await this.page.waitForTimeout(2000);
        await expect(this.businessUnit).toBeVisible({timeout: 15000});
        await this.businessUnit.scrollIntoViewIfNeeded();
        await this.businessUnit.click();
        await this.clickDropdown(employmentDetails.BusinessUnit);

        // Select job from the dropdown
        await this.page.waitForTimeout(2000);
        await this.job.click();
        await this.clickDropdown(employmentDetails.Job);

        // Fill business title
        await this.businessTitle.fill(employmentDetails.BusinessTitle);

        // Scroll to probation period input
        await this.probationPeriodInput.scrollIntoViewIfNeeded();

        // Select grade and department
        await this.grade.click();
        await this.clickDropdown(employmentDetails.Grade);
        await this.department.click();
        await this.clickDropdown(employmentDetails.Department);

        // Handle location dropdown with retries
        for (let attempt = 0; attempt < 3; attempt++) {
            await this.location.click();
            const locationVisible = await this.page
                .locator(`xpath=//text()[normalize-space(.)='${employmentDetails.Location}']/parent::*`)
                .isVisible({ timeout: 2000 });
            if (locationVisible) {
                await this.location.click();
                break;
            }
            await this.page.waitForTimeout(1000);
        }
        await this.clickDropdown(employmentDetails.Location);

        // Select employment type and full/part-time status
        await this.page.waitForTimeout(1000);
        await this.helperClass.compoundElementSelection(this.regularOrTemp, employmentDetails.EmploymentType);
        await this.helperClass.compoundElementSelection(this.fullOrPartTime, employmentDetails.FullOrPartTime);

        // Fill probation period and duration
        await this.page.waitForTimeout(1000);
        await this.probationPeriodInput.fill(employmentDetails.ProbationPeriod.toString());
        await this.page.waitForTimeout(1000);
        await this.helperClass.compoundElementSelection(this.probationPeriodDrop, employmentDetails.ProbationDuration);

        // Take a screenshot of the filled form
        await this.page.screenshot({ path: 'screenshots/EmploymentDetails.png', fullPage: true });

        // Submit the form
        await this.submit.click();
    }

    /**
     * Generates an XPath for a dropdown value.
     * @param legalEmValue - The value to locate in the dropdown.
     * @returns The XPath string.
     */
    getDropdownValueXpath(legalEmValue: string): string {
        return `//div[contains(text(),"${legalEmValue}")]`;
    }

    /**
     * Clicks a dropdown value based on the provided text.
     * @param value - The value to select from the dropdown.
     */
    async clickDropdown(value: string) {
        const xpath = this.getDropdownValueXpath(value);
        await expect(this.page.locator(xpath)).toBeVisible();
        await this.page.locator(xpath).click();
    }
}

export default EmploymentDetailsSection;