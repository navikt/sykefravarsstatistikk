import { frontendLogger } from "./frontendLogger";
import { backendLogger } from "./backendLogger";

// Må synces med listen over predefinerte feilmeldinger i server
export const predefinerteFeilmeldinger = {
  feilVedHentingAvAltinnOrganisasjoner: "Feil ved kall til Altinn for henting av organisasjoner",
  virksomhetensEllerBransjensTallErNaN: "virksomhetens eller bransjens tall er NaN",
  kunneIkkeParseAggregertDataFeil: "Kunne ikke parse aggregert data",
  ukjentFeilMedAggregertData: "Ukjent feil med aggregert data",
  brukerIkkeInloggetFeil: "Nettverkskall feilet da bruker ikke er innlogget",
  brukerIkkeAutorisertFeil: "Nettverkskall feilet da bruker ikke er Autorisert",
  feilVedNettverkskall: "Det er oppstått en feil ved nettverkskall"
}

// This logger is isomorphic, and can be imported from anywhere in the app
export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger();
