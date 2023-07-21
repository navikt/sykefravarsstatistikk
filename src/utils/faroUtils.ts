import {
    createRoutesFromChildren,
    matchRoutes,
    Routes,
    useLocation,
    useNavigationType,
} from 'react-router-dom';
import {
    getWebInstrumentations,
    initializeFaro,
    LogLevel,
    ReactIntegration,
    ReactRouterVersion,
} from '@grafana/faro-react';

export function doInitializeFaro(grafanaUrl: string, appVersion: string) {
    initializeFaro({
        url: grafanaUrl,
        app: {
            name: 'sykefraværsstatistikk',
            version: appVersion,
        },
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: true,
                captureConsoleDisabledLevels: [
                    LogLevel.TRACE,
                    LogLevel.DEBUG,
                    LogLevel.INFO,
                    LogLevel.LOG,
                ],
            }),
            new ReactIntegration({
                router: {
                    version: ReactRouterVersion.V6,
                    dependencies: {
                        createRoutesFromChildren,
                        matchRoutes,
                        Routes,
                        useLocation,
                        useNavigationType,
                    },
                },
            }),
        ],
    });
}
