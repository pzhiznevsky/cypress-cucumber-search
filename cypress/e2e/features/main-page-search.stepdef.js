/* eslint-disable max-len */
import { Given, When, Then, Step } from '@badeball/cypress-cucumber-preprocessor';
import * as mainPage from '../../support/custom-commands/main-page';

Given('I wait for the main page to load', () => {
  cy.waitForPageLoad();
});

When('I search for {string}', (query) => {
  cy.search(query);
});

Then('I should see search results for {string}', (query) => {
  cy.validateSearch(query);
});