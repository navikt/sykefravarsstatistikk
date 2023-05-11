import { MockedRequest, setupWorker } from 'msw';
import { mswHandlersForMockApp } from './msw-handlers-for-mock-app';
import { logger } from "../../utils/logger";

export async function startMockServiceWorker() {
    logger.info("Starting mock service worker");
    // msw krever "/" på slutten av url for å fungere sammen med "homepage"-config i CRA
    if (window.location.pathname === '/sykefravarsstatistikk') {
        window.location.pathname = '/sykefravarsstatistikk/';
        return;
    }
    const worker = setupWorker(...mswHandlersForMockApp);
    await worker.start({
        serviceWorker: {
            url: '/sykefravarsstatistikk/mockServiceWorker.js',
        },
        onUnhandledRequest: ignoreStaticAssetsOtherwiseWarn(),
    });
}

function ignoreStaticAssetsOtherwiseWarn() {
    return (req: MockedRequest, print: { warning(): void }) => {
        if (req.url.pathname.includes('/static/')) {
            return;
        }
        print.warning();
    };
}
