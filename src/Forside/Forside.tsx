import { default as React, FunctionComponent } from 'react';
import { Sammenligningspaneler } from './Sammenligningspanel/Sammenligningspaneler';
import { EkspanderbarSammenligning } from './EkspanderbarSammenligning/EkspanderbarSammenligning';
import Samtalestøttepanel from './Samtalestøttepanel/Samtalestøttepanel';
import { ArbeidsmiljøportalPanel } from './ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import Brødsmulesti from '../Brødsmulesti/Brødsmulesti';
import { RestStatus } from '../api/api-utils';
import { ManglerRettigheterIAltinnSide } from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import { useOrgnr } from '../hooks/useOrgnr';
import './Forside.less';
import { Historikkpanel } from "./Historikkpanel/Historikkpanel";

export const Forside: FunctionComponent<SykefraværAppData> = (appData) => {
    const orgnr = useOrgnr() || '';

    const brukerHarIaRettighetTilValgtBedrift =
        appData.altinnOrganisasjonerMedStatistikktilgang.status === RestStatus.Suksess &&
        appData.altinnOrganisasjonerMedStatistikktilgang.data
            .map((org) => org.OrganizationNumber)
            .includes(orgnr);

    const innhold = !brukerHarIaRettighetTilValgtBedrift ? (
        <ManglerRettigheterIAltinnSide
            restOrganisasjonerMedStatistikk={appData.altinnOrganisasjonerMedStatistikktilgang}
        />
    ) : (
        <>
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
            <div className="lenkepanelWrapper">
                <Historikkpanel />
                <Samtalestøttepanel />
            </div>
            <ArbeidsmiljøportalPanel restUnderenhet={appData.enhetsregisterdata.restUnderenhet} />
        </>
    );

    return (
        <>
            <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
            <div className="forside__wrapper">
                <div className="forside">{innhold}</div>
            </div>
        </>
    );
};
