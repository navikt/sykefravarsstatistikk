import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
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
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import { getTips } from '../../../felleskomponenter/tips/tips';
import lyspære from './lyspære-liten.svg';
import classNames from 'classnames';

interface Props {
    sammenligningResultat: SykefraværResultat;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number;
    antallKvartalerVirksomhet: ReactElement | null;
    antallKvartalerBransje: ReactElement | null;
    sammenligningsType: SammenligningsType;
    åpen?: boolean;
    visTips: boolean;
    className?: string;
}

export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
    sammenligningResultat: sykefraværResultat,
    sykefraværVirksomhet,
    sykefraværBransje,
    antallKvartalerVirksomhet,
    antallKvartalerBransje,
    sammenligningsType,
    åpen,
    visTips,
    className
}) => {
    const periode = '01.04.2019 til 31.03.2020';

    const visningAvProsentForBransje: number | null =
        sykefraværResultat === SykefraværResultat.FEIL ? null : sykefraværBransje;

    const innhold = (
        <>
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
                {getForklaringAvVurdering(sykefraværResultat, sykefraværBransje)}
            </div>
        </>
    );

    return (
        <div className={classNames("ekspanderbart-sammenligningspanel", className)}>
            <Ekspanderbartpanel
                apen={åpen}
                tittel={
                    <span className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        <Speedometer resultat={sykefraværResultat} inline />
                        <Systemtittel
                            tag="h2"
                            className="ekspanderbart-sammenligningspanel__tittel"
                        >
                            {getVurderingstekst(sykefraværResultat, sammenligningsType)}
                        </Systemtittel>
                    </span>
                }
                className="ekspanderbart-sammenligningspanel__panel"
            >
                <div className="ekspanderbart-sammenligningspanel__innhold">
                    {innhold}
                    {visTips && getTips(sammenligningsType, sykefraværResultat) && (
                        <div className="ekspanderbart-sammenligningspanel__tips-tittel">
                            <img
                                className="ekspanderbart-sammenligningspanel__bilde"
                                src={lyspære}
                                alt=""
                            />
                            <Ingress>
                                {sammenligningsType === SammenligningsType.TOTALT
                                    ? 'Tips fra andre barnehager i lignende situasjon som deg'
                                    : 'Dette kan du gjøre'}
                            </Ingress>
                        </div>
                    )}
                    {visTips && (
                        <TipsVisning
                            tips={getTips(sammenligningsType, sykefraværResultat)}
                            className={'ekspanderbart-sammenligningspanel__tips'}
                        />
                    )}
                </div>
            </Ekspanderbartpanel>
            <div className="ekspanderbart-sammenligningspanel__print-innhold">{innhold}</div>
        </div>
    );
};
