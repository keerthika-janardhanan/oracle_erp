import { Page, Locator } from '@playwright/test';
import locators from "../locators/employee-wellness.ts";

class Employeewellnesspage {
  page: Page;
  userName: Locator;
  password: Locator;
  signIn: Locator;
  enterPasscode: Locator;
  verify: Locator;
  navigator: Locator;
  benefitsAdministration: Locator;
  employeeWellness: Locator;
  createACorporateGoal: Locator;
  name: Locator;
  dailyTargetMinutes: Locator;
  saveAndClose: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator(locators.userName);
    this.password = page.locator(locators.password);
    this.signIn = page.locator(locators.signIn);
    this.enterPasscode = page.locator(locators.enterPasscode);
    this.verify = page.locator(locators.verify);
    this.navigator = page.locator(locators.navigator);
    this.benefitsAdministration = page.locator(locators.benefitsAdministration);
    this.employeeWellness = page.locator(locators.employeeWellness);
    this.createACorporateGoal = page.locator(locators.createACorporateGoal);
    this.name = page.locator(locators.name);
    this.dailyTargetMinutes = page.locator(locators.dailyTargetMinutes);
    this.saveAndClose = page.locator(locators.saveAndClose);
  }
}

export default Employeewellnesspage;
