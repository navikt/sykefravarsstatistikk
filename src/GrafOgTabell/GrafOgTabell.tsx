import React, { FunctionComponent, useEffect, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { ToggleGruppePure } from 'nav-frontend-toggle';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import './GrafOgTabell.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { scrollToBanner } from '../utils/scrollUtils';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useOrgnr } from '../utils/orgnr-hook';
import { useSendIaTjenesteMetrikkMottattVedSidevisningEvent } from '../metrikker/iatjenester';
import { useSendSidevisningEvent } from '../amplitude/events';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

const GrafOgTabell: FunctionComponent<Props> = (props) => {
    const orgnr = useOrgnr();

    useEffect(() => {
        scrollToBanner();
    }, []);

    useSendSidevisningEvent('historikk', orgnr);
    useSendIaTjenesteMetrikkMottattVedSidevisningEvent();

    const { restSykefraværsstatistikk } = props;
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf' | 'tabell'>('graf');

    let innhold;

    if (
        restSykefraværsstatistikk.status === RestStatus.LasterInn ||
        restSykefraværsstatistikk.status === RestStatus.IkkeLastet
    ) {
        innhold = (
            <div className="graf-og-tabell__spinner">
                <NavFrontendSpinner type={'XXL'} />
            </div>
        );
    } else if (restSykefraværsstatistikk.status === RestStatus.IngenTilgang) {
        innhold = (
            <ManglerRettigheterIAltinnSide
                restOrganisasjonerMedStatistikk={props.restOrganisasjonerMedStatistikk}
            />
        );
    } else if (restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        innhold = (
            <AlertStripe type="feil" className="graf-og-tabell__feilside">
                Det skjedde en feil da vi prøvde å hente statistikken.
            </AlertStripe>
        );
    } else {
        innhold =
            grafEllerTabell === 'graf' ? (
                <Graf sykefraværshistorikk={restSykefraværsstatistikk.data} />
            ) : (
                <Tabell sykefraværshistorikk={restSykefraværsstatistikk.data} />
            );
    }

    return (
        <div className="graf-og-tabell__wrapper">

            <div className="graf-og-tabell">
                {restSykefraværsstatistikk.status !== RestStatus.IngenTilgang ? (
                    <div className="graf-og-tabell__overdel-wrapper">
                        <div className="graf-og-tabell__tekst-wrapper">
                            <Systemtittel tag="h1" className="graf-og-tabell__tittel">
                                Se sykefraværet over tid
                            </Systemtittel>
                            <Normaltekst className="graf-og-tabell__ingress">
                                Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du kan
                                sammenligne sykefraværet deres med næringen og sektoren dere
                                tilhører.
                            </Normaltekst>
                        </div>
                        <ToggleGruppePure
                            className="graf-og-tabell__knapper"
                            toggles={[
                                {
                                    children: 'Graf',
                                    pressed: grafEllerTabell === 'graf',
                                    onClick: () => setGrafEllerTabell('graf'),
                                },
                                {
                                    children: 'Tabell',
                                    pressed: grafEllerTabell === 'tabell',
                                    onClick: () => {
                                        setGrafEllerTabell('tabell');
                                    },
                                },
                            ]}
                        />
                    </div>
                ) : (
                    innhold
                )}
                {restSykefraværsstatistikk.status !== RestStatus.IngenTilgang && (
                    <div className="graf-og-tabell__innhold">{innhold}</div>
                )}
            </div>
        </div>
    );
};

export default GrafOgTabell;
