import React, { FunctionComponent } from 'react';
import { BransjeSammenligningspanel } from '../SammenligningMedBransje/BransjeSammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import { SammenligningsType } from '../vurderingstekster';
import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { Statistikkategori } from '../../domene/statistikkategori';
import { getBransjeEllerNæringKategori } from './GetBransjeEllerNæringKategori';
import { Skeleton } from '@navikt/ds-react';

interface Props {
    aggregertStatistikk: RestAggregertStatistikk;
}

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({ aggregertStatistikk }) => {
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
            <BransjeSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerTotalt}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerTotalt}
                sammenligningsType={SammenligningsType.TOTALT}
            />
            <BransjeSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerGradert}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerGradert}
                sammenligningsType={SammenligningsType.GRADERT}
            />
            <BransjeSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerKorttid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerKorttid}
                sammenligningsType={SammenligningsType.KORTTID}
            />
            <BransjeSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerLangtid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerLangtid}
                sammenligningsType={SammenligningsType.LANGTID}
            />
        </>
    );
};
