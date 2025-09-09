const receiptLocators = {
    // Navigation Menu
    homeIcon: "xpath=//*[@aria-label='Home']",
    receivablesLink: "xpath=//a[text()='Receivables']",
    accountsReceivableLink: "xpath=//a[text()='Accounts Receivable']",
    
    // Tasks and Receipt Creation
    tasksDiv: "xpath=//div[@title='Tasks']",
    createReceiptLink: "xpath=//a[text()='Create Receipt']",
    
    // Receipt Form Fields
    businessUnitInput: "xpath=//input[@id=//label[normalize-space(.)='Business Unit']/@for]",
    receiptMethodInput: "xpath=//input[@id=//label[normalize-space(.)='Receipt Method']/@for]",
    receiptNumberInput: "xpath=//input[@id=//label[normalize-space(.)='Receipt Number']/@for]",
    enteredAmountInput: "xpath=//input[@id=//label[normalize-space(.)='Entered Amount']/@for]",
    
    // Remittance Bank Fields
    remittanceBankNameInput: "xpath=(//a[@title='Search: Name'])[1]",
    remittanceBankBranchInput: "xpath=(//a[@title='Search: Branch'])[1]",
    remittanceBankAccountInput: "xpath=(//a[@title='Search: Account'])[1]",

    // Customer Name Field
    customerNameInput: "xpath=(//input[@id=//label[normalize-space(.)='Name']/@for])[2]",
    
    // Customer Search Elements
    customerSearchButton: "xpath=(//label[normalize-space(.)='Name']/following::a[contains(@title, 'Search: Name')][1])[2]",
    searchButton: "xpath=//button[text()='Search']",
    firstSearchResult: "xpath=//th[contains(., 'Name')]/ancestor::div[contains(@class, 'xel')]//table[contains(@class, 'x1hg')]//tbody/tr[1]",
    okButton: "xpath=(//button[text()='OK'])[1]",
    
    // Remittance Reference Detail Section
    addRowButton: "xpath=//div[.//h1[normalize-space(text())='Remittance Reference Detail']]//img[@title='Add Row' or @alt='Add Row']",
    invoiceReferenceInput: "xpath=//*[@title='InvoiceReference']//input",
    
    // Action Buttons
    submitAndCreateAnotherButton: "xpath=//a[@title='Submit and Create Another']",
    submitAndAutoApplyButton: "xpath=//*[text()='Submit and AutoApply Now']",
    saveAndCloseButton: "xpath=//button[contains(normalize-space(.), 'ave and Close')]"
};

export default receiptLocators;
