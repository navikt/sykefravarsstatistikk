import { default as React, FunctionComponent } from 'react';
import { Sammenligningspaneler } from './Sammenligningspaneler/Sammenligningspaneler';
import { EkspanderbarSammenligning } from './EkspanderbarSammenligning/EkspanderbarSammenligning';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import { RestStatus } from '../api/api-utils';
import { ManglerRettigheterIAltinnSide } from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import { useOrgnr } from '../hooks/useOrgnr';
import './Forside.less';
import GrafOgTabell from '../GrafOgTabell/GrafOgTabell';
import { Normaltekst } from 'nav-frontend-typografi';
import { PubliseringsdatoOppdateringsinfo } from './SammenligningMedBransje/PubliseringsdatoOppdateringsinfo';
import { getBransjeEllerNæringKategori } from './EkspanderbarSammenligning/GetBransjeEllerNæringKategori';
import { Statistikkategori } from '../domene/statistikkategori';

export const Forside: FunctionComponent<SykefraværAppData> = (appData) => {
    const orgnr = useOrgnr() || '';

    const brukerHarIaRettighetTilValgtBedrift =
        appData.altinnOrganisasjonerMedStatistikktilgang.status === RestStatus.Suksess &&
        appData.altinnOrganisasjonerMedStatistikktilgang.data
            .map((org) => org.OrganizationNumber)
            .includes(orgnr);

    if (!brukerHarIaRettighetTilValgtBedrift) {
        return (
            <ManglerRettigheterIAltinnSide
                restOrganisasjonerMedStatistikk={appData.altinnOrganisasjonerMedStatistikktilgang}
            />
        );
    }

    const statistikKategori = getBransjeEllerNæringKategori(appData.aggregertStatistikk);
    const harBransje = statistikKategori === Statistikkategori.BRANSJE;

    const bransjeEllerNæring = appData.aggregertStatistikk.aggregertData?.get(
        harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
    );

    return (
        <div className="forside__wrapper">
            <div className="forside">
                <Sammenligningspaneler
                    restStatus={appData.aggregertStatistikk.restStatus}
                    restAltinnOrganisasjoner={appData.altinnOrganisasjoner}
                    restPubliseringsdatoer={appData.publiseringsdatoer}
                    restSykefraværshistorikk={appData.sykefraværshistorikk}
                >
                    <PubliseringsdatoOppdateringsinfo
                        restPubliseringsdatoer={appData.publiseringsdatoer}
                    />
                    <Normaltekst>
                        <strong>Du tilhører {harBransje ? 'bransjen' : 'næringen'}:</strong>{' '}
                        {bransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label}
                    </Normaltekst>
                    <EkspanderbarSammenligning
                        aggregertStatistikk={appData.aggregertStatistikk}
                        restPubliseringsdatoer={appData.publiseringsdatoer}
                    />
                </Sammenligningspaneler>
                <GrafOgTabell restSykefraværsstatistikk={appData.sykefraværshistorikk} />
            </div>
        </div>
    );
};
