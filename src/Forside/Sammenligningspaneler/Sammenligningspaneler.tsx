import React, { FunctionComponent, useEffect } from 'react';
import { Sammenligningspanel } from '../SammenligningMedBransje/Sammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import { SammenligningsType } from '../vurderingstekster';
import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { Statistikkategori } from '../../domene/statistikkategori';
import { getBransjeEllerNæringKategori } from './GetBransjeEllerNæringKategori';
import { Skeleton } from '@navikt/ds-react';
import { sendSykefraværsstatistikkIaMetrikk } from '../../metrikker/iatjenester';

interface Props {
    aggregertStatistikk: RestAggregertStatistikk;
    orgnr: string;
    skalSendeMetrikkerAutomatisk?: boolean;
}

export const Sammenligningspaneler: FunctionComponent<Props> = ({
    aggregertStatistikk,
    orgnr,
    skalSendeMetrikkerAutomatisk = true,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (skalSendeMetrikkerAutomatisk) {
                sendSykefraværsstatistikkIaMetrikk(orgnr);
            }
        }, 5000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgnr]);

    if (
        aggregertStatistikk.restStatus === RestStatus.IngenTilgang ||
        aggregertStatistikk.restStatus === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        aggregertStatistikk.restStatus === RestStatus.LasterInn ||
        aggregertStatistikk.restStatus === RestStatus.IkkeLastet
    ) {
        return (
            <>
                <Skeleton
                    className="bransje-sammenligningspanel__loading-skeleton"
                    variant="rectangle"
                    height={352}
                />
                <Skeleton
                    className="bransje-sammenligningspanel__loading-skeleton"
                    variant="rectangle"
                    height={500}
                />
                <Skeleton
                    className="bransje-sammenligningspanel__loading-skeleton"
                    variant="rectangle"
                    height={351}
                />
                <Skeleton
                    className="bransje-sammenligningspanel__loading-skeleton"
                    variant="rectangle"
                    height={352}
                />
            </>
        );
    }

    const harBransje =
        getBransjeEllerNæringKategori(aggregertStatistikk) === Statistikkategori.BRANSJE;

    const [virksomhet, bransjeEllerNæring] = [
        aggregertStatistikk.aggregertData?.get(Statistikkategori.VIRKSOMHET),
        aggregertStatistikk.aggregertData?.get(
            harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
        ),
    ];
    return (
        <>
            <Sammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerTotalt}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerTotalt}
                sammenligningsType={SammenligningsType.TOTALT}
            />
            <Sammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerGradert}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerGradert}
                sammenligningsType={SammenligningsType.GRADERT}
            />
            <Sammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerKorttid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerKorttid}
                sammenligningsType={SammenligningsType.KORTTID}
            />
            <Sammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerLangtid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerLangtid}
                sammenligningsType={SammenligningsType.LANGTID}
            />
        </>
    );
};
