/// <reference types="cypress" />

describe('Pet Search E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should filter pets and show relevant cards when searching for "Боря"', () => {
    cy.get('app-item-card').should('have.length.at.least', 1);
    cy.get('app-search input').clear().type('Боря');
    cy.get('app-item-card').should('have.length', 2);
    cy.get('app-item-card').contains('Боря').should('be.visible');
    cy.get('app-item-card').contains('Вольт').should('be.visible');
  });
});
