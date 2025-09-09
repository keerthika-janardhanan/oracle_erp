const invoicelocatorX = {
  createInvoice :"xpath=//button[@title='Create Invoice' and text()='Create']",
  Task: "xpath=//div[@title='Tasks']",
  manageInvoice: "xpath=//a[text()='Manage Invoices']",
  invoiceTable: "xpath=//table[@summary='Recently Entered Invoices']//tr//td[2]"
};

export default invoicelocatorX;
