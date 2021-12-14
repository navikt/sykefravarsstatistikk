# Sykefraværsstatistikk

Denne appen gir arbeidsgivere muligheten til å sammenligne sykefraværet i egen virksomhet, med sykefraværet i bransjen, sektoren og i hele landet.
Hensikten er å gjøre arbeidsgivere mer engasjerte i eget sykefravær.

# Testmiljø

-   https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk/ -- Funker direkte fra nettleser med Mock data uten tilkobling til backend/preprod data
-   https://arbeidsgiver-q.nav.no/sykefravarsstatistikk/ -- Funker fra `utviklerimage` med innlogget bruker og test FnR

# Komme i gang

- Installere avhengigheter: `yarn`
- Kjøre applikasjon med mock: `yarn run mock` (for Windows: `yarn run wock`)
- Rename filen `.env.example` -> `.env`
- Hvis du vil kjøre mot egen backend lokalt, kan du sette `mock.sykefraværsstatistikkApi = false` i `mock.ts` før du kjører `yarn mock`. (NB! Krever at `sykefravarsstatistikk-api` kjører på port 8080.)
- Kjøre applikasjonen normalt: `yarn start` (NB! Krever integrasjon med `sykefravarsstatistikk-api` og `ditt-nav-arbeidsgiver-api`)
- Kjøre applikasjonen med Docker:
    1. `yarn install && yarn build`
    2. `docker build -t sykefravarsstatistikk .`
    3. `docker run -d -p 3000:3000 sykefravarsstatistikk`
    4. For å stoppe, kjør `docker stop <id>` med id-en fra forrige kommando

---

# Henvendelser

## For Nav-ansatte
* Dette Git-repositoriet eies av [Team IA i Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanaler:
    * [#arbeidsgiver-teamia-utvikling](https://nav-it.slack.com/archives/C016KJA7CFK)
    * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)
    * [#arbeidsgiver-general](https://nav-it.slack.com/archives/CCM649PDH)

## For folk utenfor Nav
* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/arbeidsgiver
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)
