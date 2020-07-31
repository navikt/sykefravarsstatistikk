import { FunctionComponent, default as React } from 'react';
import { KvartalsvisSykefraværsprosent, Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    ÅrstallOgKvartal,
} from '../utils/sykefraværshistorikk-utils';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

export const HighchartsGraf: FunctionComponent<Props> = ({ sykefraværshistorikk }) => {
    const årstallOgKvartalSomSkalVises = beregnHvilkeÅrstallOgKvartalerSomSkalVises(
        sykefraværshistorikk
    );

    const årstallOgKvartalKategorier = årstallOgKvartalSomSkalVises.map(
        (årOgKvartal) => `${årOgKvartal.kvartal}. kvartal ${årOgKvartal.årstall}`
    );

    const padMedNull = (
        historikkData: KvartalsvisSykefraværsprosent[],
        årstallOgKvartalSomSkalVises: ÅrstallOgKvartal[]
    ): (number | null)[] =>
        årstallOgKvartalSomSkalVises.map((årOgKvartal) => {
            const prosent = historikkData.find(
                (kvartalsvisProsent) =>
                    kvartalsvisProsent.årstall === årOgKvartal.årstall &&
                    kvartalsvisProsent.kvartal === årOgKvartal.kvartal
            );
            if (!prosent || !prosent.prosent) {
                return null;
            }
            return prosent.prosent;
        });

    const data = sykefraværshistorikk.map((historikk) => ({
        name: historikk.label,
        data: padMedNull(historikk.kvartalsvisSykefraværsprosent, årstallOgKvartalSomSkalVises),
    }));

    console.log(sykefraværshistorikk);
    const options = {
        chart: {
            type: 'spline',
        },
        title: {
            text: 'My chart',
        },
        xAxis: {
            categories: årstallOgKvartalKategorier,
            minTickInterval: 4,
        },
        yAxis: {
            labels: {
                formatter: (name: any) => `${name.value} %`
            }
        },
        series: data,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};
