import { test } from "./testSetup.ts";
import LoginPage from '../pages/login.page.ts';
import SearchWorkStream from '../pages/search.page.ts';
import PersonalDetailsSection from "../pages/supplierregister/supplierdetails.page.ts";
import { getTestToRun, shouldRun, readXlsmDataDynamic } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';
import HomePage from "../pages/home.page.ts";
const path = require('path');

dotenv.config();
let supplierData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe('Supplier Creation flow', () => {
    let loginPage: LoginPage;
    let searchWorkStream: SearchWorkStream;
    let SupplierDetailsSection: PersonalDetailsSection;
    let homePage: HomePage;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('Register Supplier UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        searchWorkStream = new SearchWorkStream(page);
        SupplierDetailsSection = new PersonalDetailsSection(page);

        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        supplierData = readXlsmDataDynamic(
            path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]),
            'POZ_SUPPLIERS_INT || stage4_Header',
            dataForTheTest[0]["ReferenceID"],
            dataForTheTest[0]["IDName"]
        );

        console.log("dataForTheTest: ", dataForTheTest);
        console.log("Excel File Path: ", path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]));
        console.log("supplierData: ", supplierData);
        console.log("Email:", supplierData['Email']);

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

        // Searching for the "Register Supplier" work stream
        await namedStep('Step 3 - Search for "Register Supplier" work stream', page, testinfo, async () => {
            await searchWorkStream.searchWrokStream("Register Supplier");
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Search for "Register Supplier" work stream', testinfo, screenshot);
        });

        // Fill in the supplier company details
        await namedStep('Step 4 - Fill in the supplier company details', page, testinfo, async () => {
            await SupplierDetailsSection.fillCompanyDetails(supplierData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 4 - Fill in the supplier company details', testinfo, screenshot);
        });

        // Add contact details
        await namedStep('Step 5 - Add contact details', page, testinfo, async () => {
            await SupplierDetailsSection.addContactDetails(supplierData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 5 - Add contact details', testinfo, screenshot);
        });

        // Add address details
        await namedStep('Step 6 - Add address details', page, testinfo, async () => {
            await SupplierDetailsSection.addAddressDetails(supplierData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 6 - Add address details', testinfo, screenshot);
        });

        //Click None of the classifications are applicable
        await namedStep('Step 7 - Add business classifications and product categories', page, testinfo, async () => {
            await SupplierDetailsSection.addbusinessClassifications();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 7 - Add business classifications and product categories', testinfo, screenshot);
        });

        // Add products and services categories
        await namedStep('Step 8 - Add products and services categories', page, testinfo, async () => {
            await SupplierDetailsSection.addProductsandServicesCategories(supplierData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 8 - Add products and services categories', testinfo, screenshot);
        });
    });
});
