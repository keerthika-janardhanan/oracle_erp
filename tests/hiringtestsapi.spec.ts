import { test } from '@playwright/test';
import { getTestToRun, shouldRun } from '../util/csvFileManipulation.ts';
import { generateHCMNewHirePayload } from '../businesscomponents/generatehcmnewhirepayload.ts';
import { postNewHireToOracle } from '../businesscomponents/postnewhiretooracle.ts';
const path = require('path')

let executionList;

test.beforeAll(() => {
    executionList = getTestToRun(path.join(__dirname, '../testmanager.xlsx'));
})

test.describe('Hiring an employee Module API', () => {

    const run = (name: string, fn: ({ page }, testinfo: any) => Promise<void>) =>
        (shouldRun(name) ? test : test.skip)(name, fn);

    run('TC_API_HCM_NewHire_01', async ({ page }, testinfo) => {
        const testCaseID = testinfo.title;
      const testCaseDescription = executionList.filter(r => r["TestCaseID"] === testinfo.title)[0]["TestCaseDescription"];
        const { filePath, fileBaseName } = generateHCMNewHirePayload(testCaseID);

        await postNewHireToOracle(filePath, fileBaseName, testCaseID, testCaseDescription);
    });

});