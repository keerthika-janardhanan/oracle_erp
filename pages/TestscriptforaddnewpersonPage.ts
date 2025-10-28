import { Page, Locator } from '@playwright/test';
import locators from "../locators/test-script-for-add-new-person.ts";

class Testscriptforaddnewpersonpage {
  page: Page;
  userName: Locator;
  password: Locator;
  signIn: Locator;
  enterPasscode: Locator;
  verify: Locator;
  navigator: Locator;
  myTeam: Locator;
  newPerson: Locator;
  newPersonDashboard: Locator;
  view: Locator;
  viewFormatQueryByExampleFreezeFreezeWrapWrapPersonPersonNumberLegalEmployerProposedStartDa: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator(locators.userName);
    this.password = page.locator(locators.password);
    this.signIn = page.locator(locators.signIn);
    this.enterPasscode = page.locator(locators.enterPasscode);
    this.verify = page.locator(locators.verify);
    this.navigator = page.locator(locators.navigator);
    this.myTeam = page.locator(locators.myTeam);
    this.newPerson = page.locator(locators.newPerson);
    this.newPersonDashboard = page.locator(locators.newPersonDashboard);
    this.view = page.locator(locators.view);
    this.viewFormatQueryByExampleFreezeFreezeWrapWrapPersonPersonNumberLegalEmployerProposedStartDa = page.locator(locators.viewFormatQueryByExampleFreezeFreezeWrapWrapPersonPersonNumberLegalEmployerProposedStartDa);
  }
}

export default Testscriptforaddnewpersonpage;
