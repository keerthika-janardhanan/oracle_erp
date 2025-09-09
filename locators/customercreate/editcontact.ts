const editContactLocators = {

    createContact: "xpath=(//*[@title='Create Contact'])[2]",
    firstname: "xpath=(//input[@id=//label[normalize-space(.)='First Name']/@for])[2]",
    Lastname: "xpath=(//input[@id=//label[normalize-space(.)='Last Name']/@for])[2]",
    okButton: "xpath=(//button[contains(normalize-space(.), 'OK')])[1]",

    responsibilityfirstName: "xpath=(//input[@id=//label[normalize-space(.)='First Name']/@for])[1]",
    responsibilityLastName: "xpath=(//input[@id=//label[normalize-space(.)='Last Name']/@for])[1]",

    contactPointCreate: "xpath=(//div[.//h2[normalize-space(text())='Contact Points']]//img[@title='Create' or @alt='Create'])[1]",
    phone: "xpath=//input[@id=//label[normalize-space(.)='Phone']/@for]",
    contactPointOkButton: "xpath=(//button[contains(normalize-space(.), 'OK')])[2]",


    saveAndClose: "xpath=//button[contains(normalize-space(.), 'ave and Close')]",

};

export default editContactLocators;