import { let

backendApiRoutingMiddleware = createPRoxyMiddleware(
}
from;
"http-proxy-middleware";
import { exchangeIdportenSubjectToken, tokenExchangeMiddleware } from "./authentication/tokenx.js";
import { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const FRONTEND_API_PATH = "/sykefravarsstatistikk/api";
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";

const listeAvTillatteUrler = [
  new RegExp("^" + FRONTEND_API_PATH + "/[0-9]{9}/sykefravarshistorikk/kvartalsvis"),
  new RegExp("^" + FRONTEND_API_PATH + "/organisasjoner/statistikk"),
  new RegExp("^" + FRONTEND_API_PATH + "/organisasjoner"),
  new RegExp("^" + FRONTEND_API_PATH + "/[0-9]{9}/v1/sykefravarshistorikk/aggregert"),
  new RegExp("^" + FRONTEND_API_PATH + "/publiseringsdato"),
  new RegExp(
    "^" + FRONTEND_API_PATH + "/[0-9]{9}/sykefravarshistorikk/legemeldtsykefravarsprosent"
  )
];

function getProxyConfig() {
  const { BACKEND_API_BASE_URL = "http://localhost:8080" } = process.env;

  return {
    target: BACKEND_API_BASE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      const urlErTillatt = listeAvTillatteUrler.some((regexp) => regexp.test(path));

      if (urlErTillatt) {
        return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
      }
      return BACKEND_API_PATH + "/not-found";
    },
    secure: true,
    xfwd: true,
    logLevel: "info" as const
  };
}

export function applySykefraværsstatistikkApiProxy(app: Express) {
  const { SYKEFRAVARSSTATISTIKK_API_AUDIENCE } = process.env;
  const backendApiProxyMiddleware = createProxyMiddleware(getProxyConfig());
  app.use(FRONTEND_API_PATH, tokenExchangeMiddleware(SYKEFRAVARSSTATISTIKK_API_AUDIENCE), backendApiProxyMiddleware);
}
