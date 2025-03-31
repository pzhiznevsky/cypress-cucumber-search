const prodUrl = 'https://docs.cypress.io/app/get-started/why-cypress';
const localUrl = 'http://localhost';

export function getUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return prodUrl;
  else if (environment == 'prod') return prodUrl;
  else if (environment == 'local') return localUrl;
}