import fetchMock from 'fetch-mock';
import { getOrganisasjonerBrukerHarTilgangTilMock, getOrganisasjonerMock } from './organisasjoner';
import { getSykefraværshistorikkMock } from './sykefraværshistorikk';
import { Bransjetype } from '../api/virksomhetMetadata';
import { sykefraværsvarighetMock } from './sykefraværsvarighet';
import { OverordnetEnhet, Underenhet } from '../api/enhetsregisteret-api';

const mock = {
    minSideArbeidsgiver: true,
    sykefraværsstatistikkApi: true,
    enhetsregisteret: true,
    featureToggles: true,
};

let delayfaktor = 0;

if (process.env.REACT_APP_HEROKU) {
    // Alt skal alltid mockes på heroku
    Object.keys(mock).forEach((skalMockes) => ((mock as any)[skalMockes] = true));
    delayfaktor = 1;
}

if (mock.minSideArbeidsgiver) {
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', getOrganisasjonerMock(), {
        delay: 1000 * delayfaktor,
    });
}

if (mock.sykefraværsstatistikkApi) {
    fetchMock.get(
        'express:/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
            }
            if (orgnr === '100100100') {
                return 403;
            }
            return getSykefraværshistorikkMock(orgnr);
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
    fetchMock.get(
        'express:/sykefravarsstatistikk/api/:orgnr/varighetsiste4kvartaler',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (['101010101', '888888884'].includes(orgnr)) {
                return 500;
            }
            if (orgnr === '100100100') {
                return 403;
            }
            return sykefraværsvarighetMock(orgnr);
        },
        {
            delay: 1000 * delayfaktor,
        }
    );

    fetchMock.get(
        'express:/sykefravarsstatistikk/api/:orgnr/bedriftsmetrikker',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
            }
            if (orgnr === '100100100') {
                return 500;
            }
            if (orgnr.match('88888888.')) {
                return {
                    antallAnsatte: 99,
                    næringskode5Siffer: {
                        kode: '10300',
                        beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
                    },
                    bransje: Bransjetype.BARNEHAGER,
                };
            }
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '10300',
                    beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
                },
            };
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
    fetchMock.get(
        '/sykefravarsstatistikk/api/organisasjoner/statistikk',
        getOrganisasjonerBrukerHarTilgangTilMock(),
        {
            delay: 1000 * delayfaktor,
        }
    );
}

if (mock.enhetsregisteret) {
    fetchMock.get('begin:https://data.brreg.no/enhetsregisteret/api/enheter/', (url) => {
        const orgnr = url.match(/[0-9]{9}/)![0];

        const overordnetEnhet: OverordnetEnhet = {
            organisasjonsnummer: orgnr /*query.get('organisasjonsnummer')!*/,
            institusjonellSektorkode: { verdi: '6500', beskrivelse: 'Offentlig sektor' },
        };
        return overordnetEnhet;
    });
    fetchMock.get('begin:https://data.brreg.no/enhetsregisteret/api/underenheter/', (url) => {
        const orgnr = url.match(/[0-9]{9}/)![0];

        const underenhet: Underenhet = {
            organisasjonsnummer: orgnr,
            overordnetEnhet: '777777777',
        };
        return underenhet;
    });
}

if (mock.featureToggles) {
    fetchMock.get(
        'begin:/sykefravarsstatistikk/api/feature',
        {},
        {
            delay: 1000 * delayfaktor,
        }
    );
}

fetchMock.spy();
