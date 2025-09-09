const createInvoiceMoreFieldsLocatorX = {
  accounting: "xpath=(//a[normalize-space(text()) = 'Accounting' and not(@role='button') and @href])[1]",
  expandLines: "xpath=//a[@aria-label='Expand Lines']",
  invoiceActions: "xpath=//a[normalize-space(text()) = 'Invoice Actions' and not(@role='button') and @href]",
  validate: "xpath=//*[text() = 'Validate']",
  validated: "xpath=//a[@accesskey='Q']",
  // validated: "xpath=//*[text()='Validated']",
};

export default createInvoiceMoreFieldsLocatorX;
