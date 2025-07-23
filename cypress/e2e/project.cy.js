describe('Project Component', () => {
  beforeEach(() => {
    // Mock the API response for projects
    cy.intercept('GET', '**/api/projects*', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          title: 'Test Project 1',
          description: 'A test project description',
          imgurl: ['/test-image-1.jpg', '/test-image-2.jpg'],
          url: 'https://github.com/test/project1'
        },
        {
          _id: '2',
          title: 'Test Project 2',
          description: 'Another test project',
          imgurl: ['/test-image-3.jpg'],
          url: 'https://github.com/test/project2'
        }
      ]
    }).as('getProjects');

    cy.visit('/project');
  });

  it('should display projects page', () => {
    cy.contains('h1', 'My Projects').should('be.visible');
  });

  it('should load and display projects', () => {
    cy.wait('@getProjects');
    cy.get('.project-list').should('be.visible');
    cy.get('.project-item').should('have.length.at.least', 1);
  });

  it('should display project titles', () => {
    cy.wait('@getProjects');
    cy.contains('Test Project 1').should('be.visible');
    cy.contains('Test Project 2').should('be.visible');
  });

  it('should display project descriptions', () => {
    cy.wait('@getProjects');
    cy.contains('A test project description').should('be.visible');
    cy.contains('Another test project').should('be.visible');
  });

  it('should display project images with proper alt text', () => {
    cy.wait('@getProjects');
    cy.get('.image-gallery img')
      .first()
      .should('be.visible')
      .should('have.attr', 'alt')
      .and('contain', 'project screenshot');
  });

  it('should have image gallery navigation arrows', () => {
    cy.wait('@getProjects');
    cy.get('.gallery-arrow.left')
      .should('be.visible')
      .should('have.attr', 'aria-label', 'Previous image');
    
    cy.get('.gallery-arrow.right')
      .should('be.visible')
      .should('have.attr', 'aria-label', 'Next image');
  });

  it('should navigate through project images', () => {
    cy.wait('@getProjects');
    
    // Test next image navigation
    cy.get('.gallery-arrow.right').first().click();
    
    // Test previous image navigation
    cy.get('.gallery-arrow.left').first().click();
  });

  it('should handle projects with single images', () => {
    cy.wait('@getProjects');
    
    // Find project with single image (Test Project 2)
    cy.contains('Test Project 2')
      .parent()
      .within(() => {
        cy.get('.image-gallery img').should('be.visible');
        cy.get('.gallery-arrow').should('exist');
      });
  });

  it('should display project links', () => {
    cy.wait('@getProjects');
    
    cy.get('a[href*="github.com"]')
      .should('have.length.at.least', 1)
      .should('have.attr', 'target', '_blank');
  });

  it('should handle empty project list gracefully', () => {
    cy.intercept('GET', '**/api/projects*', {
      statusCode: 200,
      body: []
    }).as('getEmptyProjects');

    cy.reload();
    cy.wait('@getEmptyProjects');
    
    // Should show some indication that no projects are available
    cy.get('body').should('contain.text', 'No projects found').or('not.contain', '.project-item');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '**/api/projects*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getProjectsError');

    cy.reload();
    cy.wait('@getProjectsError');
    
    // Should show error message or handle gracefully
    cy.get('body').should('contain.text', 'error').or('contain.text', 'failed to load');
  });

  it('should have responsive design elements', () => {
    cy.wait('@getProjects');
    
    // Test on mobile viewport
    cy.viewport(375, 667);
    cy.get('.project-list').should('be.visible');
    
    // Test on tablet viewport
    cy.viewport(768, 1024);
    cy.get('.project-list').should('be.visible');
    
    // Test on desktop viewport
    cy.viewport(1200, 800);
    cy.get('.project-list').should('be.visible');
  });

  it('should support keyboard navigation for image gallery', () => {
    cy.wait('@getProjects');
    
    cy.get('.gallery-arrow.left').first().focus();
    cy.focused().should('have.class', 'gallery-arrow');
    
    cy.get('.gallery-arrow.right').first().focus();
    cy.focused().should('have.class', 'gallery-arrow');
  });
});
