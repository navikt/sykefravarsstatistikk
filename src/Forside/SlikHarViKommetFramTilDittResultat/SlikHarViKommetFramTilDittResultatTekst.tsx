import React, { FunctionComponent } from 'react';
import { SykefraværVurdering } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import { LenkeTilHistorikk } from '../../felleskomponenter/LenkeTilHistorikk';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { PeriodeForBeskrivelse } from './PeriodeForBeskrivelse';

interface Props {
    resultat: SykefraværVurdering;
    kvartaler?: ÅrstallOgKvartal[];
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
    resultat,
    kvartaler,
    restPubliseringsdatoer,
}) => {
    switch (resultat) {
        case SykefraværVurdering.OVER:
        case SykefraværVurdering.MIDDELS:
        case SykefraværVurdering.UNDER:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen tar ikke ta hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværVurdering.MASKERT:
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
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>Dine tall er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <PeriodeForBeskrivelse restPubliseringsdatoer={restPubliseringsdatoer} />
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværVurdering.FEIL_ELLER_INGEN_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>
                       Vi klarte ikke å hente dine tall. Neste publiseringsdato for sykefraværsstatistikk er:
                    </Normaltekst>
                    <PeriodeForBeskrivelse restPubliseringsdatoer={restPubliseringsdatoer} />
                </>
            );
        default:
            return null;
    }
};

const Kvartalsliste: FunctionComponent<{ kvartaler?: ÅrstallOgKvartal[] }> = ({ kvartaler }) => (
    <ul className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__kvartalsliste">
        {kvartaler?.map((kvartal, index) => (
            <Normaltekst tag="li" key={index}>
                {kvartal.kvartal}. kvartal {kvartal.årstall}
            </Normaltekst>
        ))}
    </ul>
);
