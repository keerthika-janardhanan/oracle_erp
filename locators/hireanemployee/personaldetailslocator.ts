const personaldetailsLocatorX = {
  title: "xpath=//input[@id=//label[normalize-space(.)='Title']/@for]",
  lastname: "xpath=//input[@id=//label[normalize-space(.)='Family Name']/@for]",
  firstname: "xpath=//input[@id=//label[normalize-space(.)='First Name']/@for]",
  gender: "xpath=//input[@id=//label[normalize-space(.)='Gender']/@for]",
  correspondencelanguage: "xpath=//input[@id=//label[normalize-space(.)='Correspondence Language']/@for]",
  dateofbirth: "xpath=//input[@id=//label[normalize-space(.)='Date of Birth']/@for]",
  country: "xpath=//input[@id=//label[normalize-space(.)='Country']/@for]",
  nationalidtype: "xpath=//input[@id=//label[normalize-space(.)='National ID Type']/@for]",
  nationalid: "xpath=//input[@id=//label[normalize-space(.)='National ID']/@for]",
  NoMatchAddPerson: "xpath=//input[@type='radio' and starts-with(@id, '_FOpt1') and contains(@id, 'crNewRd')]",
  continue: "xpath=//button[contains(normalize-space(.), 'Continue')]"
};

export default personaldetailsLocatorX;
