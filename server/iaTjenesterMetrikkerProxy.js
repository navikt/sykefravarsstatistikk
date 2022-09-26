const {FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH} = require('./konstanter');
const {createProxyMiddleware} = require('http-proxy-middleware');
const {exchangeToken} = require('./tokenx');

const envProperties = {
  IA_TJENESTER_METRIKKER_BASE_URL: process.env.IA_TJENESTER_METRIKKER_BASE_URL
      || 'http://localhost:9090/ia-tjenester-metrikker',
};

const BACKEND_IA_TJENESTER_METRIKKER_PATH = '/';
const IA_TJENESTER_METRIKKER_BASE_URL = `${envProperties.IA_TJENESTER_METRIKKER_BASE_URL}`;

const proxyConfig = {
  target: IA_TJENESTER_METRIKKER_BASE_URL,
  changeOrigin: true,

  pathRewrite: (path) => {
    return path.replace(FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH,
        BACKEND_IA_TJENESTER_METRIKKER_PATH);
  },
  router: async (req) => {
    if (process.env.NODE_ENV === 'labs-gcp') {
      // I labs så returnerer vi mock uansett
      return undefined;
    }
    const tokenSet = await exchangeToken(req);
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
    }
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: 'info',
};

const iaTjenesterMetrikkerProxy = createProxyMiddleware(
    FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH, proxyConfig);
module.exports = iaTjenesterMetrikkerProxy;
