import { FunctionComponent, default as React } from 'react';
import { KvartalsvisSykefraværsprosent, Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import './HighchartsGraf.less';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    ÅrstallOgKvartal,
} from '../utils/sykefraværshistorikk-utils';
import './highcharts.less';

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
        accessibility: { description: '@@@Test' },
    }));

    console.log(sykefraværshistorikk);
    const options = {
        accessibility: { enabled: true, description: 'Heisann!' },
        chart: {
            type: 'spline',
            styledMode: true,
            height: 500,
            accessibility: { enabled: true, description: 'Heisann!' },
        },
        legend: {
            accessibility: {
                enabled: true,
                keyboardNavigation: {
                    enabled: true,
                },
            },
        },
        title: {
            text: undefined,
        },
        xAxis: {
            categories: årstallOgKvartalKategorier,
            minTickInterval: 4,
            className: 'highcharts-graf__xAxis',
            tickLength: 5,
            tickWidth: 1,
            labels: {
                y: 35,
            },
        },
        yAxis: {
            lineWidth: 2,
            labels: {
                formatter: (name: any) => `${name.value} %`,
            },
            className: 'highcharts-graf__yAxis',
            title: { text: 'Sykefraværsprosent' },
        },
        series: data,
    };

    const optionsStyledModeFalse = {
        ...options,
        chart: {
            ...options.chart,
            styledMode: false,
            plotBorderWidth: 1,
            marginLeft: 100,
        },
        xAxis: {
            ...options.xAxis,
            margin: 100,
            labels: {
                padding: 20,
                rotation: 45,
            },
        },
    };

    return (
        <div className="highcharts-graf">
            <div className="highcharts-graf1">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="highcharts-graf2">
                <HighchartsReact highcharts={Highcharts} options={optionsStyledModeFalse} />
            </div>
        </div>
    );
};
