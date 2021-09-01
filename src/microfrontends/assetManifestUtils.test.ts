import { makeAbsolute } from './assetManifestUtils';
import { SAMTALESTØTTE_MIKROFRONTEND_PATH } from '../konstanter';

describe('makeAbsoulte ta hensyn til hvilken domene kjører child app og parent app i', () => {
    it('returnerer samme path når begge kjører på samme domenen', () => {
        expect(
            makeAbsolute(
                '/samtalestotte-podlet',
                '/samtalestotte-podlet/static/css/main.a617e044.chunk.css',
                true
            )
        ).toBe('/samtalestotte-podlet/static/css/main.a617e044.chunk.css');
    });

    it('returnerer samme path når begge kjører på samme domenen', () => {
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
