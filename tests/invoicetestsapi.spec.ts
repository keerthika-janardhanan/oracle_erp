import { test, Page } from '@playwright/test';
import { readExcelData } from "../businesscomponents/readexceldata.ts";
import generateInvoicePayload from "../businesscomponents/generateinvoicepayload.ts";
import postToOracle from "../businesscomponents/postinvoicetooracle.ts";
import logHtmlReport from "../businesscomponents/loghtmlreport.ts";
import { getTestToRun, shouldRun } from '../util/csvFileManipulation.ts';
import { incrementReferenceIdInTestManager } from '../util/referenceIdIncrementer.ts';
import CreateInvoicePage from '../pages/createinvoice/createInvoice.page.ts';
import InvoicePage from '../pages/createinvoice/invoice.page.ts';
import HomePage from '../pages/home.page.ts';
import LoginPage from '../pages/login.page.ts';
import SearchWorkStream from '../pages/search.page.ts';
import { namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';
const path = require('path')
dotenv.config();

let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
})

test.describe('Invoice Module API', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let page: Page;
    let invoicePage: InvoicePage;
    let createInvoicePage: CreateInvoicePage;
    let searchWorkStream: SearchWorkStream;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('Invoice creation API', async ({ page }, testinfo) => {
        const testCaseID = "Invoice creation API";
        const testCaseDescription = executionList.filter(r => r["TestCaseID"] === testinfo.title)[0]["TestCaseDescription"];
        console.log(`🧪 [${testCaseID}] Starting test case...`);
        const { headerRow, lineRows, datasheetName, referenceID, idName } = await readExcelData(testCaseID);
        const { fileBaseName, payloadPath, status: genStatus } = await generateInvoicePayload(testCaseID, headerRow, lineRows);
        const postStatus = await postToOracle(testCaseID, fileBaseName, datasheetName);

        logHtmlReport(testCaseID, fileBaseName, testCaseDescription, [genStatus, postStatus]);
        
        // Increment ReferenceID regardless of test result
        await incrementReferenceIdInTestManager(testCaseID);
        console.log(`✅ [${testCaseID}] Test case execution complete.`);
    });

    run('TC_API_FIN_InvoiceCreation_01', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        invoicePage = new InvoicePage(page);
        
        const testCaseID = testinfo.title;
        const testCaseDescription = executionList.filter(r => r["TestCaseID"] === testinfo.title)[0]["TestCaseDescription"];

        console.log(`🧪 [${testCaseID}] Starting test case...`);
        const { headerRow, lineRows, datasheetName, referenceID, idName } = await readExcelData(testCaseID);
        const { fileBaseName, payloadPath, status: genStatus } = await generateInvoicePayload(testCaseID, headerRow, lineRows);

        await namedStep('Step 1 - Create the invoice using the API request', page, testinfo, async () => {
            const postStatus = await postToOracle(testCaseID, fileBaseName, datasheetName);
            logHtmlReport(testCaseID, fileBaseName, testCaseDescription, [genStatus, postStatus]);
            console.log(`✅ [${testCaseID}] Test case execution complete.`);
        });

        await namedStep('Step 2 - Go to Oracle UI login page', page, testinfo, async () => {
            await loginPage.goto();
            await loginPage.login(process.env.USERID ?? '', process.env.PASSWORD ?? '');
        });

        await namedStep('Step 3 - Navigate to home', page, testinfo, async () => {
            await homePage.navigateToHome();
        });

        await namedStep('Step 4 - Navigate to payable', page, testinfo, async () => {
            await homePage.navigateToPayable();
        });

        await namedStep('Step 5 - Navigate to Invoices', page, testinfo, async () => {
            await homePage.navigateToInvoices();
        });

        await namedStep('Step 6 - Validate the invoice number created', page, testinfo, async () => {
            let invoiceNumber = headerRow["InvoiceNumber"] || headerRow["Invoice Number"];
            await invoicePage.validateInvoiceNumber(invoiceNumber);
        });
        
        // Increment ReferenceID regardless of test result
        await incrementReferenceIdInTestManager(testCaseID);
    });
});