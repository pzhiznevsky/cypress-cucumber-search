const { Before, After } = require('@badeball/cypress-cucumber-preprocessor');
const allure = require('allure-js-commons');
const { v5 } = require('uuid');

beforeEach(() => {
  updateTestNameAndHistoryIdForAllure();
  if (Cypress.isBrowser('!firefox')) cy.setCookie('banner', 'true');
  cy.log("Tags found: " + this.test?.tags);
  cy.log("TEST STARTED..." + generateTestName());
});

afterEach(function () {
  cy.log("TEST FINISHED" + generateTestName());
  if (this.test?.tags) {
    cy.log("Tags found: " + this.test.tags);
    this.test.tags.forEach((tag) => {
      if (tag.name.startsWith('@bug')) {
        cy.allure().addLabel('bug'); // Mark as bug in Allure
      }
      if (tag.name.startsWith('@issue-')) {
        const issueId = tag.name.replace('@issue-', '');
        cy.allure().addIssue(issueId); // Link issue in Allure
      }
      if (tag.name === '@critical') {
        cy.allure().addSeverity('critical'); // Mark as critical
      }
    });
  }
  // cy.allure().addLabel('bug');
  // cy.allure().addIssue('TestIssue-1235');
  // cy.allure().addSeverity('critical');
});

function generateTestName() {
  return `[${Cypress.browser.name}] ${Cypress.currentTest.title}`;
}

function updateTestNameAndHistoryIdForAllure() {
  const newName = generateTestName();
  allure.displayName(newName);
  const newHistoryId = generateConsistentHistoryId(newName);
  allure.historyId(newHistoryId);
}

function generateConsistentHistoryId(name) {
  const NAMESPACE = 'b0dd5ec1-6e89-4851-8b7f-f50b09f4678a';
  return v5(name, NAMESPACE);
}