import { MockedRequest, setupWorker } from 'msw';
import { localMswHandlers } from './local-msw-handlers';

export async function startMockServiceWorker() {
    // msw krever "/" på slutten av url for å fungere sammen med "homepage"-config i CRA
    if (window.location.pathname === '/sykefravarsstatistikk') {
        window.location.pathname = '/sykefravarsstatistikk/';
        return;
    }
    const worker = setupWorker(...localMswHandlers);
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
