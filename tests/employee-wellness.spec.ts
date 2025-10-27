import { test } from "./testSetup.ts";
import PageObject from "../pages/EmployeewellnessPage.ts";
import { getTestToRun, shouldRun } from "../util/csvFileManipulation.ts";
import { namedStep } from "../util/screenshot.ts";
import * as dotenv from 'dotenv';

const path = require('path');

dotenv.config();
let executionList: any[];

test.beforeAll(() => {
  executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe("employee wellness", () => {
  let flow: PageObject;

  const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
    (shouldRun(name) ? test : test.skip)(name, fn);

  run("employee wellness", async ({ page }, testinfo) => {
    flow = new PageObject(page);
    const testCaseId = testinfo.title;
    const testRow: any = executionList?.find((row: any) => row['TestCaseID'] === testCaseId) ?? {};
    void testRow;

    await namedStep("Step 1 - Click the User Name field", page, testinfo, async () => {
      // Click the User Name field
      await flow.userName.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 2 - Enter User Name", page, testinfo, async () => {
      // Enter User Name
      await flow.userName.fill("<email>");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 3 - Click the Password field", page, testinfo, async () => {
      // Click the Password field
      await flow.password.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 4 - Enter Password", page, testinfo, async () => {
      // Enter Password
      await flow.password.fill("True");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 5 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await flow.signIn.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 6 - Click the Enter Passcode field", page, testinfo, async () => {
      // Click the Enter Passcode field
      await flow.enterPasscode.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 7 - Enter Enter Passcode", page, testinfo, async () => {
      // Enter Enter Passcode
      await flow.enterPasscode.fill("912176");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 8 - Click the Verify element", page, testinfo, async () => {
      // Click the Verify element
      await flow.verify.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 9 - Click the Navigator img", page, testinfo, async () => {
      // Click the Navigator img
      await flow.navigator.click();
      // Expected: Navigator opened.
    });

    await namedStep("Step 10 - Click the Benefits Administration element", page, testinfo, async () => {
      // Click the Benefits Administration element
      await flow.benefitsAdministration.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 11 - Click the Employee Wellness element", page, testinfo, async () => {
      // Click the Employee Wellness element
      await flow.employeeWellness.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 12 - Click the Create a Corporate Goal img", page, testinfo, async () => {
      // Click the Create a Corporate Goal img
      await flow.createACorporateGoal.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 13 - Click the Name field", page, testinfo, async () => {
      // Click the Name field
      await flow.name.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 14 - Enter Name", page, testinfo, async () => {
      // Enter Name
      await flow.name.fill("active test");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 15 - Click the Daily Target Minutes field", page, testinfo, async () => {
      // Click the Daily Target Minutes field
      await flow.dailyTargetMinutes.click();
      // Expected: Element responds as expected.
    });

    await namedStep("Step 16 - Enter Daily Target Minutes", page, testinfo, async () => {
      // Enter Daily Target Minutes
      await flow.dailyTargetMinutes.fill("35");
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 17 - Click the Save and Close element", page, testinfo, async () => {
      // Click the Save and Close element
      await flow.saveAndClose.click();
      // Expected: Confirmation dialog is displayed.
    });

  });
});
