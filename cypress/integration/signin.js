describe('Render sign in component', () => {
    it('Render the login component', () => {
      cy.visit('/');
      cy.findAllByText(/Sign in/i).should('be.visible');
    });

    it('Show invalid login', () => {
        cy.visit('/');
        cy.get('input[name="email"]').clear().type('bharatrose1@gmail.com');
        cy.get('input[name="password"]').clear().type('Chuck');
        cy.findByRole('button', { name: /sign in/i }).click();
        cy.findAllByText(/invalid login/i).should('be.visible');
        
    })
});