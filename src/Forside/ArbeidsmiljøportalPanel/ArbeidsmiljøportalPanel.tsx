import React, { FunctionComponent, useContext } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Nyhet } from '../../felleskomponenter/Nyhet/Nyhet';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import arbeidsmiljøportalLogoSvg from './arbeidsmiljøportal-logo.svg';
import { featureTogglesContext } from '../../utils/FeatureTogglesContext';
import { RestFeatureToggles } from '../../api/featureToggles';
import { RestStatus } from '../../api/api-utils';
import { RestVirksomhetMetadata } from '../../api/virksomhetMetadata';
import Skeleton from 'react-loading-skeleton';
import {
    getArbeidstilsynetBransje,
    getLenkeTilBransjensSideIArbeidsmiljøportalen,
} from './bransje-utils';

interface Props {
    restVirksomhetMetadata: RestVirksomhetMetadata;
}

export const ArbeidsmiljøportalPanel: FunctionComponent<Props> = ({ restVirksomhetMetadata }) => {
    const restFeatureToggles = useContext<RestFeatureToggles>(featureTogglesContext);
    if (
        restFeatureToggles.status === RestStatus.LasterInn ||
        !restFeatureToggles.data['sykefravarsstatistikk.arbeidsmiljoportal']
    ) {
        return null;
    }

    if (restVirksomhetMetadata.status === RestStatus.LasterInn) {
        return <Skeleton height={244} aria-label="laster inn" />;
    }
    if (restVirksomhetMetadata.status !== RestStatus.Suksess) {
        return null;
    }

    const bransje = getArbeidstilsynetBransje(restVirksomhetMetadata.data.næringskode5Siffer);

    return (
        <div className="arbeidsmiljøportal-panel">
            <div className="arbeidsmiljøportal-panel__tittel-wrapper">
                <img
                    src={arbeidsmiljøportalLogoSvg}
                    className="arbeidsmiljøportal-panel__logo"
                    alt="Logo for Arbeidsmiljøportalen"
                />
                <div className="arbeidsmiljøportal-panel__nyhet-og-tittel">
                    <Nyhet className="arbeidsmiljøportal-panel__nyhet" />
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
