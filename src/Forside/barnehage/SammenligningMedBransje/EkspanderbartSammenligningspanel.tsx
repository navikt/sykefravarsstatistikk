import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import { Speedometer, SykefraværVurdering } from '../Speedometer/Speedometer';
import {
    getForklaringAvVurdering,
    getVurderingstekst,
    SammenligningsType,
} from '../vurderingstekster';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { SykefraværMetadata } from './SykefraværMetadata';
import { DetaljertVisningSykefravær } from './DetaljertVisningSykefravær';
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import { getTips, Tips } from '../../../felleskomponenter/tips/tips';
import lyspære from './lyspære-liten.svg';
import classNames from 'classnames';
import { useSendEvent } from '../../../amplitude/amplitude';
import { Bransjetype } from '../../../api/virksomhetMetadata';
import { OppChevron } from 'nav-frontend-chevron';
import { Kakediagram } from '../Kakediagram/Kakediagram';
import Lenke from 'nav-frontend-lenker';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';

interface Props {
    sammenligningResultat: SykefraværVurdering;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number | null | undefined;
    antallKvartalerVirksomhet: ReactElement | null;
    antallKvartalerBransje: ReactElement | null;
    sammenligningsType: SammenligningsType;
    bransje: Bransjetype | undefined;
    harBransje: boolean;
    defaultÅpen?: boolean;
    className?: string;
}

export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
    sammenligningResultat: sykefraværResultat,
    sykefraværVirksomhet,
    sykefraværBransje,
    antallKvartalerVirksomhet,
    antallKvartalerBransje,
    sammenligningsType,
    bransje,
    harBransje,
    defaultÅpen,
    className,
}) => {
    const [erÅpen, setErÅpen] = useState<boolean>(!!defaultÅpen);
    const sendEvent = useSendEvent();
    const panelknappID = 'ekspanderbart-sammenligningspanel__tittel-knapp-' + sammenligningsType;

    const visningAvProsentForBransje: number | null | undefined =
        sykefraværResultat === SykefraværVurdering.FEIL ? null : sykefraværBransje;

    const getPanelEventtekst = (sammenligningsType: SammenligningsType) => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return 'totalfravær';
            case SammenligningsType.KORTTID:
                return 'korttidsfravær';
            case SammenligningsType.LANGTID:
                return 'langtidsfravær';
        }
    };
    let overskriftForTallForNæringEllerBransje;
    if (bransje === Bransjetype.BARNEHAGER) {
        overskriftForTallForNæringEllerBransje = 'Barnehager i Norge:';
    } else {
        overskriftForTallForNæringEllerBransje = harBransje ? 'Din bransje:' : 'Din næring:';
    }

    const innhold = (
        <>
            {
                sammenligningsType === SammenligningsType.GRADERT && (
                    <div>
                        <Ingress>Slik regner vi ut prosenten på gradert sykemelding:</Ingress>
                        <Normaltekst className="ekspanderbart-sammenligningspanel__utregningsforklring-tekst">
                            Vi teller antall fraværsdager med bruk av gradert sykmelding. Så
                            beregner vi hvor stor andel disse utgjør av alle legemeldte fraværsdager
                            i din virksomhet. Du kan finne antallet legemeldte fraværsdager for din
                            virksomhet under tapte dagsverk i{' '}
                            <Lenke href={'/kalkulator'}>kostnadskalkulatoren.</Lenke>
                        </Normaltekst>
                        <LesMerPanel
                            åpneLabel={'Se eksempel'}
                            className="ekspanderbart-sammenligningspanel__les-mer-gradert-eksempel"
                        >
                            <Normaltekst className="ekspanderbart-sammenligningspanel__les-mer-gradert-eksempel__innhold">
                                La oss si du har 7,5% sykefravær, dette utgjør 100 tapte dagsverk i
                                din virksomhet. Det ble benyttet gradert sykmelding i 20 dager, da
                                får du 20% gradert sykemelding.
                            </Normaltekst>
                        </LesMerPanel>
                    </div>
                )
            }
            <div className="ekspanderbart-sammenligningspanel__metadata-og-detaljert-visning-sykefravær">
                <SykefraværMetadata
                    className="ekspanderbart-sammenligningspanel__sykefravær-metadata"
                    sammenligningsType={sammenligningsType}
                />
                <DetaljertVisningSykefravær
                    className="ekspanderbart-sammenligningspanel__detaljert-visning"
                    overskrift="Din virksomhet:"
                    prosent={sykefraværVirksomhet}
                    visingAntallKvartaller={antallKvartalerVirksomhet}
                />
                <DetaljertVisningSykefravær
                    className="ekspanderbart-sammenligningspanel__detaljert-visning"
                    overskrift={overskriftForTallForNæringEllerBransje}
                    prosent={visningAvProsentForBransje}
                    visingAntallKvartaller={antallKvartalerBransje}
                />
            </div>
            <div className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering">
                {getForklaringAvVurdering(sykefraværResultat, sykefraværBransje)}
            </div>
        </>
    );

    const tipsliste: Tips[] = getTips(sammenligningsType, sykefraværResultat, bransje);
    const harTips = tipsliste.length > 0;

    const vurderingstekst = getVurderingstekst(sykefraværResultat, sammenligningsType, harBransje);

    const getPaneltittel = (): ReactElement | string => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return vurderingstekst;
            case SammenligningsType.KORTTID:
                return 'Legemeldt korttidsfravær:';
            case SammenligningsType.LANGTID:
                return 'Legemeldt langtidsfravær:';
            case SammenligningsType.GRADERT:
                return 'Gradert sykemelding:';
        }
    };

    const getLesMerTekst = (): string => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
            case SammenligningsType.KORTTID:
                return 'Les mer om tallene og få tips til hva du kan gjøre';
            case SammenligningsType.GRADERT:
            case SammenligningsType.LANGTID:
                return 'Les mer om tallene';
        }
    };

    return (
        <div className={classNames('ekspanderbart-sammenligningspanel', className)}>
            <EkspanderbartpanelBase
                onClick={() => {
                    sendEvent('barnehage ekspanderbart sammenligning', 'klikk', {
                        panel: getPanelEventtekst(sammenligningsType),
                        action: erÅpen ? 'lukk' : 'åpne',
                    });
                    setErÅpen(!erÅpen);
                }}
                apen={erÅpen}
                id={panelknappID}
                tittel={
                    <div className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        {SammenligningsType.GRADERT === sammenligningsType ? (
                            <Kakediagram
                                resultat={sykefraværResultat}
                                className={'ekspanderbart-sammenligningspanel__kakediagram'}
                            />
                        ) : (
                            <Speedometer resultat={sykefraværResultat} inline />
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
                                {getLesMerTekst()}
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
                            panelknapp && panelknapp.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="typo-normal ">Lukk</span>
                        <OppChevron className="ekspanderbart-sammenligningspanel__lukk-chevron" />
                    </button>
                </div>
            </EkspanderbartpanelBase>
            <div className="ekspanderbart-sammenligningspanel__print-innhold">{innhold}</div>
        </div>
    );
};
