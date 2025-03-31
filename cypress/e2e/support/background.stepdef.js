const { Given } = require('@badeball/cypress-cucumber-preprocessor');
const { getUrl } = require('../../support/env-utility');

const url = getUrl();

Given('Visitor is on the Main Page', () => {
  cy.visit(`${url}`);
});