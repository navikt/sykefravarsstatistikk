import React, { FunctionComponent } from 'react';
import { SykefraværVurdering } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import { siste4PubliserteKvartaler } from '../barnehage-utils';
import { LenkeTilHistorikk } from '../../../felleskomponenter/LenkeTilHistorikk';

interface Props {
    resultat: SykefraværVurdering;
    kvartaler?: ÅrstallOgKvartal[];
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
    resultat,
    kvartaler,
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
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
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
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                </>
            );
        case SykefraværVurdering.FEIL:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Tallene er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Normaltekst>—</Normaltekst>
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
