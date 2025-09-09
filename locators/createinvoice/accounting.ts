const accountingLocatorX = {
  // accountingDate: "xpath=//label[@for][normalize-space(text()) = 'Accounting Date']/ancestor::td[1]/following-sibling::*//input[not(@type = 'hidden') and ((@type='text' and not(@role)) or @aria-label = 'mm/dd/yyyy' or @aria-label = 'd-m-yy')]",
    accountingDate: "xpath=//input[@id=//label[normalize-space(.)='Accounting Date']/@for]",
  
  xb: "", //accountingDate
};

export default accountingLocatorX;
