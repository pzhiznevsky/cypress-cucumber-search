import * as basePage from './base-page';

const window = '//div[contains(@class,"DocSearch-Container")]';
const searchBoxLocator = `${window}//input[@id="docsearch-input"]`;
const searchResultsLocator = `${window}//a//div[@class="DocSearch-Hit-content-wrapper"]//span`;
 
export const waitForDialogLoad = () => {
  cy.xpath(searchBoxLocator).should('be.visible');
}

export const validateTextEntered = (text) => {
  cy.xpath(searchBoxLocator).should('have.value', text);
}

export const search = (text) => {
  waitForDialogLoad();
  cy.xpath(searchBoxLocator).type(text);
  validateTextEntered(text);
}

export const getFirstResult = () => {
  return cy.xpath(searchResultsLocator).first().invoke('text');
}

export const waitForText = (text) => {
  basePage.waitForText(searchResultsLocator, text);
}

export const validateSearchResults = (text) => {
  waitForText(text);
  getFirstResult().then((t) => {
    expect(t.toLowerCase()).to.include(text.toLowerCase());
  });
}