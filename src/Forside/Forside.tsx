import { default as React, FunctionComponent } from 'react';
import { Sammenligningspaneler } from './Sammenligningspanel/Sammenligningspaneler';
import { EkspanderbarSammenligning } from './EkspanderbarSammenligning/EkspanderbarSammenligning';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import { RestStatus } from '../api/api-utils';
import { ManglerRettigheterIAltinnSide } from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import { useOrgnr } from '../hooks/useOrgnr';
import './Forside.less';
import GrafOgTabell from '../GrafOgTabell/GrafOgTabell';

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

    return (
        <div className="forside__wrapper">
            <div className="forside">
                <Sammenligningspaneler
                    restStatus={appData.aggregertStatistikk.restStatus}
                    restAltinnOrganisasjoner={appData.altinnOrganisasjoner}
                    restAltinnOrganisasjonerMedStatistikktilgang={
                        appData.altinnOrganisasjonerMedStatistikktilgang
                    }
                >
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
