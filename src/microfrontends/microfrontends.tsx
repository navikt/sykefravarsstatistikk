import React, { FunctionComponent } from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { AsyncNavspa } from '@navikt/navspa';
import './microfrontends.less';
import { SAMTALESTØTTE_MIKROFONTEND, SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH } from '../konstanter';
import assetManifestParser, { createAssetManifestParser } from './assetManifestUtils';
import { getMiljø } from '../utils/miljøUtils';

type PodletProps = {
    visning: string | undefined;
};

const LasterInn: FunctionComponent = () => (
    <div className="microfrontends__laster-inn">
        <NavFrontendSpinner />
    </div>
);
const getAppBaseURLMikrofrontend = () => {
    const miljø = getMiljø();
    console.log(miljø);
    switch (miljø) {
        case 'dev-sbs':
            return 'https://arbeidsgiver-gcp.dev.nav.no/samtalestotte-podlet';
        case 'local':
            return 'http://localhost:3001/samtalestotte-podlet';
        default:
            return 'https://arbeidsgiver.labs.nais.io/' + SAMTALESTØTTE_MIKROFONTEND;
    }
};
const samtalestottePodletConfig = {
    appName: SAMTALESTØTTE_MIKROFONTEND,
    appBaseUrl: getAppBaseURLMikrofrontend(),
    assetManifestParser: createAssetManifestParser(getAppBaseURLMikrofrontend()),
    loader: <LasterInn />,
};

export const SamtalestøttePodlet = AsyncNavspa.importer<PodletProps>(samtalestottePodletConfig);
