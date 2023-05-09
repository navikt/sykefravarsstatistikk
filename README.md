# Sykefraværsstatistikk

Denne appen gir arbeidsgivere muligheten til å sammenligne sykefraværet i egen virksomhet, med sykefraværet i bransjen,
sektoren og i hele landet. Hensikten er å gjøre arbeidsgivere mer engasjerte i eget sykefravær.

# Testmiljø

- https://arbeidsgiver.ekstern.dev.nav.no/sykefravarsstatistikk/ -- Funker direkte fra nettleser med Mock data uten tilkobling
  til backend/preprod data. Hit deployes helst kun master.
- https://sykefravarsstatistikk.intern.dev.nav.no/sykefravarsstatistikk/ -- brukes til utvikling. Krever naisdevice og innlogging
  med test-fnr,

# Kom i gang

Rename filen `.env.example` -> `.env`

For å kunne laste ned pakker fra Github Package Registry må du logge inn på npm:
```
npm login --registry https://npm.pkg.github.com
```
- USERNAME: Din GitHub-bruker
- PASSWORD: Et [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic) med `packages:read`-scope, som må være autorisert for `navikt`-organisasjonen i github (med SSO)
- E-MAIL: En e-post du har koplet til GitHub

Installer avhengigheter med `yarn`

## Tester

Tester kan kjøres med `yarn test`.

Dersom du ønsker å kjøre testene via Intellij sin jest-plugin, legg inn

``` 
--setupFilesAfterEnv=<rootDir>/jest/setupTests.ts 
```

under `Jest options` i `Edit configurations` -> `edit configuration templates` -> `Jest`. Merk at denne endringen kun
trer i kraft på _nye_ konfigurasjoner.

# Kjøring av applikasjonen

- Kjør opp applikasjon med rene mock-data: `yarn mock`

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

# Kontakt

* For spørsmål eller henvendelser, opprett gjerne et issue her på GitHub.
* Koden utvikles og driftes av Team IA i [Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanal [#teamia](https://nav-it.slack.com/archives/CMN0M3CDP)
