describe('Navigation and Layout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display main navigation menu', () => {
    cy.get('nav, .navigation').should('be.visible');
  });

  it('should have working navigation links', () => {
    const routes = [
      { text: 'Home', url: '/' },
      { text: 'About', url: '/about' },
      { text: 'Projects', url: '/project' },
      { text: 'Services', url: '/services' },
      { text: 'Education', url: '/education' },
      { text: 'Contact', url: '/contact' }
    ];

    routes.forEach(route => {
      cy.visit('/'); // Reset to home
      
      // Find and click navigation link
      cy.get('nav, .navigation').within(() => {
        cy.contains(route.text).click();
      });
      
      // Verify URL change
      cy.url().should('include', route.url);
    });
  });

  it('should highlight active navigation item', () => {
    cy.visit('/about');
    
    cy.get('nav, .navigation').within(() => {
      cy.contains('About')
        .should('have.class', 'active')
        .or('have.attr', 'aria-current', 'page');
    });
  });

  it('should be accessible via keyboard navigation', () => {
    // Tab through navigation items
    cy.get('body').tab();
    cy.focused().should('be.visible');
    
    // Navigate using Enter key
    cy.focused().type('{enter}');
    cy.url().should('not.equal', Cypress.config().baseUrl);
  });

  it('should have responsive navigation on mobile', () => {
    cy.viewport(375, 667);
    
    // Check if mobile menu toggle exists
    cy.get('.menu-toggle, .hamburger, .mobile-menu-button')
      .should('be.visible')
      .click();
    
    // Navigation should be visible after toggle
    cy.get('nav, .navigation, .mobile-menu').should('be.visible');
  });

  it('should maintain navigation state across page changes', () => {
    cy.visit('/about');
    cy.get('nav, .navigation').should('be.visible');
    
    cy.visit('/project');
    cy.get('nav, .navigation').should('be.visible');
    
    cy.visit('/contact');
    cy.get('nav, .navigation').should('be.visible');
  });

  it('should have proper heading hierarchy', () => {
    const pages = ['/about', '/project', '/services', '/education', '/contact'];
    
    pages.forEach(page => {
      cy.visit(page);
      
      // Each page should have exactly one h1
      cy.get('h1').should('have.length', 1);
    });
  });

  it('should have consistent layout structure', () => {
    const pages = ['/', '/about', '/project', '/services', '/education', '/contact'];
    
    pages.forEach(page => {
      cy.visit(page);
      
      // Should have main content area
      cy.get('main, .main-content, #root').should('be.visible');
      
      // Should have navigation
      cy.get('nav, .navigation').should('be.visible');
    });
  });

  it('should handle 404 pages gracefully', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // Should show 404 message or redirect to home
    cy.get('body').should('contain.text', '404')
      .or('contain.text', 'Page not found')
      .or(() => {
        cy.url().should('eq', Cypress.config().baseUrl + '/');
      });
  });

  it('should have proper meta information', () => {
    cy.visit('/');
    
    // Check title
    cy.title().should('contain', 'Joshua Desroches');
    
    // Check favicon
    cy.get('link[rel="icon"]').should('have.attr', 'href');
    
    // Check viewport meta tag
    cy.get('meta[name="viewport"]').should('exist');
  });
});
