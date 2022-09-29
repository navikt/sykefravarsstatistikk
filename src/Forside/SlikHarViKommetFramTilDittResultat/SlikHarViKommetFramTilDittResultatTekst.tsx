import React, {FunctionComponent, ReactElement} from "react";
import {SykefraværVurdering} from "../Speedometer/Speedometer";
import {ÅrstallOgKvartal} from "../../utils/sykefraværshistorikk-utils";
import {Normaltekst} from "nav-frontend-typografi";
import "./SlikHarViKommetFramTilDittResultatTekst.less";
import {LenkeTilHistorikk} from "../../felleskomponenter/LenkeTilHistorikk";
import {getPeriodeMedDato, siste4PubliserteKvartaler} from "../../utils/app-utils";
import {RestPubliseringsdatoer} from "../../api/publiseringsdatoer-api";
import {RestStatus} from "../../api/api-utils";
import NavFrontendSpinner from "nav-frontend-spinner";

interface Props {
  resultat: SykefraværVurdering;
  kvartaler?: ÅrstallOgKvartal[];
  restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
                                                                                    resultat,
                                                                                    kvartaler,
                                                                                    restPubliseringsdatoer,
                                                                                  }) => {
  const getPeriodeElement = (): ReactElement => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
      return (
      <Normaltekst>{`Periode: `+ getPeriodeMedDato(restPubliseringsdatoer.data.gjeldendePeriode)}</Normaltekst>
      )
    } else if (
        restPubliseringsdatoer.status === RestStatus.LasterInn ||
        restPubliseringsdatoer.status === RestStatus.IkkeLastet
    ) {
      return <NavFrontendSpinner/>
    } else {
      return <Normaltekst>{""}</Normaltekst>
    }
  }

  switch (resultat) {
    case SykefraværVurdering.OVER:
    case SykefraværVurdering.MIDDELS:
    case SykefraværVurdering.UNDER:
      return (
          <>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
              som NAV og Statistisk sentralbyrå (SSB) utarbeider.
            </Normaltekst>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Sammenligningen tar ikke ta hensyn til din virksomhetens størrelse.
            </Normaltekst>
            <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
            <Kvartalsliste kvartaler={kvartaler}/>
            <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total"/>
          </>
      );
    case SykefraværVurdering.MASKERT:
      return (
          <>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
              som NAV og Statistisk sentralbyrå (SSB) utarbeider.
            </Normaltekst>
            <Normaltekst>
              Sammenligningen tar ikke ta hensyn til din virksomhetens størrelse.
            </Normaltekst>
            <Normaltekst>
              Bransjens tall er beregnet på sykefraværsstatistikk fra:
            </Normaltekst>
            {getPeriodeElement()}
            <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total"/>
          </>
      );
    case SykefraværVurdering.UFULLSTENDIG_DATA:
      return (
          <>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
              som NAV og Statistisk sentralbyrå (SSB) utarbeider.
            </Normaltekst>
            <Normaltekst>Dine tall er beregnet på sykefraværsstatistikk fra:</Normaltekst>
            <Kvartalsliste kvartaler={kvartaler}/>
            <Normaltekst>
              Bransjens tall er beregnet på sykefraværsstatistikk fra:
            </Normaltekst>
            <Kvartalsliste kvartaler={siste4PubliserteKvartaler}/>
            <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total"/>
          </>
      );
    case SykefraværVurdering.INGEN_DATA:
      return (
          <>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
              som NAV og Statistisk sentralbyrå (SSB) utarbeider.
            </Normaltekst>
            <Normaltekst>
              Bransjens tall er beregnet på sykefraværsstatistikk fra:
            </Normaltekst>
            <Kvartalsliste kvartaler={siste4PubliserteKvartaler}/>
          </>
      );
    case SykefraværVurdering.FEIL:
      return (
          <>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
              som NAV og Statistisk sentralbyrå (SSB) utarbeider.
            </Normaltekst>
            <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
              Tallene er beregnet på sykefraværsstatistikk fra:
            </Normaltekst>
            <Normaltekst>—</Normaltekst>
          </>
      );
    default:
      return null;
  }
};

const Kvartalsliste: FunctionComponent<{ kvartaler?: ÅrstallOgKvartal[] }> = ({kvartaler}) => (
    <ul className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__kvartalsliste">
      {kvartaler?.map((kvartal, index) => (
          <Normaltekst tag="li" key={index}>
            {kvartal.kvartal}. kvartal {kvartal.årstall}
          </Normaltekst>
      ))}
    </ul>
);
