import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './BransjeSammenligningspanel.less';
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
import { Label, Panel } from '@navikt/ds-react';
import { Prosent } from '../Prosent';

interface Props {
    sammenligningsType: SammenligningsType;
    virksomhetStatistikk?: Statistikk;
    bransjeEllerNæringStatistikk?: Statistikk;
    defaultÅpen?: boolean;
    className?: string;
}

export const BransjeSammenligningspanel: FunctionComponent<Props> = ({
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
            <div className="bransje-sammenligningspanel__wrapper">
                <div className={'bransje-sammenligningspanel__detaljert-visning-sykefravær'}>
                    <Ingress className="detaljert-visning-sykefravær__tittel" tag="span">
                        Din virksomhet:
                    </Ingress>
                    <Prosent prosent={virksomhetStatistikk?.verdi} />
                    <Label>{`${virksomhetStatistikk?.kvartalerIBeregningen.length} av 4 kvartaler`}</Label>
                </div>
                <div className={'bransje-sammenligningspanel__detaljert-visning-sykefravær'}>
                    <Ingress className="detaljert-visning-sykefravær__tittel" tag="span">
                        Din bransje:
                    </Ingress>
                    <Prosent prosent={bransjeEllerNæringStatistikk?.verdi} />
                    <Label>4 av 4 kvartaler</Label>
                </div>
            </div>
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
            {sammenligningsType !== SammenligningsType.GRADERT &&
                sykefraværVurdering !== 'MASKERT' && (
                    <div className="bransje-sammenligningspanel__forklaring-av-vurdering">
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
                    <Normaltekst className="bransje-sammenligningspanel__tittel-forklaring">
                        {vurderingstekst}
                    </Normaltekst>
                </div>
            </div>
            <div className="bransje-sammenligningspanel__innhold">{innhold}</div>
            <div className="bransje-sammenligningspanel__print-innhold">{innhold}</div>
        </Panel>
    );
};
