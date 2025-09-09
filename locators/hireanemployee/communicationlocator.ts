const communicationLocatorX = {
  
  phoneType :"xpath=(//input[@id=//label[normalize-space(.)='Type']/@for])[1]",
  phoneNumber :"xpath=//input[@id=//label[normalize-space(.)='Number']/@for]",
  emailType : "xpath=(//input[@id=//label[normalize-space(.)='Type']/@for])[2]",
  email : "xpath=//input[@id=//label[normalize-space(.)='Email']/@for]",
    
};

export default communicationLocatorX;
