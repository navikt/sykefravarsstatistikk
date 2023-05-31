import React, { FunctionComponent } from 'react';
import { BransjeSammenligningspanel } from '../SammenligningMedBransje/BransjeSammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { SammenligningsType } from '../vurderingstekster';
import './EkspanderbarSammenligning.less';
import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { Statistikkategori } from '../../domene/statistikkategori';
import { getBransjeEllerNæringKategori } from './GetBransjeEllerNæringKategori';

interface Props {
    aggregertStatistikk: RestAggregertStatistikk;
    restPubliseringsdatoer: RestPubliseringsdatoer;
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
            <Skeleton
                className="ekspanderbart-sammenligningspanel__loading-skeleton"
                height={355}
            />
        );
    }

  const harBransje = getBransjeEllerNæringKategori(aggregertStatistikk) === Statistikkategori.BRANSJE;

    const [virksomhet, bransjeEllerNæring] = [
        aggregertStatistikk.aggregertData?.get(Statistikkategori.VIRKSOMHET),
        aggregertStatistikk.aggregertData?.get(
            harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
        ),
    ];
    return (
        <div className="ekspanderbar-sammenligning">
            <BransjeSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
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
        </div>
    );
};
