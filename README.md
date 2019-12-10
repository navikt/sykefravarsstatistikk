Sykefraværsstatistikk
================

Denne appen gir arbeidsgivere muligheten til å sammenligne sykefraværet i egen virksomhet, med sykefraværet i bransjen, sektoren og i hele landet.
 Hensikten er å gjøre arbeidsgivere mer engasjerte i eget sykefravær.

# Komme i gang

- Installere avhengigheter: `npm install`
- Kjøre applikasjon med mock: `npm run mock`
   * ved behov kan funksjonen `mockSammenligningForbidden()` aktiveres i `mock.ts` for å fremprovosere en 403 response fra API-et  
- Kjøre applikasjonen mot egen backend, alt annet mocket: `npm run mock-msa` (NB! Krever at `sykefravarsstatistikk-api` kjører på port 8080)
    * For å få et gyldig token lokalt, besøk `http://localhost:8080/sykefravarsstatistikk-api/local/cookie?subject=<test-fnr>&cookiename=selvbetjening-idtoken&redirect=http://localhost:3000/sykefravarsstatistikk`
- Kjøre applikasjonen normalt: `npm start` (NB! Krever integrasjon med `sykefravarsstatistikk-api` og `ditt-nav-arbeidsgiver-api`)

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Lars Andreas Tveiten, lars.andreas.van.woensel.kooy.tveiten@nav.no
* Thomas Dufourd, thomas.dufourd@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #tag-teamia.