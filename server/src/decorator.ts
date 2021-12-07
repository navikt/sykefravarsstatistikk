import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;

const url =
    'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&feedback=false';

export interface DecoratorContent {
    NAV_SCRIPTS: string;
    NAV_STYLES: string;
    NAV_HEADING: string;
    NAV_FOOTER: string;
    NAV_MENU_RESOURCES: string;
}

function getDecoratorValuesFromBody(body: string): DecoratorContent {
    const { document } = new JSDOM(body).window;
    const prop = 'innerHTML';

    return {
        NAV_SCRIPTS: document.getElementById('scripts')![prop],
        NAV_STYLES: document.getElementById('styles')![prop],
        NAV_HEADING: document.getElementById('header-withmenu')![prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')![prop],
        NAV_MENU_RESOURCES: document.getElementById('megamenu-resources')![prop],
    };
}

export default async function getDecorator() {
    const { data: body } = await axios.get(url);
    return getDecoratorValuesFromBody(body);
}
