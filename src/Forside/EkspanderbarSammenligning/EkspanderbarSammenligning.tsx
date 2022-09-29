import React, {FunctionComponent} from 'react';
import {Statistikkategori} from '../../api/summert-sykefraværshistorikk-api';
import {
  EkspanderbartSammenligningspanel,
  getVurdering,
} from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import {RestStatus} from '../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import {SammenligningsType} from '../vurderingstekster';
import {SammenligningIngress} from '../SammenligningIngress/SammenligningIngress';
import {
  SlikHarViKommetFramTilDittResultat,
} from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import './EkspanderbarSammenligning.less';
import {DinNæringEllerBransje} from './DinNæringEllerBransje/DinNæringEllerBransje';
import {Element} from 'nav-frontend-typografi';
import {AggregertStatistikkResponse} from '../../hooks/useAggregertStatistikk';
import {RestPubliseringsdatoer} from "../../api/publiseringsdatoer-api";

interface Props {
  aggregertStatistikk: AggregertStatistikkResponse;
  restPubliseringsdatoer: RestPubliseringsdatoer;
}

const getBransjeEllerNæringKategori = (aggregertStatistikk: AggregertStatistikkResponse) => {
  if (aggregertStatistikk.aggregertData?.has(Statistikkategori.BRANSJE)) return Statistikkategori.BRANSJE;
  if (aggregertStatistikk.aggregertData?.has(Statistikkategori.NÆRING)) return Statistikkategori.NÆRING;
  return undefined
}

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({
                                                                      aggregertStatistikk,
                                                                      restPubliseringsdatoer
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

  const [virksomhet, BransjeEllerNæring] = [
    aggregertStatistikk.aggregertData?.get(Statistikkategori.VIRKSOMHET),
    aggregertStatistikk.aggregertData?.get(harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING),
  ]

  return (
      <div className="ekspanderbar-sammenligning">
        <SammenligningIngress harBransje={harBransje}/>
        <SlikHarViKommetFramTilDittResultat
            resultat={getVurdering(virksomhet?.prosentSiste4KvartalerTotalt, BransjeEllerNæring?.prosentSiste4KvartalerTotalt)}
            kvartaler={virksomhet?.prosentSiste4KvartalerTotalt?.kvartalerIBeregningen}
        />
        <DinNæringEllerBransje
            restStatus={aggregertStatistikk.restStatus}
            statistikKategori={statistikKategori}
            label={BransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label || ""}
        />
        <Element className="ekspanderbar-sammenligning__undertittel">
          Overordnet sammenligning:
        </Element>
        <EkspanderbartSammenligningspanel
            className="ekspanderbar-sammenligning__sammenligning-totalt"
            virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerTotalt}
            bransjeEllerNæringStatistikk={BransjeEllerNæring?.prosentSiste4KvartalerTotalt}
            sammenligningsType={SammenligningsType.TOTALT}
            harBransje={harBransje}
            restPubliseringsdatoer={restPubliseringsdatoer}
        />
        <Element className="ekspanderbar-sammenligning__undertittel">
          Detaljert sammenligning:
        </Element>
        <EkspanderbartSammenligningspanel
            virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerGradert}
            bransjeEllerNæringStatistikk={BransjeEllerNæring?.prosentSiste4KvartalerGradert}
            sammenligningsType={SammenligningsType.GRADERT}
            harBransje={harBransje}
            restPubliseringsdatoer={restPubliseringsdatoer}
        />
        <EkspanderbartSammenligningspanel
            virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerKorttid}
            bransjeEllerNæringStatistikk={BransjeEllerNæring?.prosentSiste4KvartalerKorttid}
            sammenligningsType={SammenligningsType.KORTTID}
            harBransje={harBransje}
            restPubliseringsdatoer={restPubliseringsdatoer}
        />
        <EkspanderbartSammenligningspanel
            virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerLangtid}
            bransjeEllerNæringStatistikk={BransjeEllerNæring?.prosentSiste4KvartalerLangtid}
            sammenligningsType={SammenligningsType.LANGTID}
            harBransje={harBransje}
            restPubliseringsdatoer={restPubliseringsdatoer}
        />
      </div>
  );
};
