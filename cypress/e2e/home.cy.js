describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to Joshua Desroches page').should('be.visible');
  });

  it('should display profile image with correct alt text', () => {
    cy.get('img.HomeSelfImg')
      .should('be.visible')
      .should('have.attr', 'src', '/res/Pic of me.jpg')
      .should('have.attr', 'alt', 'Picture of Joshua D');
  });

  it('should display mission statement', () => {
    cy.get('.missionStatement')
      .should('be.visible')
      .should('contain', 'I strive to bring innovative ideas to life');
  });

  it('should display redirect text', () => {
    cy.get('.RedirectText')
      .should('be.visible')
      .should('contain', 'To learn more about me, click either buttons below');
  });

  it('should have About Me button with correct text and icon', () => {
    cy.get('.RedirectButton')
      .contains('About Me')
      .should('be.visible')
      .within(() => {
        cy.get('img.RedirectIcon')
          .should('have.attr', 'alt', 'Person icon - learn about me');
      });
  });

  it('should have My Projects button with correct text and icon', () => {
    cy.get('.RedirectButton')
      .contains('My Projects')
      .should('be.visible')
      .within(() => {
        cy.get('img.RedirectIcon')
          .should('have.attr', 'alt', 'Projects icon - view my work');
      });
  });

  it('should navigate to about page when About Me button is clicked', () => {
    cy.get('.RedirectButton').contains('About Me').click();
    cy.url().should('include', '/about');
  });

  it('should navigate to projects page when My Projects button is clicked', () => {
    cy.get('.RedirectButton').contains('My Projects').click();
    cy.url().should('include', '/project');
  });

  it('should navigate to about page when profile image is clicked', () => {
    cy.get('img.HomeSelfImg').click();
    cy.url().should('include', '/about');
  });
});
