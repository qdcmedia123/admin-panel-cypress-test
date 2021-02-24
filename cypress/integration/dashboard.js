before(() => {
  cy.visit("/");
  cy.findByLabelText(/email/i).clear().type("bharat@wealthface.com");
  cy.findByLabelText(/password/i)
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

it("Click to the leads menu and then click to LeadsALL ", () => {
  cy.get(".navbar-nav li:first").click();
  cy.get('a[href*="/#/leads/list/all"]').click();
  
});
