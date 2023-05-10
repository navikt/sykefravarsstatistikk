import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './BransjeSammenligningspanel.less';
import { Speedometer } from '../Speedometer/Speedometer';
import {
    getForklaringAvVurdering,
    SammenligningsType,
    sammenliknSykefraværstekst,
} from '../vurderingstekster';
import { ForklaringAvPeriode } from './ForklaringAvPeriode';
import { DetaljertVisningSykefravær } from './DetaljertVisningSykefravær';
import { Kakediagram } from '../Kakediagram/Kakediagram';
import { OmGradertSykmelding } from '../../felleskomponenter/OmGradertSykmelding/OmGradertSykmelding';
import { Statistikk } from '../../hooks/useAggregertStatistikk';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { sammenliknSykefravær } from '../vurdering-utils';
import { parseVerdi } from '../../utils/app-utils';
import { Panel } from '@navikt/ds-react';

interface Props {
    sammenligningsType: SammenligningsType;
    virksomhetStatistikk?: Statistikk;
    bransjeEllerNæringStatistikk?: Statistikk;
    harBransje: boolean;
    defaultÅpen?: boolean;
    className?: string;
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

const antallKvartalerTekst = (antallKvartaler?: number) => {
    return <strong> {antallKvartaler || 0} av 4 kvartaler</strong>;
};

export const BransjeSammenligningspanel: FunctionComponent<Props> = ({
    sammenligningsType,
    harBransje,
    virksomhetStatistikk,
    bransjeEllerNæringStatistikk,
    restPubliseringsdatoer,
}) => {
    const sykefraværVurdering = sammenliknSykefravær(
        virksomhetStatistikk,
        bransjeEllerNæringStatistikk
    );

    const overskriftForTallForNæringEllerBransje = harBransje ? 'Din bransje:' : 'Din næring:';

    const innhold = (
        <>
            {sammenligningsType === SammenligningsType.GRADERT && (
                <div className="bransje-sammenligningspanel__gradert_intro">
                    <Ingress>Slik regner vi ut prosenten på gradert sykmelding:</Ingress>
                    <Normaltekst className="bransje-sammenligningspanel__utregningsforklring-tekst">
                        Vi teller antall fraværsdager med bruk av gradert sykmelding. Så beregner vi
                        hvor stor andel disse utgjør av alle legemeldte fraværsdager i din
                        virksomhet.
                    </Normaltekst>
                    <Normaltekst className="bransje-sammenligningspanel__les-mer-gradert-eksempel__innhold">
                        La oss si du har 7,5% sykefravær, dette utgjør 100 tapte dagsverk i din
                        virksomhet. Det ble benyttet gradert sykmelding i 20 dager, da får du 20%
                        gradert sykmelding.
                    </Normaltekst>
                </div>
            )}
            <div className="bransje-sammenligningspanel__data-og-detaljert-visning-sykefravær">
                <ForklaringAvPeriode
                    className="bransje-sammenligningspanel__forklaring-av-periode"
                    sammenligningsType={sammenligningsType}
                    restPubliseringsdatoer={restPubliseringsdatoer}
                />
                <DetaljertVisningSykefravær
                    className="bransje-sammenligningspanel__detaljert-visning"
                    overskrift="Din virksomhet:"
                    prosent={virksomhetStatistikk?.verdi}
                    visingAntallKvartaller={antallKvartalerTekst(
                        virksomhetStatistikk?.kvartalerIBeregningen.length
                    )}
                />
                <DetaljertVisningSykefravær
                    className="bransje-sammenligningspanel__detaljert-visning"
                    overskrift={overskriftForTallForNæringEllerBransje}
                    prosent={bransjeEllerNæringStatistikk?.verdi}
                    visingAntallKvartaller={antallKvartalerTekst(
                        bransjeEllerNæringStatistikk?.kvartalerIBeregningen.length
                    )}
                />
            </div>
            {sammenligningsType === SammenligningsType.GRADERT ? (
                <OmGradertSykmelding vurdering={sykefraværVurdering} />
            ) : (
                <div className="bransje-sammenligningspanel__forklaring-av-vurdering">
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
    const vurderingstekst = sammenliknSykefraværstekst(
        sykefraværVurdering,
        sammenligningsType,
        harBransje
    );

    const getPaneltittel = (): JSX.Element | string => {
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
        <Panel className="bransje-sammenligningspanel" border>
            <div className="bransje-sammenligningspanel__tittel-wrapper">
                {SammenligningsType.GRADERT === sammenligningsType ? (
                    <Kakediagram
                        resultat={sykefraværVurdering}
                        className={'bransje-sammenligningspanel__kakediagram'}
                    />
                ) : (
                    <Speedometer resultat={sykefraværVurdering} inline />
                )}
                <div className="bransje-sammenligningspanel__tittel-tekst">
                    <Systemtittel tag="h2">{getPaneltittel()}</Systemtittel>
                    {sammenligningsType !== SammenligningsType.TOTALT && (
                        <Normaltekst className="bransje-sammenligningspanel__tittel-forklaring">
                            {vurderingstekst}
                        </Normaltekst>
                    )}
                </div>
            </div>
            <div className="bransje-sammenligningspanel__innhold">{innhold}</div>
            <div className="bransje-sammenligningspanel__print-innhold">{innhold}</div>
        </Panel>
    );
};
