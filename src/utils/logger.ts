import { frontendLogger } from './frontendLogger';
import { backendLogger } from './backendLogger';

// Må synces med listen over predefinerte feilmeldinger i server
export const predefinerteFeilmeldinger = {
    feilVedHentingAvAltinnOrganisasjoner: 'Feil ved kall til Altinn for henting av organisasjoner',
    virksomhetensOgBransjensTallErNaN: 'Virksomhetens og bransjens tall er NaN',
    kunneIkkeParseAggregertDataFeil: 'Kunne ikke parse aggregert data',
    ukjentFeilMedAggregertData: 'Ukjent feil med aggregert data',
    brukerIkkeInloggetFeil: 'Nettverkskall feilet da bruker ikke er innlogget',
    brukerIkkeAutorisertFeil: 'Nettverkskall feilet da bruker ikke er Autorisert',
    feilVedNettverkskall: 'Det er oppstått en feil ved nettverkskall',
    feilVedParsingAvMiljøvariabler: "Kunne ikke parse miljøvariabler, bruker fallback verdier",
    fantIkkeMiljøvariabler: "Fant ikke script med miljøvariabler",
    finnerIkkeDocumentElement: "Dokumentelement er undefined"
};

// This logger is isomorphic, and can be imported from anywhere in the app
export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger();
