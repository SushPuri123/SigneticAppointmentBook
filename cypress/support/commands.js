// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js or cypress/support/e2e.js

Cypress.Commands.add('handleConfirmationModal', () => {
  // Define selectors for the popups
  const popupASelector = '.modal__wrapper.open.confirmation-modal'
  const popupAbutton= 'Use the original address entered'

  const popupBSelector = '.modal__footer > .btn-primary'

  // Check for Popup A
  cy.get('body').then(($body) => {
    if ($body.find(popupASelector).length) {
      cy.contains(popupAbutton).click();
    } else if ($body.find(popupBSelector).length) {
      // Check for Popup B
      cy.get(popupBSelector).click();
    } else {
      // No popups found
      cy.log('No popups appeared.');
    }
  });
});
