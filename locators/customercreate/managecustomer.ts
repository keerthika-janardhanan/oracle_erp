const customerManageLocators = {
    accountNumber: "xpath=//table[@summary='Accounts']//td[3]//a[1]//span",
    receiptmethodAddRow: "xpath=//div[.//*[text()='Receipt Methods']]//img[@title='Add Row' or @alt='Add Row']",
    receiptMethod: "xpath=//input[contains(@id, 'receiptMethod') or contains(@name, 'receiptMethod')]",
    bankAccount: "xpath=(//*[text()='Bank Accounts'])[1]",
    createBankAccount: "xpath=//a[@title='Create a Bank Account and Assign It to This Payer']",
    bankCountry: "xpath=//input[@id=//label[normalize-space(.)='Country']/@for]",
    // bankAccountNumber: "xpath=(//input[@id=//label[normalize-space(.)='Account Number']/@for])[2]",
    bankAccountNumber:"xpath=(//label[contains(normalize-space(.), 'Account Number')]/ancestor::td/following-sibling::td//input[@type='text'])[2]",
    bankName: "xpath=//input[@id=//label[normalize-space(.)='Bank Name']/@for]",
    bankBranch: "xpath=//input[@id=//label[normalize-space(.)='Branch']/@for]",
    bankSaveandClose: "xpath=(//button[contains(normalize-space(.), 'ave and Close')])[2]",

    communication: "xpath=(//*[text()='Communication'])[1]",
    EditContact: "xpath=//button[contains(normalize-space(.), 'Edit Contact')]",

    saveAndClose: "xpath=//button[contains(normalize-space(.), 'ave and Close')]",
    done: "xpath=//button[contains(normalize-space(.), 'Done')]",

};

export default customerManageLocators;