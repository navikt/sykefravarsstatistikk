import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../../api/sykefraværshistorikk';
import { konverterTilKvartalsvisSammenligning } from '../graf-og-tabell-utils';
import { hentFørsteKvartalFraAlleÅreneIDatagrunnlaget, lagTickString } from './graf-utils';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = props => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.sykefraværshistorikk
    );

    const kvartalsvisSammenligningData = kvartalsvisSammenligning.map(sammenligning => {
        const { årstall, kvartal, virksomhet, næringEllerBransje, sektor, land } = sammenligning;
        return {
            ...sammenligning,
            name: lagTickString(årstall, kvartal),
            virksomhet: virksomhet.prosent,
            næringEllerBransje: næringEllerBransje.prosent,
            sektor: sektor.prosent,
            land: land.prosent,
        };
    });

    const labelForType = (type: SykefraværshistorikkType): string => {
        return props.sykefraværshistorikk.find(historikk => historikk.type === type)!.label;
    };
    const harBransje = !!props.sykefraværshistorikk.find(
        historikk => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    const punkterPåXAksenSomSkalMarkeres: string[] = hentFørsteKvartalFraAlleÅreneIDatagrunnlaget(
        kvartalsvisSammenligning
    ).map(årstallOgKvartal => lagTickString(årstallOgKvartal.årstall, årstallOgKvartal.kvartal));

    return (
        <ResponsiveContainer minHeight={700}>
            <LineChart
                data={kvartalsvisSammenligningData}
                margin={{ top: 50, right: 50, left: 50, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                <XAxis
                    dataKey="name"
                    tickMargin={20}
                    tickFormatter={tickValue => tickValue.substring(0, 4)}
                    ticks={punkterPåXAksenSomSkalMarkeres}
                />
                <YAxis tickMargin={20} tickFormatter={tickValue => tickValue + ' %'} width={40} />
                {grafTooltip()}
                {grafLegend(
                    labelForType(SykefraværshistorikkType.VIRKSOMHET),
                    labelForType(
                        harBransje
                            ? SykefraværshistorikkType.BRANSJE
                            : SykefraværshistorikkType.NÆRING
                    ),
                    labelForType(SykefraværshistorikkType.SEKTOR),
                    labelForType(SykefraværshistorikkType.LAND),
                    harBransje
                )}
                {grafLinjer()}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graf;
