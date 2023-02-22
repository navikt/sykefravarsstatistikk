const jsdom = require('jsdom');
const axios = require('axios');

const {JSDOM} = jsdom;

const url =
    'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&feedback=false';

function getDecoratorValuesFromBody(body) {
  const {document} = new JSDOM(body).window;
  const prop = 'innerHTML';

  return {
    NAV_SCRIPTS: document.getElementById('scripts')[prop],
    NAV_STYLES: document.getElementById('styles')[prop],
    NAV_HEADING: document.getElementById('header-withmenu')[prop],
    NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
    NAV_MENU_RESOURCES: document.getElementById('megamenu-resources')[prop],
  };
}

async function getDecorator() {
  const {data: body} = await axios.get(url);
  return getDecoratorValuesFromBody(body);
}

module.exports = getDecorator;
