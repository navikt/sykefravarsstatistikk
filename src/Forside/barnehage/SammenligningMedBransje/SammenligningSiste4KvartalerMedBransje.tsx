import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningSiste4KvartalerMedBransje.less';
import Panel from 'nav-frontend-paneler';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import InternLenke from '../../../felleskomponenter/InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../../../App';
import { HoyreChevron } from 'nav-frontend-chevron';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { getResultat, sykefraværForBarnehagerSiste4Kvartaler } from '../barnehage-utils';
import { nesteOppdatering } from '../../../utils/app-utils';
import Skeleton from 'react-loading-skeleton';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

const getResultatTekstForSammenligningMedBransjen = (sykefraværResultat: SykefraværResultat) => {
    switch (sykefraværResultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Du har <strong>lavere sykefravær</strong> enn andre barnehager i Norge
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt sykefravær</strong> som andre barnehager i Norge
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har <strong>høyere sykefravær</strong> enn andre barnehager i Norge
                </>
            );
    }
};

export const SammenligningSiste4KvartalerMedBransje: FunctionComponent<Props> = ({
    restSykefraværsvarighet,
}) => {
    if (
        restSykefraværsvarighet.status === RestStatus.LasterInn ||
        restSykefraværsvarighet.status === RestStatus.IkkeLastet
    ) {
        return <Skeleton className="sammenligning-med-bransje__loading-skeleton" height={355} />;
    }

    if (restSykefraværsvarighet.status !== RestStatus.Suksess) {
        return (
            <AlertStripeFeil className="sammenligning-med-bransje__feil">
                Kunne ikke vise sykefravær
            </AlertStripeFeil>
        ); // TODO Feilhåndtering
    }

    const varighet = restSykefraværsvarighet.data;

    const kvartaler = varighet.korttidsfraværSiste4Kvartaler.kvartaler.slice().reverse();

    const sykefraværVirksomhet =
        varighet.korttidsfraværSiste4Kvartaler.prosent +
        varighet.langtidsfraværSiste4Kvartaler.prosent;

    const sammenligningResultat = getResultat(
        sykefraværVirksomhet,
        sykefraværForBarnehagerSiste4Kvartaler.totalt
    );

    const sykefraværBransje = sykefraværForBarnehagerSiste4Kvartaler.totalt;

    return (
        <div className="sammenligning-med-bransje">
            <Systemtittel className="sammenligning-med-bransje__tittel">
                Legemeldt sykefravær: Dine tall
            </Systemtittel>
            <LesMerPanel
                className="sammenligning-med-bransje__utregningsinfo"
                åpneLabel="Slik har vi kommet fram til ditt resultat"
                lukkLabel="Lukk"
            >
                <div className="sammenligning-med-bransje__utregningsinfo-innhold">
                    <Normaltekst>Det er ikke tatt hensyn til virksomhetens størrelse.</Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <ul>
                        {kvartaler.map((kvartal) => (
                            <Normaltekst tag="li">
                                {kvartal.kvartal}. kvartal {kvartal.årstall}
                            </Normaltekst>
                        ))}
                    </ul>
                </div>
            </LesMerPanel>
            <Panel className="sammenligning-med-bransje__panel">
                <Ingress className="sammenligning-med-bransje__panel-tittel">
                    {getResultatTekstForSammenligningMedBransjen(sammenligningResultat)}
                </Ingress>
                <div className="sammenligning-med-bransje__ikon-og-tall">
                    <Speedometer
                        className="sammenligning-med-bransje__ikon"
                        stor
                        resultat={sammenligningResultat}
                    />
                    <div className="sammenligning-med-bransje__tall">
                        <Ingress className="sammenligning-med-bransje__virksomhet-tittel">
                            Din virksomhet:
                        </Ingress>
                        <Systemtittel>{formaterProsent(sykefraværVirksomhet)}&nbsp;%</Systemtittel>
                        <Ingress className="sammenligning-med-bransje__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel>{formaterProsent(sykefraværBransje)}&nbsp;%</Systemtittel>
                        <Normaltekst className="sammenligning-med-bransje__neste-oppdatering">
                            Neste oppdatering: {nesteOppdatering}
                        </Normaltekst>
                    </div>
                </div>
                <InternLenke
                    className="sammenligning-med-bransje__historikk-lenke"
                    pathname={PATH_HISTORIKK}
                >
                    Gå til sykefraværshistorikken <HoyreChevron />
                </InternLenke>
            </Panel>
        </div>
    );
};
