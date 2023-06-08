import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLinjer from './grafLinjer';

import './Graf.less';
import { hentFørsteKvartalFraAlleÅreneIDatagrunnlaget, lagTickString } from './graf-utils';
import XAkseTick from './XAkseTick';
import { useInnerWidth } from '../../utils/innerWidth-hook';
import {
    HistorikkLabel,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import YAkseTick from './YAkseTick';

interface Props {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    linjerSomSkalVises: HistorikkLabel[];
}

const SCREEN_SM_MIN = 768;

const GrafVisning: FunctionComponent<Props> = ({
    kvartalsvisSammenligning,
    linjerSomSkalVises,
}) => {
    const innerWidth = useInnerWidth();

    const kvartalsvisSammenligningData = kvartalsvisSammenligning.map((sammenligning) => {
        const { årstall, kvartal, virksomhet, overordnetEnhet, næringEllerBransje, sektor, land } =
            sammenligning;
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

    const punkterPåXAksenSomSkalMarkeres: string[] = hentFørsteKvartalFraAlleÅreneIDatagrunnlaget(
        kvartalsvisSammenligning
    ).map((årstallOgKvartal) => lagTickString(årstallOgKvartal.årstall, årstallOgKvartal.kvartal));

    const YAxisPadding = { top: 16 };
    const margin =
        innerWidth < SCREEN_SM_MIN
            ? { top: 0, right: 0, left: 14, bottom: 20 }
            : { top: 0, right: 0, left: 5, bottom: 50 };
    const tickMargin = innerWidth < SCREEN_SM_MIN ? 7 : 24;

    const getTickWidth = () => {
        const digitWidth = innerWidth < SCREEN_SM_MIN ? 9 : 11;
        const percentageWidth = innerWidth < SCREEN_SM_MIN ? 12 : 15;

        return digitWidth * 2 + percentageWidth + tickMargin;
    };
    const tickWidth = getTickWidth();

    return (
        <ResponsiveContainer minHeight={400}>
            <LineChart data={kvartalsvisSammenligningData} margin={margin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                <XAxis
                    dataKey="name"
                    tickMargin={tickMargin}
                    tickFormatter={(tickValue) => tickValue.substring(0, 4)}
                    ticks={punkterPåXAksenSomSkalMarkeres}
                    tick={XAkseTick}
                />
                <YAxis
                    padding={YAxisPadding}
                    tickMargin={tickMargin}
                    tick={YAkseTick}
                    width={tickWidth}
                />
                {grafTooltip()}
                {grafLinjer(linjerSomSkalVises)}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default GrafVisning;
