import { test } from "./testSetup.ts";
import LoginPage from '../pages/login.page.ts';
import ReceiptHomePage from "../pages/receipt/receipthome.page.ts";
import ReceiptTasksPage from "../pages/receipt/receipttasks.page.ts";
import ReceiptFormPage from "../pages/receipt/receiptform.page.ts";
import { getTestToRun, shouldRun, readExcelData } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';
import HomePage from "../pages/home.page.ts";

const path = require('path');

dotenv.config();
let receiptData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe('AR Receipt Creation flow', () => {
    let loginPage: LoginPage;
    let receiptHomePage: ReceiptHomePage;
    let receiptTasksPage: ReceiptTasksPage;
    let receiptFormPage: ReceiptFormPage;
    let homePage: HomePage;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('AR Receipt Creation UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        receiptHomePage = new ReceiptHomePage(page);
        receiptTasksPage = new ReceiptTasksPage(page);
        receiptFormPage = new ReceiptFormPage(page);

        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        receiptData = readExcelData(
            path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]),
            'receiptdata',
            dataForTheTest[0]["ReferenceID"],
            dataForTheTest[0]["IDName"]
        );

        console.log("dataForTheTest: ", dataForTheTest);
        console.log("Excel File Path: ", path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]));
        console.log("receiptData: ", receiptData);

        // Login to application
        await namedStep('Step 1 - Go to login page', page, testinfo, async () => {
            await loginPage.goto();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 1 - Go to Oracle login page', testinfo, screenshot);
        });

        await namedStep('Step 2 - Navigate to home', page, testinfo, async () => {
            await loginPage.login(process.env.USERID ?? '', process.env.PASSWORD ?? '');
            const screenshot = await page.screenshot();
            attachScreenshot('Step 2 - Navigate to home', testinfo, screenshot);
        });

        // Navigate to Accounts Receivable Section
        await namedStep('Step 3 - Navigate to Accounts Receivable Section', page, testinfo, async () => {
            await receiptHomePage.navigateToAccountsReceivable();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Navigate to Accounts Receivable Section', testinfo, screenshot);
        });

        // Navigate to Tasks and Create New Receipt Transaction
        await namedStep('Step 4 - Navigate to Tasks and Create New Receipt Transaction', page, testinfo, async () => {
            await receiptTasksPage.navigateToTasks();
            await receiptTasksPage.createNewReceiptTransaction();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 4 - Navigate to Tasks and Create New Receipt Transaction', testinfo, screenshot);
        });

        // Fill Receipt Details
        await namedStep('Step 5 - Fill Receipt Details', page, testinfo, async () => {
            await receiptFormPage.fillCompleteReceiptDetails(receiptData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 5 - Fill Receipt Details', testinfo, screenshot);
        });

        console.log('Receipt creation process completed successfully');
    });
});
