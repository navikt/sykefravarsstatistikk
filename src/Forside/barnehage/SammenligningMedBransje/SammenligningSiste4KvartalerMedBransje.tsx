import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningSiste4KvartalerMedBransje.less';
import Panel from 'nav-frontend-paneler';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import InternLenke from '../../../felleskomponenter/InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../../../App';
import { HoyreChevron } from 'nav-frontend-chevron';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { RestSykefraværsvarighet, Sykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { getResultat, sykefraværForBarnehagerSiste4Kvartaler } from '../barnehage-utils';
import { nesteOppdatering } from '../../../utils/app-utils';
import Skeleton from 'react-loading-skeleton';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

const getResultatTekstForSammenligningMedBransjen = (
    sykefraværResultat: SykefraværResultat
): ReactElement | string => {
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
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return 'Vi mangler tall for deler av perioden med sammenligning.';
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};

const getSykefraværVirksomhet = (varighet: Sykefraværsvarighet): number => {
    if (
        varighet.korttidsfraværSiste4Kvartaler.prosent === null ||
        varighet.langtidsfraværSiste4Kvartaler.prosent === null
    ) {
        return 0;
    }

    return (
        varighet.korttidsfraværSiste4Kvartaler.prosent +
        varighet.langtidsfraværSiste4Kvartaler.prosent
    );
};

const getResultatForTotaltSykefravær = (
    restSykefraværsvarighet: RestSykefraværsvarighet
): SykefraværResultat => {
    switch (restSykefraværsvarighet.status) {
        case RestStatus.Suksess:
            const antallKvartaler =
                restSykefraværsvarighet.data.langtidsfraværSiste4Kvartaler.kvartaler.length;

            if (antallKvartaler === 0) {
                return SykefraværResultat.INGEN_DATA;
            } else if (antallKvartaler < 4) {
                return SykefraværResultat.UFULLSTENDIG_DATA;
            }

            const langtid = restSykefraværsvarighet.data.langtidsfraværSiste4Kvartaler.prosent;
            const korttid = restSykefraværsvarighet.data.korttidsfraværSiste4Kvartaler.prosent;
            if (langtid === null || korttid === null) {
                return SykefraværResultat.INGEN_DATA;
            }
            return getResultat(korttid + langtid, sykefraværForBarnehagerSiste4Kvartaler.totalt);

        case RestStatus.Feil:
        case RestStatus.IngenTilgang:
            return SykefraværResultat.FEIL;
        default:
            return SykefraværResultat.FEIL;
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

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;
    const kvartaler = varighet?.korttidsfraværSiste4Kvartaler.kvartaler.slice().reverse();
    const sykefraværVirksomhet = varighet && getSykefraværVirksomhet(varighet);
    const sammenligningResultat = getResultatForTotaltSykefravær(restSykefraværsvarighet);

    const sykefraværBransje = sykefraværForBarnehagerSiste4Kvartaler.totalt;

    const antallKvartalerVirksomhet =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ? (
            <>
                <strong> / {kvartaler?.length} av 4 kvartaler</strong>
            </>
        ) : null;

    const antallKvartalerBransje =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ? (
            <>
                <strong> / 4 av 4 kvartaler</strong>
            </>
        ) : null;

    return (
        <div className="sammenligning-med-bransje">
            <Systemtittel className="sammenligning-med-bransje__tittel">
                Legemeldt sykefravær siste 4 kvartal
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
                        {kvartaler?.map((kvartal, index) => (
                            <Normaltekst tag="li" key={index}>
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
                            Din virksomhet{antallKvartalerVirksomhet}:
                        </Ingress>
                        <Systemtittel>{formaterProsent(sykefraværVirksomhet)}&nbsp;%</Systemtittel>
                        <Ingress className="sammenligning-med-bransje__bransje-tittel">
                            Barnehager i Norge{antallKvartalerBransje}:
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
