import { test } from "./testSetup.ts";
import PageObject from "../pages/TesyrPage.ts";
import LoginPage from "../pages/login.page.ts";
import HomePage from "../pages/home.page.ts";
import { getTestToRun, shouldRun, readExcelData } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from "../util/screenshot.ts";
import * as dotenv from 'dotenv';

const path = require('path');
const fs = require('fs');

dotenv.config();
let executionList: any[];

test.beforeAll(() => {
  executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe("tesyr", () => {
  let tesyrpage: PageObject;
  let loginPage: LoginPage;
  let homePage: HomePage;

  const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
    (shouldRun(name) ? test : test.skip)(name, fn);

  run("tesyr", async ({ page }, testinfo) => {
    tesyrpage = new PageObject(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    const testCaseId = testinfo.title;
    const testRow: Record<string, any> = executionList?.find((row: any) => row['TestCaseID'] === testCaseId) ?? {};
    const defaultDataStem = (() => {
      const core = testCaseId.replace(/[^a-z0-9]+/gi, ' ').trim();
      if (!core) {
        return 'TestData';
      }
      return core.split(/\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    })();
    const defaultDatasheetName = `${defaultDataStem}Data.xlsx`;
    const defaultIdColumn = `${defaultDataStem}ID`;
    const defaultReferenceId = `${defaultDataStem}001`;
    const dataSheetName = String(testRow?.['DatasheetName'] ?? '').trim() || defaultDatasheetName;
    const dataReferenceId = String(testRow?.['ReferenceID'] ?? '').trim() || defaultReferenceId;
    const dataIdColumn = String(testRow?.['IDName'] ?? '').trim() || defaultIdColumn;
    const dataSheetTab = String(testRow?.['SheetName'] ?? testRow?.['Sheet'] ?? '').trim();
    const dataDir = path.join(__dirname, '../data');
    fs.mkdirSync(dataDir, { recursive: true });
    let dataRow: Record<string, any> = {};
    const ensureDataFile = (): string | null => {
      if (!dataSheetName) {
        console.warn(`[DATA] DatasheetName missing for ${testCaseId}; using generated defaults.`);
        return null;
      }
      const expectedPath = path.join(dataDir, dataSheetName);
      if (!fs.existsSync(expectedPath)) {
        const caseInsensitiveMatch = (() => {
          try {
            const entries = fs.readdirSync(dataDir, { withFileTypes: false });
            const target = dataSheetName.toLowerCase();
            const found = entries.find((entry) => entry.toLowerCase() === target);
            return found ? path.join(dataDir, found) : null;
          } catch (err) {
            console.warn(`[DATA] Unable to scan data directory for ${dataSheetName}:`, err);
            return null;
          }
        })();
        if (caseInsensitiveMatch) {
          return caseInsensitiveMatch;
        }
        const message = `Test data file '${dataSheetName}' not found in data/. Upload the file before running '${testCaseId}'.`;
        console.warn(`[DATA] ${message}`);
        throw new Error(message);
      }
      return expectedPath;
    };
    const normaliseKey = (value: string) => value.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const findMatchingDataKey = (sourceKey: string) => {
      if (!sourceKey || !dataRow) {
        return undefined;
      }
      const normalisedSource = normaliseKey(sourceKey);
      return Object.keys(dataRow || {}).find((candidate) => normaliseKey(String(candidate)) === normalisedSource);
    };
    const getDataValue = (sourceKey: string, fallback: string) => {
      if (!sourceKey) {
        return fallback;
      }
      const directKey = findMatchingDataKey(sourceKey) || findMatchingDataKey(sourceKey.replace(/([A-Z])/g, '_$1'));
      if (directKey) {
        const candidate = dataRow?.[directKey];
        if (candidate !== undefined && candidate !== null && `${candidate}`.trim() !== '') {
          return `${candidate}`;
        }
      }
      return fallback;
    };
    const dataPath = ensureDataFile();
    if (dataPath && dataReferenceId && dataIdColumn) {
      dataRow = readExcelData(dataPath, dataSheetTab || '', dataReferenceId, dataIdColumn) ?? {};
      if (!dataRow || Object.keys(dataRow).length === 0) {
        console.warn(`[DATA] Row not found in ${dataSheetName} for ${dataIdColumn}='${dataReferenceId}'.`);
      }
    } else if (dataSheetName) {
      console.warn(`[DATA] DatasheetName provided but ReferenceID/IDName missing for ${testCaseId}. Generated defaults will be used.`);
    }

    await namedStep("Step 1 - Enter User Name", page, testinfo, async () => {
      // Enter User Name
      await loginPage.goto();
      await loginPage.login(process.env.USERID ?? '', process.env.PASSWORD ?? '');
      const screenshot = await page.screenshot();
      attachScreenshot("Step 1 - Enter User Name", testinfo, screenshot);
      // Expected: Field captures the entered data.
    });

    await namedStep("Step 8 - Click the Navigator img", page, testinfo, async () => {
      // Click the Navigator img
      await tesyrpage.navigator.click();
      // Expected: Navigator opened.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 8 - Click the Navigator img", testinfo, screenshot);
    });

    await namedStep("Step 9 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await tesyrpage.me.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 9 - Click the element element", testinfo, screenshot);
    });

    await namedStep("Step 10 - Click the Volunteering element", page, testinfo, async () => {
      // Click the Volunteering element
      await tesyrpage.volunteering.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 10 - Click the Volunteering element", testinfo, screenshot);
    });

    await namedStep("Step 11 - Click the Volunteering element", page, testinfo, async () => {
      // Click the Volunteering element
      await tesyrpage.volunteering.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 11 - Click the Volunteering element", testinfo, screenshot);
    });

    await namedStep("Step 12 - Click the Create, view, and find teams to join. element", page, testinfo, async () => {
      // Click the Create, view, and find teams to join. element
      await tesyrpage.createViewAndFindTeamsToJoin.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 12 - Click the Create, view, and find teams to join. element", testinfo, screenshot);
    });

    await namedStep("Step 13 - Click the element element", page, testinfo, async () => {
      // Click the element element
      await tesyrpage.clickTheElementElement.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 13 - Click the element element", testinfo, screenshot);
    });

    await namedStep("Step 14 - Click the Name field", page, testinfo, async () => {
      // Click the Name field
      await tesyrpage.name.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 14 - Click the Name field", testinfo, screenshot);
    });

    await namedStep("Step 15 - Enter Name", page, testinfo, async () => {
      // Enter Name
      await tesyrpage.applyData(dataRow, ["Name"]);
      // Expected: Field captures the entered data.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 15 - Enter Name", testinfo, screenshot);
    });

    await namedStep("Step 16 - Click the Private element", page, testinfo, async () => {
      // Click the Private element
      await tesyrpage.private.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 16 - Click the Private element", testinfo, screenshot);
    });

    await namedStep("Step 17 - Click the Private Private checkbox", page, testinfo, async () => {
      // Click the Private Private checkbox
      await tesyrpage.privatePrivate.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 17 - Click the Private Private checkbox", testinfo, screenshot);
    });

    await namedStep("Step 18 - Enter Private Private", page, testinfo, async () => {
      // Enter Private Private
      await tesyrpage.applyData(dataRow, ["Private, Private"]);
      // Expected: Field captures the entered data.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 18 - Enter Private Private", testinfo, screenshot);
    });

    await namedStep("Step 19 - Click the Submit element", page, testinfo, async () => {
      // Click the Submit element
      await tesyrpage.submit.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 19 - Click the Submit element", testinfo, screenshot);
    });

    await namedStep("Step 20 - Click the Collapse My Teams img", page, testinfo, async () => {
      // Click the Collapse My Teams img
      await tesyrpage.collapseMyTeams.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 20 - Click the Collapse My Teams img", testinfo, screenshot);
    });

    await namedStep("Step 21 - Click the Expand My Teams img", page, testinfo, async () => {
      // Click the Expand My Teams img
      await tesyrpage.collapseMyTeams.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 21 - Click the Expand My Teams img", testinfo, screenshot);
    });

    await namedStep("Step 22 - Click the Load More Items link", page, testinfo, async () => {
      // Click the Load More Items link
      await tesyrpage.loadMoreItems.click();
      // Expected: Element responds as expected.
      const screenshot = await page.screenshot();
      attachScreenshot("Step 22 - Click the Load More Items link", testinfo, screenshot);
    });

  });
});
