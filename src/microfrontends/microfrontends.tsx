import React, { FunctionComponent } from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { AsyncNavspa } from '@navikt/navspa';
import './microfrontends.less';
import { SAMTALESTØTTE_MIKROFONTEND, SAMTALESTØTTE_MIKROFRONTEND_PATH } from '../konstanter';
import { getMiljø } from '../utils/miljøUtils';

type PodletProps = {
    visning: string | undefined;
    orgnr?: string;
};

export type MikrofrontendConfig = {
    appBaseUrl: string;
};

const LasterInn: FunctionComponent = () => (
    <div className="microfrontends__laster-inn">
        <NavFrontendSpinner />
    </div>
);

const getMikrofrontendConfig = (): MikrofrontendConfig => {
    const miljø = getMiljø();

    switch (miljø) {
        case 'dev-sbs':
            return {
                appBaseUrl:
                    'https://arbeidsgiver-gcp.dev.nav.no' + SAMTALESTØTTE_MIKROFRONTEND_PATH
            };

        case 'local':
            return {
                appBaseUrl: 'http://localhost:3001' + SAMTALESTØTTE_MIKROFRONTEND_PATH
            };

        default:
            return { appBaseUrl: SAMTALESTØTTE_MIKROFRONTEND_PATH };
    }
};

const samtalestottePodletConfig = {
    appName: SAMTALESTØTTE_MIKROFONTEND,
    appBaseUrl: getMikrofrontendConfig().appBaseUrl,
    loader: <LasterInn />,
};

export const SamtalestøttePodlet = AsyncNavspa.importer<PodletProps>(samtalestottePodletConfig);
