describe('Contact Component', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display contact form', () => {
    cy.get('form').should('be.visible');
  });

  it('should have all required form fields', () => {
    cy.get('input[name="fullName"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="phone"]').should('be.visible');
    cy.get('input[name="subject"]').should('be.visible');
    cy.get('textarea[name="message"]').should('be.visible');
  });

  it('should have proper field labels and placeholders', () => {
    cy.get('input[name="fullName"]')
      .should('have.attr', 'placeholder')
      .and('not.be.empty');
    
    cy.get('input[name="email"]')
      .should('have.attr', 'type', 'email');
    
    cy.get('input[name="phone"]')
      .should('have.attr', 'type', 'tel');
  });

  it('should have submit button', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('contain.text', 'Send Message');
  });

  it('should show validation error for empty required fields', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('.error-message, .error')
      .should('be.visible')
      .should('contain', 'required');
  });

  it('should validate email format', () => {
    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('textarea[name="message"]').type('Test message');
    cy.get('button[type="submit"]').click();
    
    // Browser native validation or custom validation should trigger
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('should accept valid form submission', () => {
    // Intercept the API call or email service
    cy.intercept('POST', '**/api/contact*', { 
      statusCode: 200, 
      body: { message: 'Message sent successfully' } 
    }).as('submitContact');

    cy.get('input[name="fullName"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('555-1234');
    cy.get('input[name="subject"]').type('Test Subject');
    cy.get('textarea[name="message"]').type('This is a test message.');
    
    cy.get('button[type="submit"]').click();
    
    // Check for success message
    cy.get('.success-message, .success', { timeout: 10000 })
      .should('be.visible');
  });

  it('should clear form after successful submission', () => {
    // Mock successful submission
    cy.intercept('POST', '**/api/contact*', { 
      statusCode: 200, 
      body: { message: 'Message sent successfully' } 
    }).as('submitContact');

    cy.get('input[name="fullName"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    
    cy.get('button[type="submit"]').click();
    
    // Wait for submission and check if form is cleared
    cy.wait('@submitContact');
    cy.get('input[name="fullName"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('textarea[name="message"]').should('have.value', '');
  });

  it('should handle form input changes', () => {
    const testData = {
      fullName: 'Jane Smith',
      email: 'jane.smith@test.com',
      phone: '555-9876',
      subject: 'Portfolio Inquiry',
      message: 'Great portfolio!'
    };

    Object.entries(testData).forEach(([field, value]) => {
      if (field === 'message') {
        cy.get(`textarea[name="${field}"]`).type(value).should('have.value', value);
      } else {
        cy.get(`input[name="${field}"]`).type(value).should('have.value', value);
      }
    });
  });

  it('should show loading state during submission', () => {
    // Intercept with delay to see loading state
    cy.intercept('POST', '**/api/contact*', { 
      delay: 2000,
      statusCode: 200, 
      body: { message: 'Message sent successfully' } 
    }).as('submitContact');

    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    
    cy.get('button[type="submit"]').click();
    
    // Check for loading indicator
    cy.get('button[type="submit"]')
      .should('be.disabled')
      .or('contain', 'Sending...')
      .or('contain', 'Loading');
  });
});
