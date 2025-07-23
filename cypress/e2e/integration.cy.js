describe('Integration Tests - Full User Journeys', () => {
  beforeEach(() => {
    // Mock all API endpoints
    cy.intercept('GET', '**/api/projects*', { fixture: 'projects.json' });
    cy.intercept('GET', '**/api/services*', { fixture: 'services.json' });
    cy.intercept('GET', '**/api/educations*', { fixture: 'educations.json' });
    cy.intercept('POST', '**/api/contact*', { 
      statusCode: 200, 
      body: { message: 'Message sent successfully' } 
    });
  });

  it('should complete full portfolio exploration journey', () => {
    // Start at home page
    cy.visit('/');
    cy.contains('Welcome to Joshua Desroches page').should('be.visible');
    
    // Navigate to About page via button
    cy.get('.RedirectButton').contains('About Me').click();
    cy.url().should('include', '/about');
    cy.contains('My name is Joshua Desroches').should('be.visible');
    
    // Check resume functionality
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.contains('Open Resume').click();
    cy.get('@windowOpen').should('have.been.calledWith', '/res/Joshua Desroches Resume.pdf', '_blank');
    
    // Navigate to Projects
    cy.contains('My Projects').click();
    cy.url().should('include', '/project');
    
    // Navigate to Services
    cy.visit('/services');
    cy.contains('h1', 'Services').should('be.visible');
    
    // Test service card interaction
    cy.get('.service-card, .service-item').first().click();
    cy.get('.flipped, .service-details').should('be.visible');
    
    // Navigate to Education
    cy.visit('/education');
    cy.contains('h1', 'Education').should('be.visible');
    
    // Navigate to Contact and submit form
    cy.visit('/contact');
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Test message from integration test');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Message sent successfully').should('be.visible');
  });

  it('should handle responsive design across devices', () => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1200, height: 800, name: 'Desktop' }
    ];

    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height);
      
      // Test home page
      cy.visit('/');
      cy.contains('Welcome to Joshua Desroches page').should('be.visible');
      
      // Test about page
      cy.visit('/about');
      cy.get('.DualPanelContainer').should('be.visible');
      
      // Test projects page
      cy.visit('/project');
      cy.get('.project-list, .projects-container').should('be.visible');
    });
  });

  it('should maintain accessibility standards', () => {
    const pages = ['/', '/about', '/project', '/services', '/education', '/contact'];
    
    pages.forEach(page => {
      cy.visit(page);
      
      // Check for proper heading structure
      cy.get('h1').should('have.length', 1);
      
      // Check for alt text on images
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
      
      // Check for keyboard navigation
      cy.get('button, a, input, textarea').each(($el) => {
        cy.wrap($el).should('be.visible');
        if ($el.is(':visible')) {
          cy.wrap($el).should('not.have.attr', 'tabindex', '-1');
        }
      });
    });
  });

  it('should handle error states gracefully', () => {
    // Test API error handling
    cy.intercept('GET', '**/api/projects*', { statusCode: 500 });
    cy.visit('/project');
    cy.contains('error', { matchCase: false }).should('be.visible');
    
    cy.intercept('GET', '**/api/services*', { statusCode: 500 });
    cy.visit('/services');
    cy.contains('Failed to fetch services').should('be.visible');
    
    cy.intercept('GET', '**/api/educations*', { statusCode: 500 });
    cy.visit('/education');
    cy.contains('Error: Failed to fetch education data').should('be.visible');
  });

  it('should handle network connectivity issues', () => {
    // Simulate offline behavior
    cy.intercept('GET', '**/api/**', { forceNetworkError: true });
    
    cy.visit('/project');
    // Should show some indication of network issues
    cy.get('body').should('contain.text', 'error').or('contain.text', 'failed');
  });

  it('should perform well under load', () => {
    // Test rapid navigation
    const pages = ['/', '/about', '/project', '/services', '/education', '/contact'];
    
    pages.forEach(page => {
      cy.visit(page);
      cy.get('body').should('be.visible');
      
      // Ensure page loads within reasonable time
      cy.get('h1, .main-content', { timeout: 5000 }).should('be.visible');
    });
  });

  it('should maintain state across navigation', () => {
    // Visit services and flip a card
    cy.visit('/services');
    cy.get('.service-card, .service-item').first().click();
    cy.get('.flipped, .service-details').should('be.visible');
    
    // Navigate away and back
    cy.visit('/about');
    cy.visit('/services');
    
    // State should be reset (card not flipped)
    cy.get('.flipped, .service-details').should('not.exist');
  });

  it('should handle form validation and submission flow', () => {
    cy.visit('/contact');
    
    // Test empty form submission
    cy.get('button[type="submit"]').click();
    cy.get('.error-message, .error').should('be.visible');
    
    // Test invalid email
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('textarea[name="message"]').type('Test message');
    cy.get('button[type="submit"]').click();
    
    // Should show email validation error
    cy.get('input[name="email"]:invalid').should('exist');
    
    // Test successful submission
    cy.get('input[name="email"]').clear().type('valid@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Message sent successfully').should('be.visible');
  });

  it('should handle image loading and gallery functionality', () => {
    cy.visit('/project');
    
    // Wait for images to load
    cy.get('.image-gallery img').should('be.visible');
    
    // Test gallery navigation
    cy.get('.gallery-arrow.right').first().click();
    cy.get('.gallery-arrow.left').first().click();
    
    // Test image lazy loading
    cy.get('.image-gallery img').should('have.attr', 'loading', 'lazy');
  });
});
