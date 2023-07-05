import { OTELApi, faro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
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
    ReactIntegration,
    ReactRouterVersion,
} from '@grafana/faro-react';

export function doInitializeFaro(grafanaUrl: string) {
    initializeFaro({
        url: grafanaUrl,
        app: {
            name: 'sykefraværsstatistikk',
            version: 'dev',
        },
        instrumentations: [
            ...getWebInstrumentations(),
            new TracingInstrumentation(),
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

    const { trace, context } = faro.api.getOTEL() as OTELApi;

    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('some business process');

    const someBusinessProcess = () => {};

    context.with(trace.setSpan(context.active(), span), () => {
        someBusinessProcess();
        span.end();
    });
}
