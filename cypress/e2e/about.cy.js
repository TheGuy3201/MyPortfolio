describe('About Component', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should display About heading', () => {
    cy.contains('h1', 'About').should('be.visible');
  });

  it('should display dual panel container layout', () => {
    cy.get('.DualPanelContainer').should('be.visible');
  });

  it('should display profile image in left panel', () => {
    cy.get('.LeftPanel .SelfImg')
      .should('be.visible')
      .should('have.attr', 'src', '/res/Pic of me.jpg')
      .should('have.attr', 'alt', 'Professional photo of Joshua Desroches');
  });

  it('should have Open Resume button', () => {
    cy.get('.LeftPanel button')
      .contains('Open Resume')
      .should('be.visible');
  });

  it('should have Contact Me button with icon', () => {
    cy.get('.LeftPanel button')
      .contains('Contact Me')
      .should('be.visible')
      .within(() => {
        cy.get('img')
          .should('have.attr', 'alt', 'Contact icon - get in touch');
      });
  });

  it('should display description section', () => {
    cy.get('.Description').should('be.visible');
  });

  it('should display name in description', () => {
    cy.get('.Description')
      .should('contain', 'My name is Joshua Desroches');
  });

  it('should display education and skills information', () => {
    cy.get('.Description')
      .should('contain', '3rd year software engineering technology student')
      .should('contain', 'Centennial College')
      .should('contain', 'Game Programming');
  });

  it('should mention programming languages', () => {
    cy.get('.Description')
      .should('contain', 'C#')
      .should('contain', 'Java')
      .should('contain', 'JavaScript')
      .should('contain', 'HTML/CSS')
      .should('contain', 'C++')
      .should('contain', 'MySQL');
  });

  it('should open resume in new tab when Open Resume button is clicked', () => {
    // Mock window.open to prevent actual navigation
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    
    cy.get('.LeftPanel button')
      .contains('Open Resume')
      .click();
    
    cy.get('@windowOpen')
      .should('have.been.calledWith', '/res/Joshua Desroches Resume.pdf', '_blank');
  });

  it('should navigate to contact page when Contact Me button is clicked', () => {
    cy.get('.LeftPanel button')
      .contains('Contact Me')
      .click();
    
    cy.url().should('include', '/contact');
  });
});
