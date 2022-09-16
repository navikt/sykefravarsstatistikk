import React, {FunctionComponent, ReactElement, useContext, useState} from 'react';
import {Ingress, Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import {Speedometer, SykefraværVurdering} from '../Speedometer/Speedometer';
import {
  getForklaringAvVurdering,
  getVurderingstekst,
  SammenligningsType
} from '../vurderingstekster';
import {EkspanderbartpanelBase} from 'nav-frontend-ekspanderbartpanel';
import {ForklaringAvPeriode} from './ForklaringAvPeriode';
import {DetaljertVisningSykefravær} from './DetaljertVisningSykefravær';
import {TipsVisning} from '../../felleskomponenter/tips/TipsVisning';
import {getTips, Tips} from '../../felleskomponenter/tips/tips';
import lyspære from './lyspære-liten.svg';
import classNames from 'classnames';
import {OppChevron} from 'nav-frontend-chevron';
import {Kakediagram} from '../Kakediagram/Kakediagram';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
import {OmGradertSykmelding} from '../../felleskomponenter/OmGradertSykmelding/OmGradertSykmelding';
import {sendPanelEkspanderEvent, sendPanelKollapsEvent} from '../../amplitude/events';
import {useOrgnr} from '../../hooks/useOrgnr';
import {iaTjenesterMetrikkerContext} from '../../metrikker/IaTjenesterMetrikkerContext';
import {sendIaTjenesteMetrikkMottattEvent} from '../../metrikker/iatjenester';
import {StatistikkType} from '../../hooks/useAggregertStatistikk';

interface Props {
  sammenligningsType: SammenligningsType;
  virksomhetStatistikk?: StatistikkType;
  bransjeEllerNæringStatistikk?: StatistikkType;
  harBransje: boolean;
  defaultÅpen?: boolean;
  className?: string;
}

export const parseVerdi = (verdi: string) => {
  return parseFloat(verdi.replace(",", "."));
};

export const getVurdering = (virksomhet?: StatistikkType, bransjeEllerNæring?: StatistikkType) => {

  if (virksomhet === undefined && bransjeEllerNæring === undefined) return SykefraværVurdering.INGEN_DATA;
  if (virksomhet === undefined && bransjeEllerNæring !== undefined) return SykefraværVurdering.MASKERT;

  const antallKvartaler = virksomhet?.kvartalerIBeregningen.length || 0;

  if (antallKvartaler < 4) return SykefraværVurdering.UFULLSTENDIG_DATA;
  if (virksomhet?.verdi === undefined || bransjeEllerNæring?.verdi === undefined) return SykefraværVurdering.UFULLSTENDIG_DATA;

  const virksomhetVerdi = parseVerdi(virksomhet.verdi);
  const bransjeEllerNæringVerdi = parseVerdi(bransjeEllerNæring.verdi);

  if (virksomhetVerdi > (bransjeEllerNæringVerdi * 1.1)) return SykefraværVurdering.OVER;
  if (virksomhetVerdi < (bransjeEllerNæringVerdi * 0.9)) return SykefraværVurdering.UNDER;
  return SykefraværVurdering.MIDDELS
}

const antallKvartalerVirksomhet = (sammenligningVurdering: SykefraværVurdering, antallKvartaler?: number) => {
  if (
      sammenligningVurdering === SykefraværVurdering.UFULLSTENDIG_DATA
      || sammenligningVurdering === SykefraværVurdering.INGEN_DATA
  ) return <strong> {antallKvartaler || 0} av 4 kvartaler</strong>;

  return null;
}

const antallKvartalerBransje = (sammenligningVurdering: SykefraværVurdering) => {
  if (
      sammenligningVurdering === SykefraværVurdering.UFULLSTENDIG_DATA
      || sammenligningVurdering === SykefraværVurdering.INGEN_DATA
  ) return <strong>4 av 4 kvartaler</strong>

  return null;
}


export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
                                                                             sammenligningsType,
                                                                             harBransje,
                                                                             defaultÅpen,
                                                                             className,
                                                                             virksomhetStatistikk,
                                                                             bransjeEllerNæringStatistikk
                                                                           }) => {
  const [erÅpen, setErÅpen] = useState<boolean>(!!defaultÅpen);
  const panelknappID = 'ekspanderbart-sammenligningspanel__tittel-knapp-' + sammenligningsType;
  const orgnr = useOrgnr();
  const context = useContext(iaTjenesterMetrikkerContext);

  const sykefraværVurdering = getVurdering(virksomhetStatistikk, bransjeEllerNæringStatistikk)

  const overskriftForTallForNæringEllerBransje = harBransje ? 'Din bransje:' : 'Din næring:';

  const innhold = (
      <>
        {sammenligningsType === SammenligningsType.GRADERT && (
            <div className="ekspanderbart-sammenligningspanel__gradert_intro">
              <Ingress>Slik regner vi ut prosenten på gradert sykmelding:</Ingress>
              <Normaltekst className="ekspanderbart-sammenligningspanel__utregningsforklring-tekst">
                Vi teller antall fraværsdager med bruk av gradert sykmelding. Så beregner vi
                hvor stor andel disse utgjør av alle legemeldte fraværsdager i din
                virksomhet.
              </Normaltekst>
              <LesMerPanel
                  åpneLabel={'Se eksempel'}
                  className="ekspanderbart-sammenligningspanel__les-mer-gradert-eksempel"
              >
                <Normaltekst
                    className="ekspanderbart-sammenligningspanel__les-mer-gradert-eksempel__innhold">
                  La oss si du har 7,5% sykefravær, dette utgjør 100 tapte dagsverk i din
                  virksomhet. Det ble benyttet gradert sykmelding i 20 dager, da får du
                  20% gradert sykmelding.
                </Normaltekst>
              </LesMerPanel>
            </div>
        )}
        <div className="ekspanderbart-sammenligningspanel__data-og-detaljert-visning-sykefravær">
          <ForklaringAvPeriode
              className="ekspanderbart-sammenligningspanel__forklaring-av-periode"
              sammenligningsType={sammenligningsType}
          />
          <DetaljertVisningSykefravær
              className="ekspanderbart-sammenligningspanel__detaljert-visning"
              overskrift="Din virksomhet:"
              prosent={virksomhetStatistikk?.verdi}
              visingAntallKvartaller={antallKvartalerVirksomhet(sykefraværVurdering, virksomhetStatistikk?.kvartalerIBeregningen.length)}
          />
          <DetaljertVisningSykefravær
              className="ekspanderbart-sammenligningspanel__detaljert-visning"
              overskrift={overskriftForTallForNæringEllerBransje}
              prosent={bransjeEllerNæringStatistikk?.verdi}
              visingAntallKvartaller={antallKvartalerBransje(sykefraværVurdering)}
          />
        </div>
        {sammenligningsType === SammenligningsType.GRADERT ? (
            <OmGradertSykmelding vurdering={sykefraværVurdering}/>
        ) : (
            <div className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering">
              {getForklaringAvVurdering(
                  sykefraværVurdering,
                  bransjeEllerNæringStatistikk?.verdi
                      ? parseVerdi(bransjeEllerNæringStatistikk?.verdi)
                      : undefined
              )}
            </div>
        )}
      </>
  );

  const tipsliste: Tips[] = getTips(sammenligningsType);
  const harTips = tipsliste.length > 0;

  const vurderingstekst = getVurderingstekst(sykefraværVurdering, sammenligningsType, harBransje);

  const getPaneltittel = (): ReactElement | string => {
    switch (sammenligningsType) {
      case SammenligningsType.TOTALT:
        return vurderingstekst;
      case SammenligningsType.KORTTID:
        return 'Legemeldt korttidsfravær:';
      case SammenligningsType.LANGTID:
        return 'Legemeldt langtidsfravær:';
      case SammenligningsType.GRADERT:
        return 'Gradert sykmelding:';
    }
  };

  return (
      <div className={classNames('ekspanderbart-sammenligningspanel', className)}>
        <EkspanderbartpanelBase
            onClick={() => {
              const skalPaneletÅpnes = !erÅpen;
              setErÅpen(skalPaneletÅpnes);
              if (skalPaneletÅpnes) {
                sendPanelEkspanderEvent(sammenligningsType);
                sendIaTjenesteMetrikkMottattEvent(orgnr, context);
              } else {
                sendPanelKollapsEvent(sammenligningsType);
              }
            }}
            apen={erÅpen}
            id={panelknappID}
            tittel={
              <div className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                {SammenligningsType.GRADERT === sammenligningsType ? (
                    <Kakediagram
                        resultat={sykefraværVurdering}
                        className={'ekspanderbart-sammenligningspanel__kakediagram'}
                    />
                ) : (
                    <Speedometer resultat={sykefraværVurdering} inline/>
                )}
                <div className="ekspanderbart-sammenligningspanel__tittel-tekst">
                  <Systemtittel tag="h2">{getPaneltittel()}</Systemtittel>
                  {sammenligningsType !== SammenligningsType.TOTALT && (
                      <Normaltekst className="ekspanderbart-sammenligningspanel__tittel-forklaring">
                        {vurderingstekst}
                      </Normaltekst>
                  )}
                  <Normaltekst
                      className={classNames(
                          'ekspanderbart-sammenligningspanel__les-mer',
                          'ekspanderbart-sammenligningspanel__les-mer--' +
                          (erÅpen ? 'åpen' : 'lukket')
                      )}
                  >
                    Les mer om tallene
                  </Normaltekst>
                </div>
              </div>
            }
            className="ekspanderbart-sammenligningspanel__panel"
        >
          <div className="ekspanderbart-sammenligningspanel__innhold">
            {innhold}
            {harTips && (
                <div className="ekspanderbart-sammenligningspanel__tips-tittel">
                  <img
                      className="ekspanderbart-sammenligningspanel__bilde"
                      src={lyspære}
                      alt=""
                  />
                  <Ingress>Dette kan du gjøre</Ingress>
                </div>
            )}
            {tipsliste.map((tips) => (
                <TipsVisning
                    key={tips.id}
                    tips={tips}
                    className={'ekspanderbart-sammenligningspanel__tips'}
                />
            ))}
            <button
                className="ekspanderbart-sammenligningspanel__lukk-knapp"
                onClick={() => {
                  setErÅpen(false);
                  const panelknapp = document.getElementById(panelknappID);
                  panelknapp && panelknapp.scrollIntoView({behavior: 'smooth'});
                }}
            >
              <span className="typo-normal ">Lukk</span>
              <OppChevron className="ekspanderbart-sammenligningspanel__lukk-chevron"/>
            </button>
          </div>
        </EkspanderbartpanelBase>
        <div className="ekspanderbart-sammenligningspanel__print-innhold">{innhold}</div>
      </div>
  );
};
