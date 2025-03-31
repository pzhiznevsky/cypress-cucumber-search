// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
  * Wait for Main page to load.
  *
  * @param query search query
  */
    waitForPageLoad(): Chainable<any>;
    /**
   * Search query on Main page.
   *
   * @param query search query
   */
    search(query: string | null,): Chainable<any>;
    /**
   * Validate Search results on Main page.
   *
   * @param query search query
   */
    validateSearch(query: string | null,): Chainable<any>;
  }
}