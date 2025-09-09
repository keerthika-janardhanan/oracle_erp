import { test } from "./testSetup.ts";
import LoginPage from '../pages/login.page.ts';
import SearchWorkStream from '../pages/search.page.ts';
import CustomerDetails from "../pages/customercreate/customercreate.page.ts";
import CustomerManage from "../pages/customercreate/managecustomer.page.ts";
import EditContact from "../pages/customercreate/editcontact.page.ts";
import { getTestToRun, shouldRun, readXlsmDataDynamic } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';
import HomePage from "../pages/home.page.ts";
const path = require('path');

dotenv.config();
let customerData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
});

test.describe('Customer Creation flow', () => {
    let loginPage: LoginPage;
    let searchWorkStream: SearchWorkStream;
    let customerDetails: CustomerDetails;
    let customerManage: CustomerManage;
    let editContact: EditContact;
    let homePage: HomePage;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('Customer Creation UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        searchWorkStream = new SearchWorkStream(page);
        customerDetails = new CustomerDetails(page);
        customerManage = new CustomerManage(page);
        editContact = new EditContact(page);
        
       

        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        customerData = readXlsmDataDynamic(
            path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]),
            'Sheet1',
            dataForTheTest[0]["ReferenceID"],
            dataForTheTest[0]["IDName"]
        );

        console.log("dataForTheTest: ", dataForTheTest);
        console.log("Excel File Path: ", path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]));
        console.log("customerData: ", customerData);
        

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
        await namedStep('Step 3 - Search for "Create Customer" work stream', page, testinfo, async () => {
            await searchWorkStream.searchWrokStream("Create Customer");
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Search for "Create Customer" work stream', testinfo, screenshot);
        });

        // Fill in the Customer details
        await namedStep('Step 4 - Fill in the Customer details', page, testinfo, async () => {
            await customerDetails.fillCustomerDetails(customerData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 4 - Fill in the Customer details', testinfo, screenshot);
        });


        await namedStep('Step 5 - Navigate to Edit Account', page, testinfo, async () => {
            await customerManage.editAccount();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 5 - Navigate to Edit Account', testinfo, screenshot);
        });

        await namedStep('Step 6 - Fill in the Customer Payment details', page, testinfo, async () => {
            await customerManage.fillCustomerPaymentDetails(customerData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 6 - Fill in the Customer Payment details', testinfo, screenshot);
        });

        await namedStep('Step 7 - Fill in the Customer Communication details', page, testinfo, async () => {
            await customerManage.fillCommunicationDetails(customerData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 7 - Fill in the Customer Communication details', testinfo, screenshot);
        }); 

        await namedStep('Step 8 - Fill in the Customer Contact details', page, testinfo, async () => {
            await editContact.fillContactDetails(customerData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 8 - Fill in the Customer Contact details', testinfo, screenshot);
        }); 

        await namedStep('Step 9 - Save and close the Customer edit contact page', page, testinfo, async () => {
            await editContact.saveAndCloseEditContact();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 9 - Save and close the Customer edit contact page', testinfo, screenshot);
        });

        await namedStep('Step 10 - Save and close the Customer creation', page, testinfo, async () => {
            await customerManage.saveAndClose();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 10 - Save and close the Customer creation', testinfo, screenshot);
        });
        
    });
});
