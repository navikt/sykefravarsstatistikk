import React, { FunctionComponent, useContext } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import Sammenligningspanel from './Forside/Sammenligningspanel/Sammenligningspanel';
import { RestAltinnOrganisasjoner } from './api/altinnorganisasjon-api';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import { RestSykefraværshistorikk } from './api/sykefraværshistorikk';
import { RestVirksomhetMetadata } from './api/virksomhetMetadata';
import IAWebRedirectPanel from './IAWebRedirectSide/IAWebRedirectPanel';
import IAWebRedirectSide from './IAWebRedirectSide/IAWebRedirectSide';
import { BASE_PATH } from './konstanter';
import {
    virksomhetMetadataContext,
    VirksomhetMetadataProvider,
} from './utils/virksomhetMetadataContext';
import {
    sykefraværshistorikkContext,
    SykefraværshistorikkProvider,
} from './utils/sykefraværshistorikkContext';
import { sendEventDirekte, useMålingAvTidsbruk } from './amplitude/amplitude';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
    AltinnOrganisasjonerMedTilgangTilStatistikkProvider,
    AltinnOrganisasjonerProvider,
} from './utils/altinnOrganisasjonerContext';
import { useSetUserProperties } from './amplitude/userProperties';
import { featureTogglesContext, FeatureTogglesProvider } from './utils/FeatureTogglesContext';
import Lenkeressurser from './Forside/Lenkeressurser/Lenkeressurser';
import Kalkulator from './Kalkulator/Kalkulator/Kalkulator';
import { BarnehageRedirect, GenerellForsideRedirect } from './utils/redirects';
import { Forside } from './Forside/Forside';
import { SammenligningspanelBarnehage } from './Forside/barnehage/SammenligningspanelBarnehage/SammenligningspanelBarnehage';
import {
    sykefraværsvarighetContext,
    SykefraværsvarighetProvider,
} from './utils/sykefraværsvarighetContext';
import { RestSykefraværsvarighet } from './api/sykefraværsvarighet';
import { TilbakemeldingContextProvider } from './utils/TilbakemeldingContext';
import { EnhetsregisteretProvider } from './utils/enhetsregisteretContext';
import { SammenligningIngress } from './Forside/barnehage/SammenligningIngress/SammenligningIngress';
import { SammenligningSiste4KvartalerMedBransje } from './Forside/barnehage/SammenligningMedBransje/SammenligningSiste4KvartalerMedBransje';
import { DetaljertSammenligning } from './Forside/barnehage/DetaljertSammenligning/DetaljertSammenligning';
import { LærteDuNoeNyttPanel } from './felleskomponenter/LærteDuNoeNyttPanel/LærteDuNoeNyttPanel';
import { ABTest } from './felleskomponenter/ABTest/ABTest';
import { Sidetittel } from 'nav-frontend-typografi';
import { RestFeatureToggles } from './api/featureToggles';

export const PATH_FORSIDE = '/';
export const PATH_FORSIDE_GENERELL = '/sammenligning';
export const PATH_FORSIDE_BARNEHAGE = PATH_FORSIDE_GENERELL + '/barnehage';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';
export const PATH_IAWEB_REDIRECTSIDE = '/iawebredirectside';

const App: FunctionComponent = () => {
    sendEventDirekte('forside', 'sidelastet');
    return (
        <BrowserRouter basename={BASE_PATH}>
            <AltinnOrganisasjonerProvider>
                <AltinnOrganisasjonerMedTilgangTilStatistikkProvider>
                    <VirksomhetMetadataProvider>
                        <EnhetsregisteretProvider>
                            <SykefraværsvarighetProvider>
                                <SykefraværshistorikkProvider>
                                    <FeatureTogglesProvider>
                                        <TilbakemeldingContextProvider>
                                            <main id="maincontent">
                                                <AppContent />
                                            </main>
                                        </TilbakemeldingContextProvider>
                                    </FeatureTogglesProvider>
                                </SykefraværshistorikkProvider>
                            </SykefraværsvarighetProvider>
                        </EnhetsregisteretProvider>
                    </VirksomhetMetadataProvider>
                </AltinnOrganisasjonerMedTilgangTilStatistikkProvider>
            </AltinnOrganisasjonerProvider>
        </BrowserRouter>
    );
};

