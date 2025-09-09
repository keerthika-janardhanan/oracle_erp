/**
 * Test script to verify the ReferenceID increment functionality
 * This script allows you to test the increment function without running actual tests
 */

import { incrementReferenceIdInTestManager, previewReferenceIdIncrement, shouldIncrementReferenceId } from './util/referenceIdIncrementer.ts';

async function testReferenceIdIncrement() {
  console.log('🧪 Testing ReferenceID Increment Functionality\n');

  const testCases = [
    'TC_API_SUPPLIER_01',
    'Invoice creation UI', 
    'BulkAPISupplierCreation',
    'TC_API_SUPPLIER_001' // This should not be incremented
  ];

  for (const testCaseID of testCases) {
    console.log(`\n--- Testing: ${testCaseID} ---`);
    
    // Check if this test case should be incremented
    const shouldIncrement = shouldIncrementReferenceId(testCaseID);
    console.log(`Should increment: ${shouldIncrement}`);
    
    if (shouldIncrement) {
      try {
        // Preview the increment (without actually updating)
        const preview = await previewReferenceIdIncrement(testCaseID);
        if (preview) {
          console.log(`Current: ${preview.current}`);
          console.log(`Would become: ${preview.incremented}`);
          
          // Uncomment the line below to actually perform the increment
          // await incrementReferenceIdInTestManager(testCaseID);
          // console.log(`✅ Successfully incremented ReferenceID`);
        }
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
      }
    }
  }
}

// Uncomment the line below and run this script to test
// testReferenceIdIncrement().catch(console.error);

console.log(`
📝 Instructions:
1. Uncomment the last line in this file
2. Run: npx ts-node test-reference-increment.ts
3. Check the preview results
4. If satisfied, uncomment the actual increment line in the testReferenceIdIncrement function
5. Run again to perform actual increments

⚠️  Note: This is for testing purposes only. In normal operation, 
   the increment happens automatically after successful test completion.
`);
