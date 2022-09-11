import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import { RestStatus } from '../api/api-utils';
import { SykefraværshistorikkType } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import { AggregertStatistikk, AggregertStatistikkResponse } from '../hooks/useAggregertStatistikk';

export const mockSykefraværWithEkstradata: SykefraværAppData = {
    altinnOrganisasjonerMedStatistikk: { status: RestStatus.IkkeLastet },
    enhetsregisterdata: {
        restUnderenhet: {
            status: RestStatus.Suksess,
            data: {
                overordnetEnhet: '111111111',
                orgnr: '910969439',
                beliggenhetsadresse: {
                    kommune: 'SENJA',
                    kommunenummer: '5421',
                },
                næringer: [{ kode: '12345', beskrivelse: 'idk' }],
            },
        },
        restOverordnetEnhet: {
            status: RestStatus.Suksess,
            data: {
                orgnr: '111111111',
                institusjonellSektorkode: { kode: '6100', beskrivelse: 'idk' },
            },
        },
    },
    featureToggles: {
        status: RestStatus.LasterInn,
    },
    altinnOrganisasjoner: {
        status: RestStatus.Suksess,
        data: [
            {
                Name: 'FLESK OG FISK AS',
                Type: 'Enterprise',
                OrganizationNumber: '111111111',
                OrganizationForm: 'AS',
                Status: 'Active',
                ParentOrganizationNumber: '',
            },
            {
                Name: 'FLESK OG FISK OSLO',
                Type: 'Business',
                OrganizationNumber: '910969439',
                OrganizationForm: 'BEDR',
                Status: 'Active',
                ParentOrganizationNumber: '111111111',
            },
            {
                Name: 'FLESK OG FISK SIGDAL',
                Type: 'Business',
                OrganizationNumber: '444444444',
                OrganizationForm: 'BEDR',
                Status: 'Active',
                ParentOrganizationNumber: '111111111',
            },
        ],
    },
    virksomhetsdata: {
        status: RestStatus.Suksess,
        data: {
            antallAnsatte: 99,
            næringskode5Siffer: {
                kode: '84300',
                beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
            },
        },
    },
    aggregertStatistikk: {
        restStatus: RestStatus.Suksess,
        aggregertData: new Map<Statistikkategori, AggregertStatistikk>(),
        error: undefined
    },
    sykefraværshistorikk: {
        status: RestStatus.Suksess,
        data: [
            {
                type: SykefraværshistorikkType.LAND,
                label: 'Norge',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5.5,
                        tapteDagsverk: 55,
                        muligeDagsverk: 5500,
                    },
                    {
                        årstall: 2015,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.9,
                        tapteDagsverk: 59,
                        muligeDagsverk: 5900,
                    },
                    {
                        årstall: 2015,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 6.8,
                        tapteDagsverk: 68,
                        muligeDagsverk: 6800,
                    },
                    {
                        årstall: 2016,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.2,
                        tapteDagsverk: 62,
                        muligeDagsverk: 6200,
                    },
                    {
                        årstall: 2016,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5.3,
                        tapteDagsverk: 53,
                        muligeDagsverk: 5300,
                    },
                    {
                        årstall: 2016,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.8,
                        tapteDagsverk: 58,
                        muligeDagsverk: 5800,
                    },
                    {
                        årstall: 2016,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 6.6,
                        tapteDagsverk: 66,
                        muligeDagsverk: 6600,
                    },
                    {
                        årstall: 2017,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.1,
                        tapteDagsverk: 61,
                        muligeDagsverk: 6100,
                    },
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5.3,
                        tapteDagsverk: 53,
                        muligeDagsverk: 5300,
                    },
                    {
                        årstall: 2017,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.8,
                        tapteDagsverk: 58,
                        muligeDagsverk: 5800,
                    },
                    {
                        årstall: 2017,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 6.7,
                        tapteDagsverk: 67,
                        muligeDagsverk: 6700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.2,
                        tapteDagsverk: 62,
                        muligeDagsverk: 6200,
                    },
                    {
                        årstall: 2018,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5.3,
                        tapteDagsverk: 53,
                        muligeDagsverk: 5300,
                    },
                    {
                        årstall: 2018,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.7,
                        tapteDagsverk: 57,
                        muligeDagsverk: 5700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 6.5,
                        tapteDagsverk: 65,
                        muligeDagsverk: 6500,
                    },
                    {
                        årstall: 2019,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 5.9,
                        tapteDagsverk: 59,
                        muligeDagsverk: 5900,
                    },
                    {
                        årstall: 2019,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5,
                        tapteDagsverk: 50,
                        muligeDagsverk: 5000,
                    },
                    {
                        årstall: 2019,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.4,
                        tapteDagsverk: 54,
                        muligeDagsverk: 5400,
                    },
                    {
                        årstall: 2019,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 6.3,
                        tapteDagsverk: 63,
                        muligeDagsverk: 6300,
                    },
                    {
                        årstall: 2020,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 5.8,
                        tapteDagsverk: 58,
                        muligeDagsverk: 5800,
                    },
                ],
            },
            {
                type: SykefraværshistorikkType.SEKTOR,
                label: 'Statlig forvaltning',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 4,
                        tapteDagsverk: 40,
                        muligeDagsverk: 4000,
                    },
                    {
                        årstall: 2015,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.1,
                        tapteDagsverk: 51,
                        muligeDagsverk: 5100,
                    },
                    {
                        årstall: 2015,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 7,
                        tapteDagsverk: 70,
                        muligeDagsverk: 7000,
                    },
                    {
                        årstall: 2016,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.2,
                        tapteDagsverk: 62,
                        muligeDagsverk: 6200,
                    },
                    {
                        årstall: 2016,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 4.4,
                        tapteDagsverk: 44,
                        muligeDagsverk: 4400,
                    },
                    {
                        årstall: 2016,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.4,
                        tapteDagsverk: 54,
                        muligeDagsverk: 5400,
                    },
                    {
                        årstall: 2016,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 7.1,
                        tapteDagsverk: 71,
                        muligeDagsverk: 7100,
                    },
                    {
                        årstall: 2017,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6,
                        tapteDagsverk: 60,
                        muligeDagsverk: 6000,
                    },
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 4.4,
                        tapteDagsverk: 44,
                        muligeDagsverk: 4400,
                    },
                    {
                        årstall: 2017,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.3,
                        tapteDagsverk: 53,
                        muligeDagsverk: 5300,
                    },
                    {
                        årstall: 2017,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 7,
                        tapteDagsverk: 70,
                        muligeDagsverk: 7000,
                    },
                    {
                        årstall: 2018,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.2,
                        tapteDagsverk: 62,
                        muligeDagsverk: 6200,
                    },
                    {
                        årstall: 2018,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 4.6,
                        tapteDagsverk: 46,
                        muligeDagsverk: 4600,
                    },
                    {
                        årstall: 2018,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 5.7,
                        tapteDagsverk: 57,
                        muligeDagsverk: 5700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 7.5,
                        tapteDagsverk: 75,
                        muligeDagsverk: 7500,
                    },
                    {
                        årstall: 2019,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.7,
                        tapteDagsverk: 67,
                        muligeDagsverk: 6700,
                    },
                    {
                        årstall: 2019,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5,
                        tapteDagsverk: 50,
                        muligeDagsverk: 5000,
                    },
                    {
                        årstall: 2019,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 6,
                        tapteDagsverk: 60,
                        muligeDagsverk: 6000,
                    },
                    {
                        årstall: 2019,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 7.6,
                        tapteDagsverk: 76,
                        muligeDagsverk: 7600,
                    },
                    {
                        årstall: 2020,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 6.5,
                        tapteDagsverk: 65,
                        muligeDagsverk: 6500,
                    },
                ],
            },
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: 'FLESK OG FISK AS',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 8.3,
                        tapteDagsverk: 83,
                        muligeDagsverk: 8300,
                    },
                    {
                        årstall: 2017,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 12.6,
                        tapteDagsverk: 126,
                        muligeDagsverk: 12600,
                    },
                    {
                        årstall: 2017,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 18.9,
                        tapteDagsverk: 189,
                        muligeDagsverk: 18900,
                    },
                    {
                        årstall: 2018,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 14.1,
                        tapteDagsverk: 141,
                        muligeDagsverk: 14100,
                    },
                    {
                        årstall: 2018,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 10.7,
                        tapteDagsverk: 107,
                        muligeDagsverk: 10700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 12.7,
                        tapteDagsverk: 127,
                        muligeDagsverk: 12700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 19.7,
                        tapteDagsverk: 197,
                        muligeDagsverk: 19700,
                    },
                    {
                        årstall: 2019,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 20.2,
                        tapteDagsverk: 202,
                        muligeDagsverk: 20200,
                    },
                    {
                        årstall: 2019,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 14.2,
                        tapteDagsverk: 142,
                        muligeDagsverk: 14200,
                    },
                    {
                        årstall: 2019,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 14.2,
                        tapteDagsverk: 142,
                        muligeDagsverk: 14200,
                    },
                    {
                        årstall: 2019,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 20.2,
                        tapteDagsverk: 202,
                        muligeDagsverk: 20200,
                    },
                    {
                        årstall: 2020,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 16.5,
                        tapteDagsverk: 165,
                        muligeDagsverk: 16500,
                    },
                    {
                        årstall: 2020,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 14.8,
                        tapteDagsverk: 148,
                        muligeDagsverk: 14800,
                    },
                    {
                        årstall: 2020,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 14.8,
                        tapteDagsverk: 148,
                        muligeDagsverk: 14800,
                    },
                    {
                        årstall: 2020,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 21.1,
                        tapteDagsverk: 211,
                        muligeDagsverk: 21100,
                    },
                    {
                        årstall: 2021,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 20.8,
                        tapteDagsverk: 208,
                        muligeDagsverk: 20800,
                    },
                    {
                        årstall: 2021,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 14.8,
                        tapteDagsverk: 148,
                        muligeDagsverk: 14800,
                    },
                    {
                        årstall: 2021,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 18.2,
                        tapteDagsverk: 182,
                        muligeDagsverk: 18200,
                    },
                    {
                        årstall: 2021,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 22.7,
                        tapteDagsverk: 227,
                        muligeDagsverk: 22700,
                    },
                    {
                        årstall: 2022,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 21.3,
                        tapteDagsverk: 213,
                        muligeDagsverk: 21300,
                    },
                ],
            },
            {
                type: SykefraværshistorikkType.OVERORDNET_ENHET,
                label: 'THE FISHING GROUP',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2016,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7.1,
                        tapteDagsverk: 71,
                        muligeDagsverk: 7100,
                    },
                    {
                        årstall: 2016,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 9.1,
                        tapteDagsverk: 91,
                        muligeDagsverk: 9100,
                    },
                    {
                        årstall: 2016,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 12.2,
                        tapteDagsverk: 122,
                        muligeDagsverk: 12200,
                    },
                    {
                        årstall: 2017,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 10.5,
                        tapteDagsverk: 105,
                        muligeDagsverk: 10500,
                    },
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7.8,
                        tapteDagsverk: 78,
                        muligeDagsverk: 7800,
                    },
                    {
                        årstall: 2017,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 9.3,
                        tapteDagsverk: 93,
                        muligeDagsverk: 9300,
                    },
                    {
                        årstall: 2017,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 12,
                        tapteDagsverk: 120,
                        muligeDagsverk: 12000,
                    },
                    {
                        årstall: 2018,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 10.7,
                        tapteDagsverk: 107,
                        muligeDagsverk: 10700,
                    },
                    {
                        årstall: 2018,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 8.5,
                        tapteDagsverk: 85,
                        muligeDagsverk: 8500,
                    },
                    {
                        årstall: 2018,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 10.1,
                        tapteDagsverk: 101,
                        muligeDagsverk: 10100,
                    },
                    {
                        årstall: 2018,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 12.7,
                        tapteDagsverk: 127,
                        muligeDagsverk: 12700,
                    },
                    {
                        årstall: 2019,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 11.1,
                        tapteDagsverk: 111,
                        muligeDagsverk: 11100,
                    },
                    {
                        årstall: 2019,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 8.5,
                        tapteDagsverk: 85,
                        muligeDagsverk: 8500,
                    },
                    {
                        årstall: 2019,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 9.6,
                        tapteDagsverk: 96,
                        muligeDagsverk: 9600,
                    },
                    {
                        årstall: 2019,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 12.2,
                        tapteDagsverk: 122,
                        muligeDagsverk: 12200,
                    },
                    {
                        årstall: 2020,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 10.4,
                        tapteDagsverk: 104,
                        muligeDagsverk: 10400,
                    },
                    {
                        årstall: 2020,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7.7,
                        tapteDagsverk: 77,
                        muligeDagsverk: 7700,
                    },
                    {
                        årstall: 2020,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 9,
                        tapteDagsverk: 90,
                        muligeDagsverk: 9000,
                    },
                    {
                        årstall: 2020,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 11.3,
                        tapteDagsverk: 113,
                        muligeDagsverk: 11300,
                    },
                    {
                        årstall: 2021,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 9.6,
                        tapteDagsverk: 96,
                        muligeDagsverk: 9600,
                    },
                ],
            },
            {
                type: SykefraværshistorikkType.NÆRING,
                label: 'Produksjon av nærings- og nytelsesmidler',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 6.7,
                        tapteDagsverk: 67,
                        muligeDagsverk: 6700,
                    },
                    {
                        årstall: 2015,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 7.6,
                        tapteDagsverk: 76,
                        muligeDagsverk: 7600,
                    },
                    {
                        årstall: 2015,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 9,
                        tapteDagsverk: 90,
                        muligeDagsverk: 9000,
                    },
                    {
                        årstall: 2016,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 8.4,
                        tapteDagsverk: 84,
                        muligeDagsverk: 8400,
                    },
                    {
                        årstall: 2016,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7,
                        tapteDagsverk: 70,
                        muligeDagsverk: 7000,
                    },
                    {
                        årstall: 2016,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 8,
                        tapteDagsverk: 80,
                        muligeDagsverk: 8000,
                    },
                    {
                        årstall: 2016,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 9.8,
                        tapteDagsverk: 98,
                        muligeDagsverk: 9800,
                    },
                    {
                        årstall: 2017,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 9.2,
                        tapteDagsverk: 92,
                        muligeDagsverk: 9200,
                    },
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7.5,
                        tapteDagsverk: 75,
                        muligeDagsverk: 7500,
                    },
                    {
                        årstall: 2017,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 8.2,
                        tapteDagsverk: 82,
                        muligeDagsverk: 8200,
                    },
                    {
                        årstall: 2017,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 9.8,
                        tapteDagsverk: 98,
                        muligeDagsverk: 9800,
                    },
                    {
                        årstall: 2018,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 8.8,
                        tapteDagsverk: 88,
                        muligeDagsverk: 8800,
                    },
                    {
                        årstall: 2018,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7,
                        tapteDagsverk: 70,
                        muligeDagsverk: 7000,
                    },
                    {
                        årstall: 2018,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 7.9,
                        tapteDagsverk: 79,
                        muligeDagsverk: 7900,
                    },
                    {
                        årstall: 2018,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 9.4,
                        tapteDagsverk: 94,
                        muligeDagsverk: 9400,
                    },
                    {
                        årstall: 2019,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 8.1,
                        tapteDagsverk: 81,
                        muligeDagsverk: 8100,
                    },
                    {
                        årstall: 2019,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 6.7,
                        tapteDagsverk: 67,
                        muligeDagsverk: 6700,
                    },
                    {
                        årstall: 2019,
                        kvartal: 3,
                        erMaskert: false,
                        prosent: 7.6,
                        tapteDagsverk: 76,
                        muligeDagsverk: 7600,
                    },
                    {
                        årstall: 2019,
                        kvartal: 4,
                        erMaskert: false,
                        prosent: 9,
                        tapteDagsverk: 90,
                        muligeDagsverk: 9000,
                    },
                    {
                        årstall: 2020,
                        kvartal: 1,
                        erMaskert: false,
                        prosent: 8.1,
                        tapteDagsverk: 81,
                        muligeDagsverk: 8100,
                    },
                ],
            },
        ],
    },
    summertSykefravær: {
        status: RestStatus.Suksess,
        data: [
            {
                type: Statistikkategori.VIRKSOMHET,
                label: 'En virksomhet',
                summertKorttidsOgLangtidsfravær: {
                    summertKorttidsfravær: {
                        prosent: 1.2,
                        tapteDagsverk: 12,
                        muligeDagsverk: 1000,
                        erMaskert: false,
                        kvartaler: [
                            {
                                årstall: 2020,
                                kvartal: 3,
                            },
                            {
                                årstall: 2020,
                                kvartal: 4,
                            },
                            {
                                årstall: 2021,
                                kvartal: 1,
                            },
                            {
                                årstall: 2021,
                                kvartal: 2,
                            },
                        ],
                    },
                    summertLangtidsfravær: {
                        prosent: 7.5,
                        tapteDagsverk: 75,
                        muligeDagsverk: 1000,
                        erMaskert: false,
                        kvartaler: [
                            {
                                årstall: 2020,
                                kvartal: 3,
                            },
                            {
                                årstall: 2020,
                                kvartal: 4,
                            },
                            {
                                årstall: 2021,
                                kvartal: 1,
                            },
                            {
                                årstall: 2021,
                                kvartal: 2,
                            },
                        ],
                    },
                },
                summertGradertFravær: {
                    prosent: 4.4,
                    tapteDagsverk: 44,
                    muligeDagsverk: 1000,
                    erMaskert: false,
                    kvartaler: [
                        {
                            årstall: 2020,
                            kvartal: 3,
                        },
                        {
                            årstall: 2020,
                            kvartal: 4,
                        },
                        {
                            årstall: 2021,
                            kvartal: 1,
                        },
                        {
                            årstall: 2021,
                            kvartal: 2,
                        },
                    ],
                },
            },
            {
                type: Statistikkategori.BRANSJE,
                label: 'Barnehager',
                summertKorttidsOgLangtidsfravær: {
                    summertKorttidsfravær: {
                        prosent: 1.2,
                        tapteDagsverk: 12,
                        muligeDagsverk: 1000,
                        erMaskert: false,
                        kvartaler: [
                            {
                                årstall: 2020,
                                kvartal: 3,
                            },
                            {
                                årstall: 2020,
                                kvartal: 4,
                            },
                            {
                                årstall: 2021,
                                kvartal: 1,
                            },
                            {
                                årstall: 2021,
                                kvartal: 2,
                            },
                        ],
                    },
                    summertLangtidsfravær: {
                        prosent: 7.5,
                        tapteDagsverk: 75,
                        muligeDagsverk: 1000,
                        erMaskert: false,
                        kvartaler: [
                            {
                                årstall: 2020,
                                kvartal: 3,
                            },
                            {
                                årstall: 2020,
                                kvartal: 4,
                            },
                            {
                                årstall: 2021,
                                kvartal: 1,
                            },
                            {
                                årstall: 2021,
                                kvartal: 2,
                            },
                        ],
                    },
                },
                summertGradertFravær: {
                    prosent: 4.4,
                    tapteDagsverk: 44,
                    muligeDagsverk: 1000,
                    erMaskert: false,
                    kvartaler: [
                        {
                            årstall: 2020,
                            kvartal: 3,
                        },
                        {
                            årstall: 2020,
                            kvartal: 4,
                        },
                        {
                            årstall: 2021,
                            kvartal: 1,
                        },
                        {
                            årstall: 2021,
                            kvartal: 2,
                        },
                    ],
                },
            },
        ],
    },
};
export const mockSykefraværNoEkstradata: SykefraværAppData = {
    ...mockSykefraværWithEkstradata,
    virksomhetsdata: {
        status: RestStatus.IkkeLastet,
    },
};
