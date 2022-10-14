# Sykefraværsstatistikk

Denne appen gir arbeidsgivere muligheten til å sammenligne sykefraværet i egen virksomhet, med sykefraværet i bransjen,
sektoren og i hele landet. Hensikten er å gjøre arbeidsgivere mer engasjerte i eget sykefravær.

# Testmiljø

- https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk/ -- Funker direkte fra nettleser med Mock data uten tilkobling
  til backend/preprod data. Hit deployes helst kun master.
- https://arbeidsgiver-gcp.dev.nav.no/sykefravarsstatistikk/ -- krever naisdevice, brukes til utvikling.

# Kom i gang

- Installer avhengigheter med `yarn`
- Rename filen `.env.example` -> `.env`
-
-

## Tester

Tester kan kjøres med `yarn test`.

Dersom du ønsker å kjøre testene via Intellij sin jest-plugin, legg inn

``` 
--setupFilesAfterEnv=<rootDir>/jest/setupTests.ts 
```

under `Jest options` i `Edit configurations` -> `edit configuration templates` -> `Jest`. Merk at denne endringen kun
trer i kraft på _nye_ konfigurasjoner.

# Kjøring av applikasjonen

- Kjør opp applikasjon med rene mock-data: `yarn mock` (for Windows: `yarn wock`)

- Hvis du vil kjøre mot egen sykefraværsstatistikk-backend lokalt, kan du sette `mock.sykefraværsstatistikkApi = false`
  i `mock.ts` før du kjører `yarn mock`. (NB! Krever at `sykefravarsstatistikk-api` kjører på port 8080.). Da må du
  kjøre `yarn mock` først før `yarn start`.

- For å kjøre applikasjonen uten mock: `yarn start` (NB! Krever integrasjon med `sykefravarsstatistikk-api`
  og `ditt-nav-arbeidsgiver-api`)

## Kjøre applikasjonen med Docker:

1. Start container runtime (f.eks docker desktop eller colima)
2. `yarn install && yarn build`
3. `docker build -t sykefravarsstatistikk .`
4. `docker run -e NODE_ENV=development --env-file=./.env.example -d -p 3000:3000 sykefravarsstatistikk`
5. For å stoppe, kjør `docker stop <id>` hvor id-en hentes ved å kjøre `docker ps`

---

# Henvendelser

## For Nav-ansatte

* Dette Git-repositoriet eies
  av [Team IA i Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx)
  .
* Slack-kanaler:
    * [#arbeidsgiver-teamia-utvikling](https://nav-it.slack.com/archives/C016KJA7CFK)
    * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)
    * [#arbeidsgiver-general](https://nav-it.slack.com/archives/CCM649PDH)

## For folk utenfor Nav

* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/arbeidsgiver
* IT-avdelingen
  i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)
