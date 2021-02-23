describe('Our first test', () => {
    it('Render the login component', () => {
      cy.visit('/');
      cy.findAllByText(/Sign in/i).should('be.visible');
    });
  
    it('Show invalid login', () => {
        cy.visit('/');
        cy.findByLabelText(/email/i).clear().type('bharatrose1@gmail.com');
        cy.findByLabelText(/password/i).clear().type('Chuck');
        cy.findByRole('button', { name: /sign in/i }).click();
        cy.findAllByText(/invalid login/i).should('be.visible');
        
    })

    it('After sucessfull login user will get redirected to board', () => {
        cy.visit('/');
        cy.findByLabelText(/email/i).clear().type('bharat@wealthface.com');
        cy.findByLabelText(/password/i).clear().type('abc');
        cy.findByRole('button', { name: /sign in/i }).click();
        cy.location('pathname').should('eq', '/')
        cy.url().should('eq', 'http://localhost:3000/#/dashboard');
        
    })

});