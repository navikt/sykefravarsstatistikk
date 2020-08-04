import { default as React, FunctionComponent } from 'react';
import {
    KvartalsvisSykefraværsprosent,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../api/sykefraværshistorikk';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import './HighchartsGraf.less';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    getHistorikkLabels,
    ÅrstallOgKvartal,
} from '../utils/sykefraværshistorikk-utils';
import './highcharts.less';
import accessibility from './accessibility';

accessibility(Highcharts);

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
        name: historikk.type,
        data: padMedNull(historikk.kvartalsvisSykefraværsprosent, årstallOgKvartalSomSkalVises),
    }));

    const historikkLabels = getHistorikkLabels(sykefraværshistorikk);

    const labelsConfig = {
        [SykefraværshistorikkType.LAND]: {
            typeTabel: 'Land',
            historikkLabel: 'Norge',
        },
        [SykefraværshistorikkType.SEKTOR]: {
            typeTabel: 'Sektor',
            historikkLabel: historikkLabels.sektor,
        },
        [SykefraværshistorikkType.NÆRING]: {
            typeTabel: 'Næring',
            historikkLabel: historikkLabels.næringEllerBransje,
        },
        [SykefraværshistorikkType.BRANSJE]: {
            typeTabel: 'Bransje',
            historikkLabel: historikkLabels.næringEllerBransje,
        },
        [SykefraværshistorikkType.OVERORDNET_ENHET]: {
            typeTabel: 'Overordnet enhet',
            historikkLabel: historikkLabels.overordnetEnhet,
        },
        [SykefraværshistorikkType.VIRKSOMHET]: {
            typeTabel: 'Virksomhet',
            historikkLabel: historikkLabels.virksomhet,
        },
    };

    const getLegendTekst = (type: SykefraværshistorikkType) => {
        if (type === SykefraværshistorikkType.LAND)
            return '<span class="typo-element">Norge</span>';
        return (
            `<span class="typo-element">${labelsConfig[type].typeTabel}: </span>` +
            `<span class="typo-normal">${labelsConfig[type].historikkLabel}</span>`
        );
    };

    const options = {
        chart: {
            type: 'spline',
            styledMode: true,
            height: 500,
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
            accessibility: {
                description: 'Time from December 2010 to September 2019',
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
        legend: {
            labelFormatter: function () {
                const type: SykefraværshistorikkType = (this as any).name;
                return `<span class="heisann">${getLegendTekst(type)}</span>`;
            },
        },
        tooltip: {
            split: true,
            pointFormatter: function () {
                const { y, series } = this as any;
                return `<span class="highcharts-color-${series.colorIndex}">●</span><span class="typo-normal"> ${
                    labelsConfig[series.name as SykefraværshistorikkType].typeTabel
                }:</span> <span class="typo-element"> ${y} %</span>`;
            },
            headerFormat: '<span class="typo-normal">{point.key}</span><br/>'
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
