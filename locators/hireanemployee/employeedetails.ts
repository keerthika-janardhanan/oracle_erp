const employmentdetailsLocatorX = {
  businessUnit: "xpath=//span[@role='combobox' and @aria-label='Business Unit']//a",
  regularOrTemp: "xpath=//label[contains(text(),'Regular')]/../following-sibling::div//a",
  job: "xpath=//span[@role='combobox' and @aria-label='Job']//a",
  fullTime: "xpath=//input[@id=//label[normalize-space(.)='Full Time or Part Time']/@for]",
  businessTitle: "xpath=//input[@id=//label[normalize-space(.)='Business Title']/@for]",
  grade: "xpath=//span[@role='combobox' and @aria-label='Grade']//a",
  probationPeriodInput: "xpath=//input[@id=//label[normalize-space(.)='Probation Period']/@for]",
  probationPeriodDropdown: "xpath=//input[contains(@id,'pbuSel')]",
  probationEndDate: "xpath=//input[@id=//label[normalize-space(.)='Probation End Date']/@for]",
  department: "xpath=//span[@role='combobox' and @aria-label='Department']//a",
  location: "xpath=//span[@role='combobox' and @aria-label='Location']//a",
  submit: "xpath=//a[@role='button' and .//span[normalize-space(text())='Sub']]",
};

export default employmentdetailsLocatorX;


