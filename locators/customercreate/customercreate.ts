

const customerInformation = {
  customerName: "xpath=//input[@id=//label[normalize-space(.)='Name']/@for]",
  dunsNumber: "xpath=//input[@id=//label[normalize-space(.)='D-U-N-S Number']/@for]",
  accountAddressSetting: "xpath=//input[@id=//label[normalize-space(.)='Account Address Set']/@for]",
  country:"//select[contains(translate(@*, 'COUNTRY', 'country'), 'country')]",
  city: "xpath=//input[@id=//label[normalize-space(.)='City']/@for]",
  postalCode: "xpath=//input[@id=//label[normalize-space(.)='Postal Code']/@for]",

  addressPurposeAddRow: "xpath=//div[h2[contains(text(),'Address Purposes')]]//following::img[contains(@title,'Add Row') or contains(@alt,'Add Row')]",

  purpose: "//table[@summary='Address Purposes']//tbody/tr[1]/td[7]//select",
  saveAndClose: "xpath=//button[contains(normalize-space(.), 'ave and Close')]",
  

};

export default customerInformation;


