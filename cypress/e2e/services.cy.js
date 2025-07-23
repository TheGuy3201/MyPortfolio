describe('Services Component', () => {
  beforeEach(() => {
    // Mock the API response for services
    cy.intercept('GET', '**/api/services*', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          title: 'Web Development',
          description: 'Full-stack web development services',
          details: 'Detailed information about web development services',
          icon: '/res/services/frontend.svg'
        },
        {
          _id: '2',
          title: 'Mobile Development',
          description: 'iOS and Android app development',
          details: 'Comprehensive mobile application development',
          icon: '/res/services/programming.svg'
        },
        {
          _id: '3',
          title: 'UI/UX Design',
          description: 'User interface and experience design',
          details: 'Creative design solutions for better user experiences',
          icon: '/res/services/design.svg'
        }
      ]
    }).as('getServices');

    cy.visit('/services');
  });

  it('should display services page heading', () => {
    cy.contains('h1', 'Services').should('be.visible');
  });

  it('should show loading state initially', () => {
    // Intercept with delay to see loading state
    cy.intercept('GET', '**/api/services*', {
      delay: 1000,
      statusCode: 200,
      body: []
    }).as('getServicesDelayed');

    cy.reload();
    cy.get('.loading, .spinner').should('be.visible');
  });

  it('should load and display services', () => {
    cy.wait('@getServices');
    cy.get('.ServicesPanel, .services-container').should('be.visible');
    cy.get('.service-card, .service-item').should('have.length', 3);
  });

  it('should display service titles', () => {
    cy.wait('@getServices');
    cy.contains('Web Development').should('be.visible');
    cy.contains('Mobile Development').should('be.visible');
    cy.contains('UI/UX Design').should('be.visible');
  });

  it('should display service descriptions', () => {
    cy.wait('@getServices');
    cy.contains('Full-stack web development services').should('be.visible');
    cy.contains('iOS and Android app development').should('be.visible');
    cy.contains('User interface and experience design').should('be.visible');
  });

  it('should display service icons with proper alt text', () => {
    cy.wait('@getServices');
    cy.get('.service-card img, .service-item img')
      .should('have.length.at.least', 1)
      .each(($img) => {
        cy.wrap($img)
          .should('be.visible')
          .should('have.attr', 'alt')
          .and('not.be.empty');
      });
  });

  it('should support card flipping functionality', () => {
    cy.wait('@getServices');
    
    // Click on first service card to flip it
    cy.get('.service-card, .service-item').first().click();
    
    // Should show flipped state with details
    cy.get('.flipped, .service-details').should('be.visible');
    cy.contains('Detailed information about web development services').should('be.visible');
  });

  it('should flip back when clicked again', () => {
    cy.wait('@getServices');
    
    // Flip the card
    cy.get('.service-card, .service-item').first().click();
    cy.get('.flipped, .service-details').should('be.visible');
    
    // Flip it back
    cy.get('.service-card, .service-item').first().click();
    cy.get('.flipped, .service-details').should('not.exist');
  });

  it('should handle multiple card flips independently', () => {
    cy.wait('@getServices');
    
    // Flip first card
    cy.get('.service-card, .service-item').eq(0).click();
    cy.get('.flipped, .service-details').should('have.length', 1);
    
    // Flip second card
    cy.get('.service-card, .service-item').eq(1).click();
    cy.get('.flipped, .service-details').should('have.length', 2);
    
    // Flip first card back
    cy.get('.service-card, .service-item').eq(0).click();
    cy.get('.flipped, .service-details').should('have.length', 1);
  });

  it('should display service details on flip', () => {
    cy.wait('@getServices');
    
    cy.get('.service-card, .service-item').eq(1).click();
    cy.contains('Comprehensive mobile application development').should('be.visible');
    
    cy.get('.service-card, .service-item').eq(2).click();
    cy.contains('Creative design solutions for better user experiences').should('be.visible');
  });

  it('should handle empty services list', () => {
    cy.intercept('GET', '**/api/services*', {
      statusCode: 200,
      body: []
    }).as('getEmptyServices');

    cy.reload();
    cy.wait('@getEmptyServices');
    
    cy.get('.no-services, .empty-state')
      .should('be.visible')
      .or('not.contain', '.service-card');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '**/api/services*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getServicesError');

    cy.reload();
    cy.wait('@getServicesError');
    
    cy.get('.error-message, .error')
      .should('be.visible')
      .should('contain.text', 'Failed to fetch services');
  });

  it('should be responsive on different screen sizes', () => {
    cy.wait('@getServices');
    
    // Mobile viewport
    cy.viewport(375, 667);
    cy.get('.ServicesPanel, .services-container').should('be.visible');
    cy.get('.service-card, .service-item').should('be.visible');
    
    // Tablet viewport
    cy.viewport(768, 1024);
    cy.get('.ServicesPanel, .services-container').should('be.visible');
    
    // Desktop viewport
    cy.viewport(1200, 800);
    cy.get('.ServicesPanel, .services-container').should('be.visible');
  });

  it('should support keyboard navigation for accessibility', () => {
    cy.wait('@getServices');
    
    // Tab through service cards
    cy.get('body').tab();
    cy.focused().should('have.class', 'service-card').or('have.class', 'service-item');
    
    // Enter key should flip the card
    cy.focused().type('{enter}');
    cy.get('.flipped, .service-details').should('be.visible');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    cy.wait('@getServices');
    
    cy.get('.service-card, .service-item')
      .should('have.attr', 'role', 'button')
      .or('have.attr', 'tabindex', '0')
      .or('have.attr', 'aria-label');
  });
});
