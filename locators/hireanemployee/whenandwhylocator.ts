const whenAndWhyLocatorX = {
  hireDate: "xpath=//input[@id=//label[normalize-space(.)='When is the employee hire date?']/@for]",
  legalEmployer: "xpath=//input[@id=//label[normalize-space(.)='Legal Employer']/@for]", // Legal Employer
  legalEmployerText: "xpath=//div[text()='legalEmployerText']", // Legal Employer text
  wayToHire: "xpath=//input[contains(@aria-label,'way to hire an employee?')]", // What's the way to hire an employee?
  whyHiring: "xpath=//input[@id=//label[normalize-space(.)='Why are you hiring an employee?']/@for]", // Why are you hiring an employee?
  continue: "xpath=//button[contains(normalize-space(.), 'Continue')]", // Continue button
};

export default whenAndWhyLocatorX;
