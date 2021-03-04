const { FRONTEND_API_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');

const listeAvTillatteUrler = [new RegExp('^' + FRONTEND_API_PATH + '/mottatt-iatjeneste')];

const proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

const proxyConfig = {
    target: 'https://ia-tjenester-metrikker.dev.intern.nav.no',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            const nyPath = path.replace(FRONTEND_API_PATH + '/mottatt-iatjeneste', '/metrikker');
            console.log("Proxy path til", nyPath)
            return nyPath;
        } else {
            throw Error('Path er ikke tillatt, request er ikke videresendt til ia-tjenester-metrikker: ' + path);
        }
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
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
    return createProxyMiddleware('/mottatt-iatjeneste', proxyConfig);
};

module.exports = { getIATjenesterMetrikkerProxy };
