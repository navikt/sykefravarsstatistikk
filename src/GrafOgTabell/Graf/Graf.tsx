import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../../api/sykefraværshistorikk';
import {
    getLinjerSomMatcherHistorikk,
    hentFørsteKvartalFraAlleÅreneIDatagrunnlaget,
    lagTickString,
} from './graf-utils';
import XAkseTick from './XAkseTick';
import { useInnerWidth } from '../../utils/innerWidth-hook';
import { konverterTilKvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = props => {
    const innerWidth = useInnerWidth();

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.sykefraværshistorikk
    );

    const kvartalsvisSammenligningData = kvartalsvisSammenligning.map(sammenligning => {
        const {
            årstall,
            kvartal,
            virksomhet,
            overordnetEnhet,
            næringEllerBransje,
            sektor,
            land,
        } = sammenligning;
        return {
            ...sammenligning,
            name: lagTickString(årstall, kvartal),
            virksomhet: virksomhet.prosent,
            overordnetEnhet: overordnetEnhet.prosent,
            næringEllerBransje: næringEllerBransje.prosent,
            sektor: sektor.prosent,
            land: land.prosent,
        };
    });

    const labelForType = (type: SykefraværshistorikkType): string => {
        return props.sykefraværshistorikk.find(historikk => historikk.type === type)!
            ? props.sykefraværshistorikk.find(historikk => historikk.type === type)!.label
            : 'Ingen tilgjengelig data';
    };

    const harBransje = !!props.sykefraværshistorikk.find(
        historikk => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    const punkterPåXAksenSomSkalMarkeres: string[] = hentFørsteKvartalFraAlleÅreneIDatagrunnlaget(
        kvartalsvisSammenligning
    ).map(årstallOgKvartal => lagTickString(årstallOgKvartal.årstall, årstallOgKvartal.kvartal));

    const margin =
        innerWidth < 500
            ? { top: 0, right: 20, left: 10, bottom: 20 }
            : { top: 0, right: 50, left: 50, bottom: 50 };
    const tickMargin = innerWidth < 500 ? 5 : 20;

    return (
        <ResponsiveContainer minHeight={700}>
            <LineChart data={kvartalsvisSammenligningData} margin={margin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                <XAxis
                    dataKey="name"
                    tickMargin={tickMargin}
                    tickFormatter={tickValue => tickValue.substring(0, 4)}
                    ticks={punkterPåXAksenSomSkalMarkeres}
                    tick={XAkseTick}
                />
                <YAxis
                    tickMargin={tickMargin}
                    tickFormatter={tickValue => tickValue + ' %'}
                    width={40}
                />
                {grafTooltip(harBransje)}
                {grafLegend(
                    labelForType(SykefraværshistorikkType.VIRKSOMHET),
                    labelForType(SykefraværshistorikkType.OVERORDNET_ENHET),
                    labelForType(
                        harBransje
                            ? SykefraværshistorikkType.BRANSJE
                            : SykefraværshistorikkType.NÆRING
                    ),
                    labelForType(SykefraværshistorikkType.SEKTOR),
                    labelForType(SykefraværshistorikkType.LAND),
                    harBransje,
                    getLinjerSomMatcherHistorikk(props.sykefraværshistorikk)
                )}
                {grafLinjer()}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graf;
