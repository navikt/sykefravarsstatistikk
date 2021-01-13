import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import arbeidsmiljøportalLogoSvg from './arbeidsmiljøportal-logo.svg';
import { RestStatus } from '../../api/api-utils';
import { RestVirksomhetMetadata } from '../../api/virksomhetMetadata';
import {
    ArbeidstilsynetBransje,
    getArbeidstilsynetBransje,
    getLenkeTilBransjensSideIArbeidsmiljøportalen,
} from './bransje-utils';

interface Props {
    restVirksomhetMetadata: RestVirksomhetMetadata;
}

export const ArbeidsmiljøportalPanel: FunctionComponent<Props> = ({ restVirksomhetMetadata }) => {
    const bransje =
        restVirksomhetMetadata.status === RestStatus.Suksess
            ? getArbeidstilsynetBransje(restVirksomhetMetadata.data.næringskode5Siffer)
            : ArbeidstilsynetBransje.ANDRE_BRANSJER;

    return (
        <div className="arbeidsmiljøportal-panel">
            <div className="arbeidsmiljøportal-panel__tittel-wrapper">
                <img
                    src={arbeidsmiljøportalLogoSvg}
                    className="arbeidsmiljøportal-panel__logo"
                    alt="Logo for Arbeidsmiljøportalen"
                />
                <div className="arbeidsmiljøportal-panel__nyhet-og-tittel">
                    <Systemtittel className="arbeidsmiljøportal-panel__tittel">
                        Bedre arbeidsmiljø kan forebygge sykefravær
                    </Systemtittel>
                </div>
            </div>
            <Normaltekst className="arbeidsmiljøportal-panel__tekst">
                Bedre arbeidsmiljø styrker jobbnærværet, forebygger og reduserer sykefravær og
                frafall. <br />
                Finn kunnskap og digitale verktøy som hjelper dere med å forebygge arbeidsrelatert
                sykefravær.
            </Normaltekst>
            <EksternLenke href={getLenkeTilBransjensSideIArbeidsmiljøportalen(bransje)}>
                Gå til Arbeidsmiljøportalen
            </EksternLenke>
        </div>
    );
};
