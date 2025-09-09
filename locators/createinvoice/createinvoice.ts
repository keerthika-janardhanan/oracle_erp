const invoiceLocatorX = {
  searchBusinessUnit: "xpath=//a[contains(@id, 'lovIconId') and @title='Search: Business Unit']",
  supplierNumber: "xpath=//*[label[normalize-space(text())='Supplier Number']]/following-sibling::td[1]",
  number: "xpath=//label[@for][normalize-space(text()) = 'Number']/ancestor::td[1]/following-sibling::*//input[not(@type = 'hidden') and ((@type='text' and not(@role)) or @aria-label = 'd-m-yy')]",
  amount: "xpath=//input[@aria-label='Amount' and not(@type='hidden') and ((@type='text' and not(@role)) or @aria-label = 'd-m-yy')]",
  description: "xpath=//label[text()='Description']/../following-sibling::td/textarea",
  save: "xpath=//*[normalize-space(text()) = 'Save']/ancestor::td[1]//a[@role = 'button'][not(@aria-expanded) and not(@aria-label) and not(@tabindex)]",
};

export default invoiceLocatorX;
