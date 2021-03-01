const { SelectPanel } = require("react-multi-select-component");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

before(() => {
  cy.visit("/");
  cy.get('input[name="email"]').clear().type("bharat@wealthface.com");
  cy.get('input[name="password"]')
    .clear()
    .type("abc");
  cy.findByRole("button", { name: /sign in/i }).click();
  cy.location("pathname").should("eq", "/");
  cy.url().should("eq", "http://localhost:3000/#/dashboard");
});

beforeEach(() => {
  cy.restoreLocalStorage();
});

afterEach(() => {
  cy.saveLocalStorage();
});

it("After sucessfull login user will get redirected to dashboard, and show components", () => {
  cy.findAllByText(/PAGE VISIT/i).should("be.visible");
  cy.findAllByText(/user sign up/i).should("be.visible");
  cy.findAllByText(/user on board/i).should("be.visible");
  cy.findAllByText(/Bounce Rate/i).should("be.visible");
});

it("Click to the leads menu and then click to LeadsALL, uncheck all data ", () => {
  cy.get(".navbar-nav li:first").click();
  cy.get('a[href*="/#/leads/list/all"]').click();
  sleep(5000);
  cy.get('input[type="checkbox"]').uncheck() 
  cy.findAllByText(/Unable to find record/i).should("be.visible");
});

it("check the approved status and only show approved data", () => {
  cy.get(".navbar-nav li:first").click();
  cy.get('a[href*="/#/leads/list/all"]').click();
  sleep(5000);
  cy.get('input[type="checkbox"]').uncheck() 
  cy.findAllByText(/Unable to find record/i).should("be.visible");
  cy.get('input[name="filter_checkbox0"]').check() 
  cy.get('table').contains('td', 'rejected').should('be.visible');

});


