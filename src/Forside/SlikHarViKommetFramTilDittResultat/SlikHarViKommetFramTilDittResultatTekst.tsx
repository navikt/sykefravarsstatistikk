import React, { FunctionComponent } from 'react';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { PeriodeForBeskrivelse } from './PeriodeForBeskrivelse';
import { SykefraværVurdering } from '../vurdering-utils';

interface Props {
    resultat: SykefraværVurdering;
    kvartaler?: ÅrstallOgKvartal[];
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
    resultat,
    restPubliseringsdatoer,
}) => {
    switch (resultat) {
        case 'OVER':
        case 'MIDDELS':
        case 'UNDER':
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen tar ikke ta hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                </>
            );
        case 'MASKERT':
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>
                        Sammenligningen tar ikke ta hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <PeriodeForBeskrivelse restPubliseringsdatoer={restPubliseringsdatoer} />
                </>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <PeriodeForBeskrivelse restPubliseringsdatoer={restPubliseringsdatoer} />
                </>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>
                        Vi klarte ikke å hente dine tall. Neste publiseringsdato for
                        sykefraværsstatistikk er:
                    </Normaltekst>
                    <PeriodeForBeskrivelse restPubliseringsdatoer={restPubliseringsdatoer} />
                </>
            );
        default:
            return null;
    }
};