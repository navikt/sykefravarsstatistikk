const { METRIKKER_API_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');
const HttpsProxyAgent = require('https-proxy-agent');

const listeAvTillatteUrler = [new RegExp('^' + METRIKKER_API_PATH + '/mottatt-iatjeneste')];
const proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

const proxyConfig = {
    // TODO: convert to env variable
    //target: 'http://localhost:8080',
    target: 'https://ia-tjenester-metrikker.dev.intern.nav.no',
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            // Dette er den fremtidige URL-en: TODO: bruk denne når PR #10 er i dev-gcp eller merget
            const nyPath = path.replace(
                METRIKKER_API_PATH + '/mottatt-iatjeneste',
                '/uinnlogget/mottatt-iatjeneste'
            );
            //const nyPath = path.replace(METRIKKER_API_PATH + '/mottatt-iatjeneste', '/metrikker/');
            console.log('Proxy path til', nyPath);
            return nyPath;
        } else {
            throw Error(
                'Path er ikke tillatt, request er ikke videresendt til ia-tjenester-metrikker: ' +
                    path
            );
        }
    },
    secure: true,
    xfwd: true,
    preserveHeaderKeyCase: true,
};

const getIATjenesterMetrikkerProxy = () => {
    if (proxyServer) {
        console.log(
            'Proxy server funnet. Legger til HttpsProxyAgent til proxyMiddleware for kunne fungere gjennom proxy.'
        );
        proxyConfig.agent = new HttpsProxyAgent(proxyServer);
    } else {
        console.log(
            'Ingen proxy server funnet. Oppretter proxyMiddleware uten HttpsProxyAgent (default)'
        );
    }
    return createProxyMiddleware(METRIKKER_API_PATH, proxyConfig);
};

module.exports = { getIATjenesterMetrikkerProxy };
