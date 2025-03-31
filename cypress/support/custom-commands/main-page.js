import * as basePage from './base-page';
import * as searchDialog from './search-dialog';

const window = '//div[@id="__docusaurus"]';
const searchButton = `${window}//div[contains(@class,"searchBox")]//button`;

export const waitForPageLoad = () => {
  basePage.waitForPageLoad('POST', 'https://px.ads.linkedin.com/wa/', searchButton);
}

export const search = (query) => {
  basePage.click(searchButton);
  searchDialog.search(query);
}

export const validateSearch = (query) => {
  searchDialog.validateSearchResults(query);
}

Cypress.Commands.add('waitForPageLoad', () => {
  waitForPageLoad();
});

Cypress.Commands.add('search', (query) => {
  search(query);
});

Cypress.Commands.add('validateSearch', (query) => {
  validateSearch(query);
});