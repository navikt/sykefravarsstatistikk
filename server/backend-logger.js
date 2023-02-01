const pino = require("pino")
const z = require("zod")

const logger = pino({
  timestamp: false,
  formatters: {
    level: (label) => {
      return { level: label };
    },
    log: (object) => {
      if (object.err) {
        // backendlogger has an Error-instance, frontendlogger has already serialized it
        const err = object.err instanceof Error ? pino.stdSerializers.err(object.err) : object.err;
        object.stack_trace = err.stack;
        object.type = err.type;
        object.message = err.message;
        delete object.err;
      }

      return object;
    },
  },
});


const levels = Object.freeze({
  "error": "error",
  "debug": "debug",
  "fatal": "fatal",
  "info": "info",
  "trace": "trace",
  "silent": "silent",
  "warn": "warn",
});


//Denne listen må synces med predefinerte feilmeldinger i klientkoden
const predefinerteFeilmeldinger = Object.freeze({
  feilVedHentingAvAltinnOrganisasjoner: "Feil ved kall til Altinn for henting av organisasjoner",
  virksomhetensEllerBransjensTallErNaN: "virksomhetens eller bransjens tall er NaN",
  kunneIkkeParseAggregertDataFeil: "Kunne ikke parse aggregert data",
  ukjentFeilMedAggregertData: "Ukjent feil med aggregert data",
  brukerIkkeInloggetFeil: "Nettverkskall feilet da bruker ikke er innlogget",
  brukerIkkeAutorisertFeil: "Nettverkskall feilet da bruker ikke er Autorisert",
  feilVedNettverkskall: "Det er oppstått en feil ved nettverkskall"
});

const tekniskeLoggFeil = Object.freeze({
  manglendeEllerMalformetMelding: "Prøver å logge en malformet eller manglende loggmelding",
  ikkePredefinertMelding: "Prøver å logge en ikke predefinert loggmelding"
});

function isValidLoggingLabel(label) {
  return typeof label === "string" && Object.values(levels).includes(label);//label in levels;
}

function isNonEmptyStringArray(message) {
  try{
    z.string().array().min(1).parse(message)
    return true
  } catch (e) {
    return false
  }
}

function isTimestamp(timestamp) {
  return typeof timestamp === "number"
}

function isLevel(level) {
  return typeof level === "object" && typeof level.label === "string"
}

function getMessage(message) {
  if (!isNonEmptyStringArray(message)){
    return tekniskeLoggFeil.manglendeEllerMalformetMelding
  }
  if(isNonEmptyStringArray(message) && Object.values(predefinerteFeilmeldinger).includes(message[0])) {
    return message[0]
  }
  return tekniskeLoggFeil.ikkePredefinertMelding
}

const loggingHandler = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  if (req.body === undefined) {
    res.status(400).json({ error: "400 Bad Request"})
    return
  }

  const { level, ts, messages } = req.body;

  if (!isLevel(level) || !isTimestamp(ts)) {
    res.status(400).json({ error: "400 Bad Request"})
    return
  }

  const message = getMessage(messages);

  const label = Object.values(tekniskeLoggFeil).includes(message) ? levels.error : level.label
  if (!isValidLoggingLabel(label)) {
    res.status(400).json({ error: `Invalid label ${label}` });
    return;
  }


  logger
    .child({
      x_timestamp: ts,
      x_isFrontend: true,
      x_userAgent: req.headers['user-agent'],
      x_request_id: req.headers['x-request-id'] ?? 'not-set',
    })
    [label](message);

  res.status(200).json({ ok: `ok` });
}

module.exports = loggingHandler;
