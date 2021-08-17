import React, { FunctionComponent } from "react";

import assetManifestParser from "./assetManifestUtils";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AsyncNavspa } from "@navikt/navspa";
import "./microfrontends.less";

type FellesPropsFraFarApplikasjon = {
    orgnr: string | undefined;
    ekstraData: string | null;
    visningsversjon: string | null;
};
const LasterInn: FunctionComponent = () => (
    <div className="microfrontends__laster-inn">
        <NavFrontendSpinner />
    </div>
);

const samtalestottePodletConfig = {
    appName: 'samtalestotte-podlet',
    appBaseUrl: '/samtalestotte-podlet',
    assetManifestParser,
    loader: <LasterInn />,
};

export const SamtalestøttePodlet =
    AsyncNavspa.importer<FellesPropsFraFarApplikasjon>(samtalestottePodletConfig);