const AppContent: FunctionComponent = () => {
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext
    );
    const restSykefraværsvarighet = useContext<RestSykefraværsvarighet>(sykefraværsvarighetContext);
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restFeatureToggles = useContext<RestFeatureToggles>(featureTogglesContext);
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const location = useLocation();
    useSetUserProperties();
    useMålingAvTidsbruk('hele appen', 5, 30, 120, 300);

    const brukerHarIkkeTilgangTilNoenOrganisasjoner =
        restOrganisasjoner.status === RestStatus.Suksess && restOrganisasjoner.data.length === 0;

    let innhold;
    if (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restVirksomhetMetadata.status === RestStatus.LasterInn
    ) {
        innhold = <Lasteside />;
    } else if (
        restOrganisasjoner.status === RestStatus.IkkeInnlogget &&
        !location.pathname.includes('iawebredirectside')
    ) {
        return <Innloggingsside />;
    } else if (
        restOrganisasjoner.status !== RestStatus.Suksess &&
        !location.pathname.includes('iawebredirectside')
    ) {
        innhold = <FeilFraAltinnSide />;
    } else if (brukerHarIkkeTilgangTilNoenOrganisasjoner) {
        window.location.replace('/min-side-arbeidsgiver/mangler-tilgang');
    } else {
        innhold = (
            <>
                <Route path={PATH_FORSIDE} exact={true}>
                    <BarnehageRedirect restVirksomhetMetadata={restVirksomhetMetadata} />
                    <GenerellForsideRedirect restVirksomhetMetadata={restVirksomhetMetadata} />
                </Route>
                <Route path={PATH_FORSIDE_GENERELL} exact={true}>
                    <BarnehageRedirect restVirksomhetMetadata={restVirksomhetMetadata} />
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <InnloggingssideWrapper
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    >
                        <Forside>
                            <Sammenligningspanel
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                            <KalkulatorPanel liten />
                            <Historikkpanel />
                            <Lenkeressurser />
                        </Forside>
                    </InnloggingssideWrapper>
                </Route>
                <Route path={PATH_FORSIDE_BARNEHAGE} exact={true}>
                    <GenerellForsideRedirect restVirksomhetMetadata={restVirksomhetMetadata} />
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <InnloggingssideWrapper
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    >
                        <Forside>
                            <SammenligningspanelBarnehage
                                restSykefraværsvarighet={restSykefraværsvarighet}
                                restAltinnOrganisasjoner={restOrganisasjoner}
                            >
                                <SammenligningIngress />
                                <SammenligningSiste4KvartalerMedBransje
                                    restSykefraværsvarighet={restSykefraværsvarighet}
                                />
                                <DetaljertSammenligning
                                    restSykefraværsvarighet={restSykefraværsvarighet}
                                />
                                <LærteDuNoeNyttPanel
                                    tekst="Var dette nyttig?"
                                    område="forside sammenligning tilbakemelding"
                                    skalVises={
                                        restSykefraværsvarighet.status === RestStatus.Suksess
                                    }
                                />
                                {/*<EkspanderbarSammenligning
                                    restSykefraværsvarighet={restSykefraværsvarighet}
                                />
                                <EkspanderbareTips tips={tipsliste} />*/}
                                <ABTest
                                    feature={'sykefravarsstatistikk.ab-test.tips'}
                                    restFeatureToggles={restFeatureToggles}
                                    versjonA={<Sidetittel>Versjon A</Sidetittel>}
                                    versjonB={<Sidetittel>Versjon B</Sidetittel>}
                                />
                            </SammenligningspanelBarnehage>
                            <KalkulatorPanel liten />
                            <Historikkpanel />
                            <Lenkeressurser />
                        </Forside>
                    </InnloggingssideWrapper>
                </Route>
                <Route path={PATH_KALKULATOR} exact={true}>
                    <Brødsmulesti gjeldendeSide="kalkulator" />
                    <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />
                </Route>
                <Route path={PATH_HISTORIKK} exact={true}>
                    <Brødsmulesti gjeldendeSide="historikk" />
                    <GrafOgTabell
                        restSykefraværsstatistikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    />
                </Route>
                <Route path={PATH_IAWEB_REDIRECTSIDE} exact={true}>
                    <IAWebRedirectSide restSykefraværshistorikk={restSykefraværshistorikk}>
                        <IAWebRedirectPanel />
                    </IAWebRedirectSide>
                </Route>
            </>
        );
    }

    return (
        <>
            {!location.pathname.includes('iawebredirectside') && (
                <Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={restOrganisasjoner} />
            )}
            {innhold}
        </>
    );
};

export default App;
