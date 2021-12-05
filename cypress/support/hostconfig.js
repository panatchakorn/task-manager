//return url for homepage for a given environment
export function getBaseUrl(){
    var envi =Cypress.env('ENV'); // Get the value of environment variable in package.json
    if (envi == 'local')
        return "http://localhost:4200";
    //else if (envi == 'sit')
    //  return "";
};