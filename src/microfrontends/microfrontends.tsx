import React, { FunctionComponent } from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { AsyncNavspa } from '@navikt/navspa';
import './microfrontends.less';
import { SAMTALESTØTTE_MIKROFONTEND, SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH } from '../konstanter';
import assetManifestParser from './assetManifestUtils';

type PodletProps = {
    visning: string | undefined;
};

const LasterInn: FunctionComponent = () => (
    <div className="microfrontends__laster-inn">
        <NavFrontendSpinner />
    </div>
);

const samtalestottePodletConfig = {
    appName: SAMTALESTØTTE_MIKROFONTEND,
    appBaseUrl: SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH,
    assetManifestParser,
    loader: <LasterInn />,
};

export const SamtalestøttePodlet = AsyncNavspa.importer<PodletProps>(samtalestottePodletConfig);
