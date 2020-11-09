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
    getBransjenavn,
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
        return null; // TODO
    }

    const bransje = getArbeidstilsynetBransje(restVirksomhetMetadata.data.næringskode5Siffer);

    const bransjenavn = getBransjenavn(bransje);

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
                        Dette påvirker arbeidsmiljøet i {bransjenavn}
                    </Systemtittel>
                </div>
            </div>
            <div className="arbeidsmiljøportal-panel__tekst-wrapper">
                <Normaltekst className="arbeidsmiljøportal-panel__venstreblokk">
                    Arbeidsmiljøet handler om hvordan vi planlegger, organiserer og gjennomfører
                    selve jobben. For å forebygge arbeidsrelatert sykefravær, bør du vite hvor skoen
                    trykker.
                </Normaltekst>
                <div className="arbeidsmiljøportal-panel__høyreblokk">
                    <ul className="arbeidsmiljøportal-panel__liste">
                        <li className="arbeidsmiljøportal-panel__listeelement">
                            Se forebyggingspotensialet i {bransjenavn}
                        </li>
                        <li className="arbeidsmiljøportal-panel__listeelement">
                            Verktøy tilpasset din bransje
                        </li>
                    </ul>
                    <EksternLenke href={getLenkeTilBransjensSideIArbeidsmiljøportalen(bransje)}>
                        Gå til Arbeidsmiljøportalen
                    </EksternLenke>
                </div>
            </div>
        </div>
    );
};
