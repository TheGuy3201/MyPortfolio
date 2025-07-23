describe('Education Component', () => {
  beforeEach(() => {
    // Mock the API response for education data
    cy.intercept('GET', '**/api/educations*', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          institution: 'Centennial College',
          degree: 'Software Engineering Technology',
          specialization: 'Game Programming',
          startDate: '2022-09-01',
          endDate: '2025-04-30',
          description: 'Comprehensive program covering software development, game programming, and emerging technologies.',
          gpa: '3.8',
          status: 'In Progress'
        },
        {
          _id: '2',
          institution: 'Test High School',
          degree: 'High School Diploma',
          specialization: 'Science and Technology',
          startDate: '2018-09-01',
          endDate: '2022-06-30',
          description: 'Secondary education with focus on STEM subjects.',
          gpa: '3.9',
          status: 'Completed'
        }
      ]
    }).as('getEducations');

    cy.visit('/education');
  });

  it('should display education page heading', () => {
    cy.contains('h1', 'Education').should('be.visible');
  });

  it('should show loading state initially', () => {
    // Intercept with delay to see loading state
    cy.intercept('GET', '**/api/educations*', {
      delay: 1000,
      statusCode: 200,
      body: []
    }).as('getEducationsDelayed');

    cy.reload();
    cy.contains('Loading education data').should('be.visible');
  });

  it('should load and display education entries', () => {
    cy.wait('@getEducations');
    cy.get('.education-item, .education-card').should('have.length', 2);
  });

  it('should display institution names', () => {
    cy.wait('@getEducations');
    cy.contains('Centennial College').should('be.visible');
    cy.contains('Test High School').should('be.visible');
  });

  it('should display degree information', () => {
    cy.wait('@getEducations');
    cy.contains('Software Engineering Technology').should('be.visible');
    cy.contains('High School Diploma').should('be.visible');
  });

  it('should display specialization when available', () => {
    cy.wait('@getEducations');
    cy.contains('Game Programming').should('be.visible');
    cy.contains('Science and Technology').should('be.visible');
  });

  it('should display education status', () => {
    cy.wait('@getEducations');
    cy.contains('In Progress').should('be.visible');
    cy.contains('Completed').should('be.visible');
  });

  it('should display GPA information', () => {
    cy.wait('@getEducations');
    cy.contains('3.8').should('be.visible');
    cy.contains('3.9').should('be.visible');
  });

  it('should format dates properly', () => {
    cy.wait('@getEducations');
    
    // Should display formatted dates (assuming MM/YYYY or similar format)
    cy.get('.education-item, .education-card').first().within(() => {
      cy.get('.date, .duration').should('contain.text', '2022').and('contain.text', '2025');
    });
  });

  it('should display education descriptions', () => {
    cy.wait('@getEducations');
    cy.contains('Comprehensive program covering software development').should('be.visible');
    cy.contains('Secondary education with focus on STEM subjects').should('be.visible');
  });

  it('should handle empty education list', () => {
    cy.intercept('GET', '**/api/educations*', {
      statusCode: 200,
      body: []
    }).as('getEmptyEducations');

    cy.reload();
    cy.wait('@getEmptyEducations');
    
    cy.get('.no-education, .empty-state')
      .should('be.visible')
      .or('not.contain', '.education-item');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '**/api/educations*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getEducationsError');

    cy.reload();
    cy.wait('@getEducationsError');
    
    cy.contains('Error: Failed to fetch education data').should('be.visible');
  });

  it('should handle API response with error field', () => {
    cy.intercept('GET', '**/api/educations*', {
      statusCode: 200,
      body: { error: 'Database connection failed' }
    }).as('getEducationsApiError');

    cy.reload();
    cy.wait('@getEducationsApiError');
    
    cy.contains('Error: Database connection failed').should('be.visible');
  });

  it('should sort education entries by date', () => {
    cy.wait('@getEducations');
    
    // Most recent education should appear first
    cy.get('.education-item, .education-card').first().should('contain', 'Centennial College');
    cy.get('.education-item, .education-card').last().should('contain', 'Test High School');
  });

  it('should be responsive on different screen sizes', () => {
    cy.wait('@getEducations');
    
    // Mobile viewport
    cy.viewport(375, 667);
    cy.get('.education-item, .education-card').should('be.visible');
    
    // Tablet viewport
    cy.viewport(768, 1024);
    cy.get('.education-item, .education-card').should('be.visible');
    
    // Desktop viewport
    cy.viewport(1200, 800);
    cy.get('.education-item, .education-card').should('be.visible');
  });

  it('should display all education fields when present', () => {
    cy.wait('@getEducations');
    
    cy.get('.education-item, .education-card').first().within(() => {
      cy.should('contain', 'Centennial College'); // Institution
      cy.should('contain', 'Software Engineering Technology'); // Degree
      cy.should('contain', 'Game Programming'); // Specialization
      cy.should('contain', '3.8'); // GPA
      cy.should('contain', 'In Progress'); // Status
    });
  });

  it('should handle missing optional fields gracefully', () => {
    // Mock education entry with minimal data
    cy.intercept('GET', '**/api/educations*', {
      statusCode: 200,
      body: [
        {
          _id: '1',
          institution: 'Minimal College',
          degree: 'Basic Degree',
          startDate: '2020-01-01',
          endDate: '2024-01-01'
          // Missing: specialization, gpa, description, status
        }
      ]
    }).as('getMinimalEducation');

    cy.reload();
    cy.wait('@getMinimalEducation');
    
    cy.contains('Minimal College').should('be.visible');
    cy.contains('Basic Degree').should('be.visible');
    
    // Should not break if optional fields are missing
    cy.get('.education-item, .education-card').should('be.visible');
  });
});
