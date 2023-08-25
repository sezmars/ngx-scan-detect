describe('Initial Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Welcome to Barcode Scanner Input Detect!');
  });
});

describe('Input Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('input').type('https://sezmars.github.io/ngx-barcodeput');
  });
});
