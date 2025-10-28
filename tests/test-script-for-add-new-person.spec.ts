import { test } from "./testSetup.ts";
import PageObject from "../pages/TestscriptforaddnewpersonPage.ts";
import { getTestToRun, shouldRun } from "../util/csvFileManipulation.ts";
import { namedStep } from "../util/screenshot.ts";
import * as dotenv from 'dotenv';

const path = require('path');

dotenv.config();
let executionList: any[];

test.beforeAll(() => {
  executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe("test script for add new person", () => {
  let flow: PageObject;

  const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
    (shouldRun(name) ? test : test.skip)(name, fn);

  run("test script for add new person", async ({ page }, testinfo) => {
    flow = new PageObject(page);
    const testCaseId = testinfo.title;
    const testRow: any = executionList?.find((row: any) => row['TestCaseID'] === testCaseId) ?? {};
    void testRow;

    await namedStep("Step 1 - Enter User Name", page, testinfo, async () => {
      // Enter User Name
      await flow.userName.fill("<email>");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 2 - Click the Password field", page, testinfo, async () => {
      // Click the Password field
      await flow.password.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 3 - Enter Password", page, testinfo, async () => {
      // Enter Password
      await flow.password.fill("True");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 4 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await flow.signIn.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 5 - Click the Enter Passcode field", page, testinfo, async () => {
      // Click the Enter Passcode field
      await flow.enterPasscode.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 6 - Enter Enter Passcode", page, testinfo, async () => {
      // Enter Enter Passcode
      await flow.enterPasscode.fill("049851");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 7 - Click the Verify element", page, testinfo, async () => {
      // Click the Verify element
      await flow.verify.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 8 - Click the Navigator img", page, testinfo, async () => {
      // Click the Navigator img
      await flow.navigator.click();
      // Expected: Navigator opened.
    });

    await namedStep("Step 9 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await flow.myTeam.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 10 - Click the New Person element", page, testinfo, async () => {
      // Click the New Person element
      await flow.newPerson.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 11 - Click the New Person Dashboard link", page, testinfo, async () => {
      // Click the New Person Dashboard link
      await flow.newPersonDashboard.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 12 - Click the View link", page, testinfo, async () => {
      // Click the View link
      await flow.view.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 13 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await flow.viewFormatQueryByExampleFreezeFreezeWrapWrapPersonPersonNumberLegalEmployerProposedStartDa.click();
      // Expected: Element responds as expected.
    });

  });
});
