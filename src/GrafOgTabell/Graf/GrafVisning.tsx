import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLinjer from './grafLinjer';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { hentFørsteKvartalFraAlleÅreneIDatagrunnlaget, lagTickString } from './graf-utils';
import XAkseTick from './XAkseTick';
import { useInnerWidth } from '../../utils/innerWidth-hook';
import {
    BransjeEllerNæringLabel,
    HistorikkLabel,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { getMax, pickBuilder } from '../../utils/app-utils';
import YAkseTick from './YAkseTick';

interface Props {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    bransjeEllerNæringLabel: BransjeEllerNæringLabel;
    linjerSomSkalVises: HistorikkLabel[];
}

const SCREEN_SM_MIN = 768;

const GrafVisning: FunctionComponent<Props> = ({
    kvartalsvisSammenligning,
    bransjeEllerNæringLabel,
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

    const picker = pickBuilder(linjerSomSkalVises);
    const maxProsent = kvartalsvisSammenligningData.flatMap(picker).reduce(getMax, 0);

    const YAxisPadding = { top: 16 };
    const margin =
        innerWidth < SCREEN_SM_MIN
            ? { top: 0, right: 0, left: 10, bottom: 20 }
            : { top: 0, right: 0, left: 10, bottom: 50 };
    const tickMargin = innerWidth < SCREEN_SM_MIN ? 5 : 20;
    const getTickWidth = (percent: number) => {
        const threshold = { threeDigit: 80, twoDigit: 8 };
        const digitWidth = innerWidth < SCREEN_SM_MIN ? 7 : 8;
        const percentageWidth = innerWidth < SCREEN_SM_MIN ? 10 : 13;

        if (percent > threshold.threeDigit) {
            return digitWidth * 3 + percentageWidth + tickMargin;
        }
        if (percent > threshold.twoDigit) {
            return digitWidth * 2 + percentageWidth + tickMargin;
        }
        return digitWidth + percentageWidth + tickMargin;
    };
    const tickWidth = getTickWidth(maxProsent);

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
                {grafTooltip(bransjeEllerNæringLabel)}
                {grafLinjer(linjerSomSkalVises)}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default GrafVisning;
