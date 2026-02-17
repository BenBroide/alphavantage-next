describe('Stock Market Dashboard E2E', () => {
  it('should navigate from home page to stock detail page and verify all elements', () => {
    // Visit the home page
    cy.visit('/');
    
    // Verify home page loads with main elements
    cy.contains('Select a Stock:').should('be.visible');
    
    // Verify view switcher is present
    cy.get('[title="Cards View"]').should('exist');
    cy.get('[title="Tiles View"]').should('exist');
    cy.get('[title="Table View"]').should('exist');
    
    // Verify stock cards are present
    cy.get('a[href*="/stock/"]').should('have.length.greaterThan', 0);
    
    // Click on the first stock (AAPL)
    cy.get('a[href="/stock/AAPL"]').first().click();
    
    // Wait for navigation to stock detail page
    cy.url().should('include', '/stock/AAPL');
    
    // Verify loading indicator appears (or content loads)
    // Note: Loading might be very fast with cache, so we check for either loading or content
    cy.get('body').should('be.visible');
    
    // Wait for content to load (max 10 seconds for API call)
    cy.get('[data-testid="company-name"], h1, h2', { timeout: 10000 }).should('exist');
    
    // Verify Company Overview Card elements
    cy.contains('AAPL').should('be.visible');
    cy.contains(/Apple Inc\.|Company Overview/i, { timeout: 10000 }).should('be.visible');
    
    // Verify key financial metrics are displayed
    cy.contains(/Market Cap|Price|P\/E Ratio|52 Week/i).should('be.visible');
    
    // Verify Price Chart is present
    cy.get('.recharts-wrapper, [class*="chart"], canvas', { timeout: 5000 }).should('exist');
    
    // Verify Historical Prices Table
    cy.contains(/Historical Prices|Date|Price|Volume/i).should('be.visible');
    
    // Verify table has data rows
    cy.get('table tbody tr, [role="row"]').should('have.length.greaterThan', 0);
    
    // Verify header is present
    cy.get('header').should('be.visible');
    
    // Verify footer is present
    cy.get('footer').should('be.visible');
    
    // Test navigation back to home
    cy.get('a[href="/"]').first().click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Select a Stock:').should('be.visible');
  });

  it('should handle multiple view modes on home page', () => {
    cy.visit('/');
    
    // Test Cards View
    cy.get('[title="Cards View"]').click();
    cy.wait(300); // Small wait for transition
    
    // Test Tiles View
    cy.get('[title="Tiles View"]').click();
    cy.wait(300);
    
    // Test Table View
    cy.get('[title="Table View"]').click();
    cy.wait(300);
    
    // Verify stocks are still visible
    cy.get('a[href*="/stock/"]').should('have.length.greaterThan', 0);
  });

  it('should navigate to different stocks', () => {
    cy.visit('/');
    
    // Visit MSFT
    cy.get('a[href="/stock/MSFT"]').first().click();
    cy.url().should('include', '/stock/MSFT');
    cy.contains('MSFT', { timeout: 10000 }).should('be.visible');
    
    // Navigate back and visit another stock
    cy.get('a[href="/"]').first().click();
    cy.get('a[href="/stock/GOOGL"]').first().click();
    cy.url().should('include', '/stock/GOOGL');
    cy.contains('GOOGL', { timeout: 10000 }).should('be.visible');
  });
});
