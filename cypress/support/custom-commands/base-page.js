import { getUrl } from '../env-utility';

const baseURL = getUrl();
const TIMEOUT = 10000;

export const navigateTo = (path) => {
  const url = `${baseURL}${path}`;
  cy.log(`Navigating to: ${url}`);
  cy.visit(url);
}

export const isElementVisible = (selector) => {
  return cy.xpath(selector).then(($el) => Cypress.dom.isVisible($el));
};

export const waitForPageLoad = (method, call, selector) => {
  if (method && call) {
    cy.intercept(method, call).as('dataLoad');
    cy.wait('@dataLoad', { timeout: TIMEOUT });
  }
  cy.document().its('readyState').should('eq', 'complete');
  if (selector) {
    waitForElementExists(selector);
  };
};

export const isElementExists = (selector) => {
  return cy.get(selector, { timeout: TIMEOUT }).then(($el) => {
    return $el.length > 0;
  });
};

export const isElementDisabled = (selector) => {
  return cy.get(selector).then(($el) => {
    return $el.prop('disabled') === true;
  });
};

export const waitForElementExists = (locator) => {
  cy.log(`waitForElementExists ${locator}...`);
  return cy.xpath(locator, { timeout: TIMEOUT }).should('exist')
}

export const waitForElementVisible = (locator) => {
  cy.log(`waitForElementVisible ${locator}...`);
  return waitForElementExists(locator).should('be.visible')
}

export const waitForElementClickable = (locator) => {
  cy.log(`waitForElementClickable ${locator}...`);
  return waitForElementVisible(locator).should('not.be.disabled')
    .should('have.css', 'pointer-events', 'auto');
}

export const click = (locator, forse = false) => {
  cy.log(`click on ${locator}...`);
  cy.xpath(locator, { timeout: TIMEOUT }).click({ forse: forse });
}

export const type = (locator, text) => {
  cy.log(`type ${text} into ${locator}...`);
  cy.xpath(locator).type(text);
}

export const getText = (locator) => {
  cy.log(`getText from ${locator}...`);
  return cy.xpath(locator).invoke('text');
}

export const waitForElement = (locator) => {
  cy.log(`waitForElement ${locator}...`);
  cy.xpath(locator).should('be.visible');
}

export const waitForText = (locator, expectedText, caseSensitive = false, timeout = TIMEOUT, pollInterval = 500) => {
  cy.log(`waitForText "${expectedText}" in ${locator} with timeout ${timeout}...`);

  const checkText = (startTime) => {
    cy.xpath(locator).invoke('text').then((t) => {
      if (caseSensitive) {
        if (t.includes(expectedText)) {
          return;
        }
      } else {
        if (t.toLowerCase().includes(expectedText.toLowerCase())) {
          return;
        }
      }

      if (Date.now() - startTime < timeout) {
        cy.wait(pollInterval)
        checkText(startTime);
      } else {
        throw new Error(`Timeout: The expected text "${expectedText}" was not found in the element within ${timeout}ms.`);
      }
    });
  };

  const startTime = Date.now();
  checkText(startTime);
};

export const waitForSelector = (locator, timeout = TIMEOUT) => {
  cy.log(`waitForSelector by ${locator} with timeout ${timeout}...`);
  cy.xpath(locator, { timeout: timeout }).should('be.visible');
}

export const sleep = (ms) => {
  return new Cypress.Promise(resolve => setTimeout(resolve, ms));
}