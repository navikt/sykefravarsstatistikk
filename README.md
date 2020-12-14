# Sykefraværsstatistikk

Denne appen gir arbeidsgivere muligheten til å sammenligne sykefraværet i egen virksomhet, med sykefraværet i bransjen, sektoren og i hele landet.
Hensikten er å gjøre arbeidsgivere mer engasjerte i eget sykefravær.

# Test miløer

-   https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk/ -- Funker direkte fra nettleser med Mock data uten tilkobling til backend/preprod data
-   https://sykefravarsstatistikk.herokuapp.com/sykefravarsstatistikk/ -- Funker direkte fra nettleser men "deprecated"
-   https://arbeidsgiver-q.nav.no/sykefravarsstatistikk/ -- Funker fra `utviklerimage` med innlogget bruker og test FnR

# Komme i gang

-   Installere avhengigheter: `yarn`
-   Kjøre applikasjon med mock: `yarn run mock` (for Windows: `yarn run wock`)
-   Hvis du vil kjøre mot egen backend lokalt, kan du sette `MOCK_SYKEFRAVÆRSSTATISTIKK = false` i `mock.ts` før du kjører `yarn mock`. (NB! Krever at `sykefravarsstatistikk-api` kjører på port 8080.)
-   Kjøre applikasjonen normalt: `yarn start` (NB! Krever integrasjon med `sykefravarsstatistikk-api` og `ditt-nav-arbeidsgiver-api`)
-   Kjøre applikasjonen med Docker:
    1. `yarn install && yarn build`
    2. `docker build -t sykefravarsstatistikk .`
    3. `docker run -d -p 3000:3000 sykefravarsstatistikk`
    4. For å stoppe, kjør `docker stop <id>` med id-en fra forrige kommando

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

-   Lars Andreas Tveiten, lars.andreas.van.woensel.kooy.tveiten@nav.no
-   Thomas Dufourd, thomas.dufourd@nav.no
-   Malaz Alkoj, Malaz.Alkoj@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #arbeidsgiver-teamia.
