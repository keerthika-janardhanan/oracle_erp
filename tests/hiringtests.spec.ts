import { test } from "./testSetup.ts";
import LoginPage from '../pages/login.page.ts';
import SearchWorkStream from '../pages/search.page.ts';
import ManageHireeOptions from "../pages/managehiring.page.ts";
import WhenAnDWhySection from "../pages/hireanemployee/whenandwhy.page.ts";
import PersonalDetailsSection from "../pages/hireanemployee/personaldetails.page.ts";
import CommunicationSection from "../pages/hireanemployee/communication.page.ts";
import EmploymentDetailsSection from "../pages/hireanemployee/employmentdetails.page.ts";
import { getTestToRun, readExcelData, shouldRun } from "../util/csvFileManipulation.ts";
import { attachScreenshot, namedStep } from '../util/screenshot.ts';
import * as dotenv from 'dotenv';

const path = require('path');

dotenv.config();
let hireData;
let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
})

test.describe('Hire an employee flow', () => {
    let loginPage: LoginPage;
    let searchWorkStream: SearchWorkStream;
    let manageHireeOptions: ManageHireeOptions;
    let whenAnDWhySection: WhenAnDWhySection;
    let personalDetailsSection: PersonalDetailsSection;
    let communicationSection: CommunicationSection;
    let employmentDetailsSection: EmploymentDetailsSection;

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);


    run('Hire an employee UI', async ({ page }, testinfo) => {
        loginPage = new LoginPage(page);
        searchWorkStream = new SearchWorkStream(page);
        manageHireeOptions = new ManageHireeOptions(page);
        whenAnDWhySection = new WhenAnDWhySection(page);
        personalDetailsSection = new PersonalDetailsSection(page);
        communicationSection = new CommunicationSection(page);
        employmentDetailsSection = new EmploymentDetailsSection(page);
            
        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        hireData = readExcelData(
            path.join(__dirname, '../data/' + dataForTheTest[0]["DatasheetName"]),
            'hire',
            dataForTheTest[0]["ReferenceID"],
            dataForTheTest[0]["IDName"]
        );
    
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
    
        await namedStep('Step 3 - Search for "Hire an Employee" work stream', page, testinfo, async () => {
            await searchWorkStream.searchWrokStream("Hire an Employee");
            const screenshot = await page.screenshot();
            attachScreenshot('Step 3 - Search for "Hire an employee" work stream', testinfo, screenshot);
        });
    
        await namedStep('Step 4 - Select "Communication Info" option', page, testinfo, async () => {
            await manageHireeOptions.selectOptions("Communication Info");
            const screenshot = await page.screenshot();
            attachScreenshot('Step 4 - Select "Communication Info" option', testinfo, screenshot);
        });
    
        await namedStep('Step 5 - Fill Hire Information', page, testinfo, async () => {
            await whenAnDWhySection.fillHireInfo(hireData);
            await whenAnDWhySection.contineToOtherSection();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 5 - Fill Hire Information', testinfo, screenshot);
        });
    
        await namedStep('Step 6 - Fill Personal Details', page, testinfo, async () => {
            await personalDetailsSection.fillPersonalDetails(hireData);
            await whenAnDWhySection.contineToOtherSection();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 6 - Fill Personal Details', testinfo, screenshot);
        });
    
        await namedStep('Step 7 - Fill Communication Details', page, testinfo, async () => {
            await communicationSection.fillCommunicationDetails(hireData);
            await whenAnDWhySection.contineToOtherSection();
            const screenshot = await page.screenshot();
            attachScreenshot('Step 7 - Fill Communication Details', testinfo, screenshot);
        });
    
        await namedStep('Step 8 - Fill Employment Details', page, testinfo, async () => {
            await employmentDetailsSection.fillEmploymentDetails(hireData);
            const screenshot = await page.screenshot();
            attachScreenshot('Step 8 - Fill Employment Details', testinfo, screenshot);
        });
    });

});
