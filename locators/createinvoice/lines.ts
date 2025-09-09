const linesLocatorX = {
    addRow: "xpath=//*[normalize-space(text()) = 'Add Row']/ancestor::td[1]//a[@role = 'button'][not(@aria-expanded) and not(@aria-label) and not(@tabindex)]",
    amount: "",
    lineAmounts: "//table[@summary='Invoice Lines']/tbody/tr[1]/td[4]",
    lineDistributionCont: "//table[@summary='Invoice Lines']/tbody/tr[1]/td[5]/div/table/tbody/tr[1]/td[2]",
    distributionContribution: "//input[@aria-label='Distribution Combination ID']",
};

export default linesLocatorX;
