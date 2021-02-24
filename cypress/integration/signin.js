describe('Render sign in component', () => {
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
});