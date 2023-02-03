import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import arbeidsmiljøportalLogoSvg from './arbeidsmiljøportal-logo.svg';
import { RestStatus } from '../../api/api-utils';
import { ArbeidsmiljøportalenBransje } from '../../utils/bransje-utils';
import { RestUnderenhet } from '../../enhetsregisteret/api/underenheter-api';

interface Props {
    restUnderenhet: RestUnderenhet;
}

export const ArbeidsmiljøportalPanel: FunctionComponent<Props> = ({ restUnderenhet }) => {
    const maybeBransje =
        restUnderenhet.status === RestStatus.Suksess
            ? restUnderenhet.data.bransje
            : ArbeidsmiljøportalenBransje.ANDRE_BRANSJER;

    return (
        <div className="arbeidsmiljøportal-panel">
            <div className="arbeidsmiljøportal-panel__tittel-wrapper">
                <img
                    src={arbeidsmiljøportalLogoSvg}
                    className="arbeidsmiljøportal-panel__logo"
                    alt="Logo for Arbeidsmiljøportalen"
                    aria-hidden={true}
                />
                <Systemtittel className="arbeidsmiljøportal-panel__tittel">
                    Bedre arbeidsmiljø kan forebygge sykefravær
                </Systemtittel>
            </div>
            <Normaltekst className="arbeidsmiljøportal-panel__tekst">
                Bedre arbeidsmiljø styrker jobbnærværet, forebygger og reduserer sykefravær og
                frafall. <br aria-hidden="true" />
                Finn kunnskap og digitale verktøy som hjelper dere med å forebygge arbeidsrelatert
                sykefravær.
            </Normaltekst>
            <EksternLenke href={getLenkeTilBransjensSideIArbeidsmiljøportalen(maybeBransje)}>
                Gå til Arbeidsmiljøportalen
            </EksternLenke>
        </div>
    );
};

export const getLenkeTilBransjensSideIArbeidsmiljøportalen = (
    bransje?: ArbeidsmiljøportalenBransje
): string => {
    switch (bransje) {
        case ArbeidsmiljøportalenBransje.BARNEHAGER:
            return 'https://www.arbeidsmiljoportalen.no/bransje/barnehage';
        case ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI:
            return 'https://www.arbeidsmiljoportalen.no/bransje/naringsmiddelindustri';
        case ArbeidsmiljøportalenBransje.TRANSPORT:
            return 'https://www.arbeidsmiljoportalen.no/bransje/rutebuss-og-persontrafikk';
        case ArbeidsmiljøportalenBransje.SYKEHJEM:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehjem';
        case ArbeidsmiljøportalenBransje.SYKEHUS:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehus';
        case ArbeidsmiljøportalenBransje.BYGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/bygg';
        case ArbeidsmiljøportalenBransje.ANLEGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/anlegg';
        default:
            return 'https://www.arbeidsmiljoportalen.no';
    }
};
