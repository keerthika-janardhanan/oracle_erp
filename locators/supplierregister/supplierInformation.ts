const supplierInformation = {
  registerSupplierLink: "xpath=//span[text()='Register Supplier']",
  companyField: "xpath=//input[@id=//label[normalize-space(.)='Company']/@for]",
  requestReasonDropdown: "//label[normalize-space(text())='Request Reason']/following::select[1]",
  newSupplySourceOption: "xpath=//select//option[normalize-space(text())='New Supply Source']",
  taxOrganizationTypeDropdown: "//label[normalize-space(text())='Tax Organization Type']/following::select[1]",
  corporationOption: "xpath=//select//option[normalize-space(text())='Corporation']",
  supplierTypeDropdown: "//label[normalize-space(text())='Supplier Type']/following::select[1]",
  supplierOption: "xpath=//select//option[normalize-space(text())='Supplier']",
  dunsNumberField: "xpath=//input[@id=//label[normalize-space(.)='D-U-N-S Number']/@for]",
  taxCountryField: "xpath=//input[@id=//label[normalize-space(.)='Tax Country']/@for]",

  // Contact
  contactCreateIcon: "xpath=//h2[normalize-space(.)='Contacts']/ancestor::div[contains(@class,'x6v')]//a[.//img[contains(@title,'Create')] or @title='Create']",
  firstNameField: "xpath=//input[@id=//label[normalize-space(.)='First Name']/@for]",
  lastNameField: "xpath=//input[@id=//label[normalize-space(.)='Last Name']/@for]",
  emailField: "xpath=//input[@id=//label[normalize-space(.)='Email']/@for]",
  createUserAccountCheckbox: "xpath=//input[@id=//label[normalize-space(.)='Create user account']/@for]",
  roles: "xpath=//*[text()='Roles']",
  contactokButton: "xpath=(//button[contains(normalize-space(.), 'OK')])[1]",



  // Address
  addressCreateIcon: "xpath=//h2[normalize-space(.)='Addresses']/ancestor::div[contains(@class,'x6v')]//a[.//img[contains(@title,'Create')] or @title='Create']",
  addressNameField: "xpath=//input[@id=//label[normalize-space(.)='Address Name']/@for]",
  countryField: "xpath=//input[@id=//label[normalize-space(.)='Country']/@for]",
  cityField: "xpath=//input[@id=//label[normalize-space(.)='City']/@for]",
  aaronsburgOption: "xpath=//*[text()='Aaronsburg, Centre, PA']",
  orderingCheckbox: "xpath=//input[@id=//label[normalize-space(.)='Ordering']/@for]",
  remitToCheckbox: "xpath=//input[@id=//label[normalize-space(.)='Remit to']/@for]",
  okButton: "xpath=(//button[contains(normalize-space(.), 'OK')])[2]",

  //Products and Services
  productsAndServicesActionsButton: "xpath=(//h2[normalize-space(.)='Products and Services Categories']   /ancestor::*[contains(@class,'x6v') or contains(@class,'xed')]   //a[normalize-space(.)='Actions' or @aria-label='Actions'])[1]",
  selctandAdd: "xpath=//h2[normalize-space(.)='Products and Services Categories']/ancestor::*[contains(@class,'x6v') or contains(@class,'xed')]//img[@title='Select and Add' or @alt='Select and Add']",
  checkboxExpenseItem: "xpath=//tr[td[2]//span[normalize-space(text())='Expense Items']]/td[1]//input[@type='checkbox']",
  checkboxNewHireSupplies: "xpath=//tr[td[2]//span[normalize-space(text())='New Hire Supplies']]/td[1]//input[@type='checkbox']",

  businessClassifications: "xpath=//label[normalize-space(text())='None of the classifications are applicable']/preceding-sibling::input[@type='checkbox']",
  productOkButton: "xpath=(//button[contains(normalize-space(.), 'OK')])[3]",
  registerbutton: "xpath=//a[@role='button' and .//span[normalize-space(text())='Register']]"
};
export default supplierInformation;