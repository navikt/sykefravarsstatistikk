import React, { FunctionComponent } from 'react';
import './Sammenligningspanel.css';
import { Speedometer } from '../Speedometer/Speedometer';
import {
    getForklaringAvVurdering,
    SammenligningsType,
    sammenliknSykefraværstekst,
} from '../vurderingstekster';
import { Kakediagram } from '../Kakediagram/Kakediagram';
import { Statistikk } from '../../hooks/useAggregertStatistikk';
import { sammenliknSykefravær } from '../vurdering-utils';
import { parseVerdi } from '../../utils/app-utils';
import { BodyShort, Heading, Ingress, Label, Panel } from '@navikt/ds-react';
import { Prosent } from '../Prosent';

interface Props {
    sammenligningsType: SammenligningsType;
    virksomhetStatistikk?: Statistikk;
    bransjeEllerNæringStatistikk?: Statistikk;
    defaultÅpen?: boolean;
    className?: string;
}

export const Sammenligningspanel: FunctionComponent<Props> = ({
    sammenligningsType,
    virksomhetStatistikk,
    bransjeEllerNæringStatistikk,
}) => {
    const sykefraværVurdering = sammenliknSykefravær(
        virksomhetStatistikk,
        bransjeEllerNæringStatistikk
    );

    const antallKvartalerVirksomhet = virksomhetStatistikk?.kvartalerIBeregningen.length || 0;

    const innhold = (
        <>
            <div className="sammenligningspanel__wrapper">
                <div>
                    <Ingress as="span">Din virksomhet:</Ingress>
                    <Prosent prosent={virksomhetStatistikk?.verdi} />
                    <Label>{`${virksomhetStatistikk?.kvartalerIBeregningen.length} av 4 kvartaler`}</Label>
                </div>
                <div>
                    <Ingress as="span">Din bransje:</Ingress>
                    <Prosent prosent={bransjeEllerNæringStatistikk?.verdi} />
                    <Label>4 av 4 kvartaler</Label>
                </div>
            </div>
            {sammenligningsType === SammenligningsType.GRADERT && (
                <div className="sammenligningspanel__gradert_intro">
                    <BodyShort spacing>
                        <u>Slik regner vi ut prosenten på gradert sykmelding:</u>
                    </BodyShort>
                    <BodyShort spacing>
                        Vi teller antall fraværsdager med bruk av gradert sykmelding. Så beregner vi
                        hvor stor andel disse utgjør av alle legemeldte fraværsdager i din
                        virksomhet.
                    </BodyShort>
                    <BodyShort spacing>
                        Som et eksempel, la oss si du har 7,5% sykefravær. Dette utgjør 100 tapte
                        dagsverk i din virksomhet. Det ble benyttet gradert sykmelding i 20 dager,
                        da får du 20% gradert sykmelding.
                    </BodyShort>
                </div>
            )}
            {sammenligningsType !== SammenligningsType.GRADERT &&
                sykefraværVurdering !== 'MASKERT' && (
                    <div className="sammenligningspanel__forklaring-av-vurdering">
                        {getForklaringAvVurdering(
                            sykefraværVurdering,
                            bransjeEllerNæringStatistikk?.verdi
                                ? parseVerdi(bransjeEllerNæringStatistikk?.verdi)
                                : undefined,
                            antallKvartalerVirksomhet
                        )}
                    </div>
                )}
        </>
    );
    const vurderingstekst = sammenliknSykefraværstekst(sykefraværVurdering, sammenligningsType);

    const getPaneltittel = (): JSX.Element | string => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return 'Legemeldt sykefravær';
            case SammenligningsType.KORTTID:
                return 'Legemeldt korttidsfravær fra 1. til 16. dag';
            case SammenligningsType.LANGTID:
                return 'Legemeldt langtidsfravær fra 17. dag';
            case SammenligningsType.GRADERT:
                return 'Gradert sykmelding';
        }
    };

    return (
        <Panel border className="sammenligningspanel">
            <div className="sammenligningspanel__extra-padding-desktop">
                <div className="sammenligningspanel__tittel-wrapper">
                    {SammenligningsType.GRADERT === sammenligningsType ? (
                        <Kakediagram resultat={sykefraværVurdering} />
                    ) : (
                        <Speedometer resultat={sykefraværVurdering} inline />
                    )}
                    <div className="sammenligningspanel__tittel-tekst">
                        <Heading level="2" size="medium">
                            {getPaneltittel()}
                        </Heading>
                        <BodyShort className="sammenligningspanel__tittel-forklaring" as="div">
                            {vurderingstekst}
                        </BodyShort>
                    </div>
                </div>
                <div className="sammenligningspanel__innhold">{innhold}</div>
                <div className="sammenligningspanel__print-innhold">{innhold}</div>
            </div>
        </Panel>
    );
};
