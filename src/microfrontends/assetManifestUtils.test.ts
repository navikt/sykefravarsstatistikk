import { makeAbsolute } from './assetManifestUtils';
import { SAMTALESTØTTE_MIKROFRONTEND_PATH } from '../konstanter';

describe('makeAbsolute oppdaterer path til ressurser fra asset-manifest avhengig av domene child app og parent app kjører i', () => {
    it('returnerer samme path når begge kjører på samme domene', () => {
        expect(
            makeAbsolute(
                '/samtalestotte-podlet',
                '/samtalestotte-podlet/static/css/main.a617e044.chunk.css',
                true
            )
        ).toBe('/samtalestotte-podlet/static/css/main.a617e044.chunk.css');
    });

    it('legger til baseUrl til path når parent og child kjører på forskjellige domener', () => {
        expect(
            makeAbsolute(
                'https://arbeidsgiver-gcp.dev.nav.no' + SAMTALESTØTTE_MIKROFRONTEND_PATH,
                '/samtalestotte-podlet/static/css/main.a617e044.chunk.css',
                false
            )
        ).toBe(
            'https://arbeidsgiver-gcp.dev.nav.no/samtalestotte-podlet/static/css/main.a617e044.chunk.css'
        );
    });
});
