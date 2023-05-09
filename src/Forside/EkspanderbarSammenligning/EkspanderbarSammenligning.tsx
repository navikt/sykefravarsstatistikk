import React, { FunctionComponent } from 'react';
import { SykefravarasstatistikkSammenligningspanel } from '../SammenligningMedBransje/SykefravarasstatistikkSammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { SammenligningsType } from '../vurderingstekster';
import { SammenligningIngress } from '../SammenligningIngress/SammenligningIngress';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import './EkspanderbarSammenligning.less';
import { DinNæringEllerBransje } from './DinNæringEllerBransje/DinNæringEllerBransje';
import { Element } from 'nav-frontend-typografi';
import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { sammenliknSykefravær } from '../vurdering-utils';
import { Statistikkategori } from '../../domene/statistikkategori';

interface Props {
    aggregertStatistikk: RestAggregertStatistikk;
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

const getBransjeEllerNæringKategori = (aggregertStatistikk: RestAggregertStatistikk) => {
    const bransjedata = aggregertStatistikk.aggregertData?.get(Statistikkategori.BRANSJE)
        ?.prosentSiste4KvartalerTotalt?.verdi;
    if (bransjedata !== undefined) return Statistikkategori.BRANSJE;
    return Statistikkategori.NÆRING;
};

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({
    aggregertStatistikk,
    restPubliseringsdatoer,
}) => {
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

    const statistikKategori = getBransjeEllerNæringKategori(aggregertStatistikk);
    const harBransje = statistikKategori === Statistikkategori.BRANSJE;

    const [virksomhet, bransjeEllerNæring] = [
        aggregertStatistikk.aggregertData?.get(Statistikkategori.VIRKSOMHET),
        aggregertStatistikk.aggregertData?.get(
            harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
        ),
    ];

    return (
        <div className="ekspanderbar-sammenligning">
            <SammenligningIngress harBransje={harBransje} />
            <SlikHarViKommetFramTilDittResultat
                resultat={sammenliknSykefravær(
                    virksomhet?.prosentSiste4KvartalerTotalt,
                    bransjeEllerNæring?.prosentSiste4KvartalerTotalt
                )}
                kvartaler={virksomhet?.prosentSiste4KvartalerTotalt?.kvartalerIBeregningen}
                restPubliseringsdatoer={restPubliseringsdatoer}
            />
            <DinNæringEllerBransje
                restStatus={aggregertStatistikk.restStatus}
                statistikKategori={statistikKategori}
                label={bransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label || ''}
            />
            <Element className="ekspanderbar-sammenligning__undertittel">
                Overordnet sammenligning:
            </Element>
            <SykefravarasstatistikkSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerTotalt}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerTotalt}
                sammenligningsType={SammenligningsType.TOTALT}
                harBransje={harBransje}
                restPubliseringsdatoer={restPubliseringsdatoer}
            />
            <Element className="ekspanderbar-sammenligning__undertittel">
                Detaljert sammenligning:
            </Element>
            <SykefravarasstatistikkSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerGradert}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerGradert}
                sammenligningsType={SammenligningsType.GRADERT}
                harBransje={harBransje}
                restPubliseringsdatoer={restPubliseringsdatoer}
            />
            <SykefravarasstatistikkSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerKorttid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerKorttid}
                sammenligningsType={SammenligningsType.KORTTID}
                harBransje={harBransje}
                restPubliseringsdatoer={restPubliseringsdatoer}
            />
            <SykefravarasstatistikkSammenligningspanel
                virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerLangtid}
                bransjeEllerNæringStatistikk={bransjeEllerNæring?.prosentSiste4KvartalerLangtid}
                sammenligningsType={SammenligningsType.LANGTID}
                harBransje={harBransje}
                restPubliseringsdatoer={restPubliseringsdatoer}
            />
        </div>
    );
};
