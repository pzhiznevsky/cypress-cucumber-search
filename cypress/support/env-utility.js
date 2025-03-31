const prodUrl = 'https://docs.cypress.io/app/get-started/why-cypress';
const localUrl = 'http://localhost';
const kubeLocalUrl = 'http://kube.local';
const kubeUrl = 'http://rbp-proxy.cypress';

export function getUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return prodUrl;
  else if (environment == 'prod') return prodUrl;
  else if (environment == 'local') return localUrl;
  else if (environment == 'kubeLocal') return kubeLocalUrl;
  else if (environment == 'kube') return kubeUrl;
}