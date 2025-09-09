const arInvoiceLocators = {
    // Navigation Menu
    homeIcon: "xpath=//*[@aria-label='Home']",
    receivablesLink: "xpath=//a[text()='Receivables']",
    billingLink: "xpath=//a[text()='Billing']",
    
    // Tasks and Transaction Creation
    tasksDiv: "xpath=//div[@title='Tasks']",
    createTransactionLink: "xpath=//a[text()='Create Transaction']",
    
    // Transaction Header Fields
    businessUnitInput: "xpath=//input[@id=//label[normalize-space(.)='Business Unit']/@for]",
    billToNameInput: "xpath=//input[@id=//label[normalize-space(.)='Bill-to Name']/@for]",
    paymentTermsInput: "xpath=//input[@id=//label[normalize-space(.)='Payment Terms']/@for]",
    
    // Line Items
    descriptionInput: "xpath=(//input[contains(@id, 'descriptionId')])[1]",
    uomInput: "xpath=(//input[contains(@id, 'uOMId')])[1]",
    quantityInput: "xpath=(//input[contains(@id, 'quantity')])[1]",
    sellingPriceInput: "xpath=(//input[contains(@id, 'sellingPrice')])[1]",
    
    // Actions
    saveButton: "xpath=//span[text()='Save']",
    popAreaTd: "xpath=(//td[contains(@id, 'popArea')])[2]",
    completeAndReviewTd: "xpath=//td[text()='Complete and Review']",
    
    // Status Check and Transaction Number
    statusLink: "xpath=(//label[normalize-space(text())='Status']/ancestor::td/following-sibling::td//a)[1]",
    transactionNumberSpan: "xpath=(//label[normalize-space(text())='Transaction Number']/ancestor::td/following-sibling::td//span[contains(@id, '::content')])[1]",
    
    // Status Elements
    incompleteStatus: "xpath=//td[text()='Incomplete']",
    completeStatus: "xpath=//a[text()='Complete']"
};

export default arInvoiceLocators;