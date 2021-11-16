import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import arbeidsmiljøportalLogoSvg from './arbeidsmiljøportal-logo.svg';
import { RestStatus } from '../../api/api-utils';
import { RestVirksomhetsdata } from '../../api/virksomhetsdata-api';
import {
    ArbeidsmiljøportalenBransje,
    getArbeidsmiljøportalenBransje,
    getLenkeTilBransjensSideIArbeidsmiljøportalen,
} from './bransje-utils';

interface Props {
    restvirksomhetsdata: RestVirksomhetsdata;
}

export const ArbeidsmiljøportalPanel: FunctionComponent<Props> = ({ restvirksomhetsdata }) => {
    const bransje =
        restvirksomhetsdata.status === RestStatus.Suksess
            ? getArbeidsmiljøportalenBransje(restvirksomhetsdata.data.næringskode5Siffer)
            : ArbeidsmiljøportalenBransje.ANDRE_BRANSJER;

    return (
        <div className='arbeidsmiljøportal-panel'>
            <div className='arbeidsmiljøportal-panel__tittel-wrapper'>
                <img
                    src={arbeidsmiljøportalLogoSvg}
                    className="arbeidsmiljøportal-panel__logo"
                    alt="Logo for Arbeidsmiljøportalen"
                />
                <Systemtittel className="arbeidsmiljøportal-panel__tittel">
                    Bedre arbeidsmiljø kan forebygge sykefravær
                </Systemtittel>
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
