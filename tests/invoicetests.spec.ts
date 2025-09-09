import { Page, test } from '@playwright/test';
import * as dotenv from 'dotenv';
import CreateInvoicePage from '../pages/createinvoice/createInvoice.page.ts';
import InvoicePage from '../pages/createinvoice/invoice.page.ts';
import HomePage from '../pages/home.page.ts';
import LoginPage from '../pages/login.page.ts';
import SearchWorkStream from '../pages/search.page.ts';
import { getTestToRun, readExcelData,readExcelDataLines, shouldRun } from '../util/csvFileManipulation.ts';
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import { incrementReferenceIdInTestManager } from '../util/referenceIdIncrementer.ts';

const path = require('path')
dotenv.config();

let invoiceHeaderData;
let invoiceLineData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
})

test.describe('Invoice Module', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let page: Page;
    let invoicePage: InvoicePage;
    let createInvoicePage: CreateInvoicePage;
    let searchWorkStream: SearchWorkStream;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('Invoice creation UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        invoicePage = new InvoicePage(page);
        createInvoicePage = new CreateInvoicePage(page);

        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        const testCaseID = testinfo.title;
        
        try {
            invoiceHeaderData = readExcelData(path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]), 'Headers', dataForTheTest[0]["ReferenceID"], dataForTheTest[0]["IDName"]);
            invoiceLineData = readExcelDataLines(path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]), 'Lines', dataForTheTest[0]["ReferenceID"], dataForTheTest[0]["IDName"]);

            await namedStep('Step 1 - Go to Oracle login page', page, testinfo, async () => {
                await loginPage.goto();
                await loginPage.login(process.env.USERID ?? '', process.env.PASSWORD ?? '');
                const screenshot = await page.screenshot();
                attachScreenshot('Step 1 - Go to Oracle login page', testinfo, screenshot);
            });

            await namedStep('Step 2 - Navigate to home', page, testinfo, async () => {
                await homePage.navigateToHome();
                const screenshot = await page.screenshot();
                attachScreenshot('Step 2 - Navigate to home', testinfo, screenshot);
            });

            await namedStep('Step 3 - Navigate to payable', page, testinfo, async () => {
                await homePage.navigateToPayable();
                const screenshot = await page.screenshot();
                attachScreenshot('Step 3 - Navigate to payable', testinfo, screenshot);
            });

            await namedStep('Step 4 - Navigate to Invoices', page, testinfo, async () => {
                await homePage.navigateToInvoices();
                const screenshot = await page.screenshot();
                attachScreenshot('Step 4 - Navigate to Invoices', testinfo, screenshot);
            });

            await namedStep('Step 5 - Navigate to Create Invoices', page, testinfo, async () => {
                await invoicePage.createInvoice();
                const screenshot = await page.screenshot();
                attachScreenshot('Step 5 - Navigate to Create Invoices', testinfo, screenshot);
            });

            await namedStep('Step 6 - fill the invoice header details', page, testinfo, async () => {
                await createInvoicePage.fillInvoiceDetails(invoiceHeaderData);
                const screenshot = await page.screenshot();
                attachScreenshot('Step 6 - fill the invoice header details', testinfo, screenshot);
            });

            await namedStep('Step 7 - Fill invoice Lines details', page, testinfo, async () => {
                await createInvoicePage.addLines(invoiceLineData);
                const screenshot = await page.screenshot();
                attachScreenshot('Step 7 - Fill invoice Lines details', testinfo, screenshot);
            });

            await namedStep('Step 8 - Validate the invoice details and save', page, testinfo, async () => {
                await createInvoicePage.validateAndSaveInvoice();
                const screenshot = await page.screenshot();
                attachScreenshot('Step 8 - Validate the invoice details and save', testinfo, screenshot);
            });
            
            // Increment ReferenceID only after successful test completion
            await incrementReferenceIdInTestManager(testCaseID);
        } catch (error) {
            console.error(`❌ [${testCaseID}] Test failed, ReferenceID will not be incremented:`, error.message);
            throw error; // Re-throw to mark test as failed
        }
    });

    run('Home Page validation UI', async ({ page }, testinfo: any) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);


        await test.step('Step 1 - Go to Oracle login page', async () => {
            await loginPage.goto();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 1 - Go to Oracle login page', testinfo, screenshot);
        });
        await test.step('Step 2 - Fill username and password', async () => {
            await loginPage.login(process.env.USERID ?? '', process.env.PASSWORD ?? '');
            const screenshot = await page.screenshot();
            attachScreenshot('Step 2 - Fill username and password', testinfo, screenshot);
        });
        await test.step('Step 3 - Navigate to home', async () => {
            await homePage.navigateToHome();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Navigate to home', testinfo, screenshot);
        });
    });
});
