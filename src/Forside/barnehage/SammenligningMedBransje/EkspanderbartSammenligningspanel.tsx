import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import { sisteOppdatering } from '../../../utils/app-utils';
import { Prosent } from '../Prosent';
import {
    getForklaringAvVurdering,
    getVurderingstekst,
    SammenligningsType,
} from '../vurderingstekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';

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
                    <div className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        <Speedometer resultat={sammenligningResultat} />
                        <Systemtittel className="ekspanderbart-sammenligningspanel__tittel">
                            {getVurderingstekst(sammenligningResultat, sammenligningsType)}
                        </Systemtittel>
                    </div>
                }
                className="ekspanderbart-sammenligningspanel__panel"
            >
                <Ingress tag="h3" className="ekspanderbart-sammenligningspanel__panel-tittel">
                    Legemeldt sykefravær
                    <Normaltekst>Periode: {periode}</Normaltekst>
                </Ingress>
                <div className="ekspanderbart-sammenligningspanel__ikon-og-tall">
                    <Speedometer
                        className="ekspanderbart-sammenligningspanel__ikon"
                        stor
                        resultat={sammenligningResultat}
                    />
                    <div className="ekspanderbart-sammenligningspanel__tall">
                        <Ingress className="ekspanderbart-sammenligningspanel__virksomhet-tittel">
                            Din virksomhet:
                        </Ingress>
                        <Systemtittel tag="p">
                            <Prosent prosent={sykefraværVirksomhet} />
                            {antallKvartalerVirksomhet}
                        </Systemtittel>
                        <Ingress className="ekspanderbart-sammenligningspanel__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel tag="p">
                            <Prosent prosent={visningAvProsentForBransje} />
                            {antallKvartalerBransje}
                        </Systemtittel>
                        <Normaltekst className="ekspanderbart-sammenligningspanel__neste-oppdatering">
                            Sist oppdatert: {sisteOppdatering}
                        </Normaltekst>
                    </div>
                </div>
                <AlertStripe
                    type={'info'}
                    className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering"
                >
                    {getForklaringAvVurdering(sammenligningResultat, sykefraværBransje)}
                </AlertStripe>
            </Ekspanderbartpanel>
        </div>
    );
};
