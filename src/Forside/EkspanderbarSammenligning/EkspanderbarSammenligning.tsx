import React, { FunctionComponent } from 'react';
import {
    EkspanderbartSammenligningspanel,

} from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { SammenligningsType } from '../vurderingstekster';
import { SammenligningIngress } from '../SammenligningIngress/SammenligningIngress';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import './EkspanderbarSammenligning.less';
import { DinNæringEllerBransje } from './DinNæringEllerBransje/DinNæringEllerBransje';
import { Element } from 'nav-frontend-typografi';
import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import {RestPubliseringsdatoer} from "../../api/publiseringsdatoer-api";
import { sammenliknSykefravær } from "../vurdering-utils";
import { Statistikkategori } from "../../domene/statistikkategori";

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
        aggregertStatistikk.aggregertData?.get(
            harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
        ),
    ];

  return (
      <div className="ekspanderbar-sammenligning">
        <SammenligningIngress harBransje={harBransje}/>
        <SlikHarViKommetFramTilDittResultat
            resultat={sammenliknSykefravær(virksomhet?.prosentSiste4KvartalerTotalt, BransjeEllerNæring?.prosentSiste4KvartalerTotalt)}
            kvartaler={virksomhet?.prosentSiste4KvartalerTotalt?.kvartalerIBeregningen}
            restPubliseringsdatoer={restPubliseringsdatoer}
        />
        <DinNæringEllerBransje
            restStatus={aggregertStatistikk.restStatus}
            statistikKategori={statistikKategori}
            label={BransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label || ''}
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
