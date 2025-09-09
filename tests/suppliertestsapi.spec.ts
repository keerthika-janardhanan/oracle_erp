import { test } from '@playwright/test';
import { getTestToRun, shouldRun } from '../util/csvFileManipulation.ts';
import generateSupplierPayload from '../businesscomponents/generatesupplierpayload.ts';
import { postSupplierToOracle } from '../businesscomponents/postsuppliertooracle.ts';
import { postSupplierFullFlow } from '../businesscomponents/postsupplierfullflow.ts';
import { incrementReferenceIdInTestManager } from '../util/referenceIdIncrementer.ts';
const path = require('path')

let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
})

test.describe('Supplier Creation flow API', () => {

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('TC_API_SUPPLIER_001', async ({ page }, testinfo) => {
        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        const testCaseID = testinfo.title;
        const testCaseDescription = dataForTheTest[0]["TestCaseDescription"];

        const datasheetName = dataForTheTest[0]["DatasheetName"]
        const referenceID = dataForTheTest[0]["ReferenceID"];
        const idName = dataForTheTest[0]["IDName"];


        const { filePath, fileBaseName } = generateSupplierPayload(testCaseID, datasheetName, referenceID, idName);

        await postSupplierToOracle(testCaseID, fileBaseName, filePath, testCaseDescription);
    });

    run('TC_API_SUPPLIER_01', async ({ page }, testinfo) => {
        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        const testCaseID = testinfo.title;
        const testCaseDescription = dataForTheTest[0]["TestCaseDescription"];

        const datasheetName = dataForTheTest[0]["DatasheetName"]
        const referenceID = dataForTheTest[0]["ReferenceID"];
        const idName = dataForTheTest[0]["IDName"];

        const { filePath, fileBaseName } = generateSupplierPayload(testCaseID, datasheetName, referenceID, idName);
        await postSupplierFullFlow(testCaseID, fileBaseName, filePath, testCaseDescription);
        
        // Increment ReferenceID regardless of test result
        await incrementReferenceIdInTestManager(testCaseID);
    });

    run('BulkAPISupplierCreation', async ({ page }, testinfo) => {
        let dataForTheTest = executionList.filter(r => r["TestCaseID"] === testinfo.title);
        const testCaseID = testinfo.title;
        const testCaseDescription = dataForTheTest[0]["TestCaseDescription"];

        const datasheetName = dataForTheTest[0]["DatasheetName"]
        let referenceID = dataForTheTest[0]["ReferenceID"];
        const idName = dataForTheTest[0]["IDName"];

        if (referenceID.includes(",")) {
            let supplierID = referenceID.split(",");
            // Use for...of loop instead of forEach to properly handle async operations
            for (const id of supplierID) {
                const { filePath, fileBaseName } = generateSupplierPayload(testCaseID, datasheetName, id, idName);
                await postSupplierFullFlow(testCaseID, fileBaseName, filePath, testCaseDescription);
            }
        }
        
        // Increment ReferenceID regardless of test result
        await incrementReferenceIdInTestManager(testCaseID);
    });

});
