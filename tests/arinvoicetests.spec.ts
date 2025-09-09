import { test } from "./testSetup.ts";
import LoginPage from '../pages/login.page.ts';
import ArInvoiceHomePage from "../pages/arinvoice/arinvoicehome.page.ts";
import ArInvoiceTasksPage from "../pages/arinvoice/arinvoicetasks.page.ts";
import ArInvoiceFormPage from "../pages/arinvoice/arinvoiceform.page.ts";
import { getTestToRun, shouldRun, readExcelData } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';
import HomePage from "../pages/home.page.ts";

const path = require('path');

dotenv.config();
let arInvoiceData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe('AR Invoice Creation flow', () => {
    let loginPage: LoginPage;
    let arInvoiceHomePage: ArInvoiceHomePage;
    let arInvoiceTasksPage: ArInvoiceTasksPage;
    let arInvoiceFormPage: ArInvoiceFormPage;
    let homePage: HomePage;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('AR Invoice Creation UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        arInvoiceHomePage = new ArInvoiceHomePage(page);
        arInvoiceTasksPage = new ArInvoiceTasksPage(page);
        arInvoiceFormPage = new ArInvoiceFormPage(page);

        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        arInvoiceData = readExcelData(
            path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]),
            'arinvoicedata',
            dataForTheTest[0]["ReferenceID"],
            dataForTheTest[0]["IDName"]
        );

        console.log("dataForTheTest: ", dataForTheTest);
        console.log("Excel File Path: ", path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]));
        console.log("arInvoiceData: ", arInvoiceData);

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

        // Navigate to AR Invoice Billing Section
        await namedStep('Step 3 - Navigate to AR Invoice Billing Section', page, testinfo, async () => {
            await arInvoiceHomePage.navigateToArInvoiceBilling();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Navigate to AR Invoice Billing Section', testinfo, screenshot);
        });

        // Navigate to Tasks and Create New AR Invoice Transaction
        await namedStep('Step 4 - Navigate to Tasks and Create New AR Invoice Transaction', page, testinfo, async () => {
            await arInvoiceTasksPage.navigateToTasks();
            await arInvoiceTasksPage.createNewArInvoiceTransaction();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 4 - Navigate to Tasks and Create New AR Invoice Transaction', testinfo, screenshot);
        });

        // Fill AR Invoice Details
        await namedStep('Step 5 - Fill AR Invoice Details', page, testinfo, async () => {
            await arInvoiceFormPage.fillArInvoiceDetails(arInvoiceData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 5 - Fill AR Invoice Details', testinfo, screenshot);
        });

        // Save and Complete AR Invoice
        await namedStep('Step 6 - Save and Complete AR Invoice', page, testinfo, async () => {
            await arInvoiceFormPage.saveAndCompleteArInvoice();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 6 - Save and Complete AR Invoice', testinfo, screenshot);
        });

        // Get AR Invoice Transaction Number
        await namedStep('Step 7 - Get AR Invoice Transaction Number', page, testinfo, async () => {
            const transactionNumber = await arInvoiceFormPage.getArInvoiceTransactionNumber();
            
            // Log the transaction number for reporting
            console.log(`Final AR Invoice Transaction Number: ${transactionNumber}`);
            
            // Save transaction number back to data object
            arInvoiceData.TransactionNumber = transactionNumber;
            
            const screenshot = await page.screenshot();
            attachScreenshot('Step 7 - AR Invoice Completed with Number: ' + transactionNumber, testinfo, screenshot);
        });
        
    });
});
