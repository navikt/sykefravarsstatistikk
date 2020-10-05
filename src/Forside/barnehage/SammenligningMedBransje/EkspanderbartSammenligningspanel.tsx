import React, { FunctionComponent, ReactElement } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import {
    getForklaringAvVurdering,
    getVurderingstekst,
    SammenligningsType,
} from '../vurderingstekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SykefraværMetadata } from './SykefraværMetadata';
import { DetaljertVisningSykefravær } from './DetaljertVisningSykefravær';

interface Props {
    sammenligningResultat: SykefraværResultat;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number;
    antallKvartalerVirksomhet: ReactElement | null;
    antallKvartalerBransje: ReactElement | null;
    sammenligningsType: SammenligningsType;
    åpen?: boolean;
}

export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
    sammenligningResultat,
    sykefraværVirksomhet,
    sykefraværBransje,
    antallKvartalerVirksomhet,
    antallKvartalerBransje,
    sammenligningsType,
    åpen,
}) => {
    const periode = '01.04.2019 til 31.03.2020';

    const visningAvProsentForBransje: number | null =
        sammenligningResultat === SykefraværResultat.FEIL ? null : sykefraværBransje;

    return (
        <div className="ekspanderbart-sammenligningspanel">
            <Ekspanderbartpanel
                apen={åpen}
                tittel={
                    <span className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        <Speedometer resultat={sammenligningResultat} inline />
                        <Systemtittel
                            tag="h2"
                            className="ekspanderbart-sammenligningspanel__tittel"
                        >
                            {getVurderingstekst(sammenligningResultat, sammenligningsType)}
                        </Systemtittel>
                    </span>
                }
                className="ekspanderbart-sammenligningspanel__panel"
            >
                <div className="ekspanderbart-sammenligningspanel__metadata-og-detaljert-visning-sykefravær">
                    <SykefraværMetadata sammenligningsType={sammenligningsType} periode={periode} />
                    <DetaljertVisningSykefravær
                        overskrift="Din virksomhet:"
                        prosent={sykefraværVirksomhet}
                        visingAntallKvartaller={antallKvartalerVirksomhet}
                    />
                    <DetaljertVisningSykefravær
                        overskrift="Barnehager i Norge:"
                        prosent={visningAvProsentForBransje}
                        visingAntallKvartaller={antallKvartalerBransje}
                    />
                </div>
                <div className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering">
                    {getForklaringAvVurdering(sammenligningResultat, sykefraværBransje)}
                </div>
            </Ekspanderbartpanel>
        </div>
    );
};
