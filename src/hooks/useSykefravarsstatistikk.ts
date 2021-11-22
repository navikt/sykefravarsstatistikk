import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikk } from './useAltinnOrganisasjonerMedStatistikk';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { useVirksomhetsdata } from './useVirksomhetsdata';
import { EnhetsregisteretState, useEnheter } from './useEnheter';
import { RestSummertSykefraværshistorikk } from '../api/summert-sykefraværshistorikk-api';
import { useSummertSykefravær } from './useSummertSykefravær';
import { useSykefraværshistorikk } from './useSykefraværshistorikk';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { useFeatureToggles } from './useFeatureToggles';
import { RestFeatureToggles } from '../api/feature-toggles-api';
import {
    Ekstradata,
    getEkstraDataFraEnhetsregisteret,
    getEkstraDataFraSummertSykefraværshistorikk,
    getEkstraDataFraSykefraværshistorikk,
    getEkstraDataFraVirksomhetsdata,
} from '../amplitude/ekstradata';
import { RestRessurs, RestStatus } from '../api/api-utils';

export interface Sykefravarsstatistikk {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
    virksomhetsdata: RestVirksomhetsdata;
    enhetsInformasjon: EnhetsregisteretState;
    summertSykefravær: RestSummertSykefraværshistorikk;
    fraværshistorikk: RestSykefraværshistorikk;
    featureToggles: RestFeatureToggles;
    ekstradata?: Partial<Ekstradata>;
}

export function useSykefravarsstatistikk(): Sykefravarsstatistikk {
    const altinnOrganisasjoner = useAltinnOrganisasjoner();
    const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
    const virksomhetsdata = useVirksomhetsdata();
    const enhetsInformasjon = useEnheter();
    const summertSykefravær = useSummertSykefravær();
    const fraværshistorikk = useSykefraværshistorikk();
    const featureToggles = useFeatureToggles();
    const ressurser: RestRessurs<any>[] = [
        fraværshistorikk,
        summertSykefravær,
        virksomhetsdata,
        enhetsInformasjon.restOverordnetEnhet,
        enhetsInformasjon.restUnderenhet,
    ];

    return {
        altinnOrganisasjoner,
        altinnOrganisasjonerMedStatistikk,
        virksomhetsdata,
        enhetsInformasjon,
        summertSykefravær,
        fraværshistorikk,
        featureToggles,
        ...(ressurser.every((ressurs) => ressurs.status === RestStatus.Suksess) && {
            ekstradata: getEkstradata({
                fraværshistorikk,
                summertSykefravær,
                virksomhetsdata,
                enhetsInformasjon,
            }),
        }),
    };
}

function getEkstradata({
    fraværshistorikk,
    summertSykefravær,
    virksomhetsdata,
    enhetsInformasjon,
}: {
    summertSykefravær: RestSummertSykefraværshistorikk;
    fraværshistorikk: RestSykefraværshistorikk;
    virksomhetsdata: RestVirksomhetsdata;
    enhetsInformasjon: EnhetsregisteretState;
}): Partial<Ekstradata> {
    return {
        ...getEkstraDataFraVirksomhetsdata(virksomhetsdata),
        ...getEkstraDataFraSykefraværshistorikk(fraværshistorikk),
        ...getEkstraDataFraSummertSykefraværshistorikk(summertSykefravær, virksomhetsdata),
        ...getEkstraDataFraEnhetsregisteret(enhetsInformasjon.restOverordnetEnhet, virksomhetsdata),
    };
}
