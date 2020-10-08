import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import { siste4PubliserteKvartaler } from '../barnehage-utils';
import { LenkeTilHistorikk } from '../../../felleskomponenter/LenkeTilHistorikk';

interface Props {
    resultat: SykefraværResultat;
    kvartaler?: ÅrstallOgKvartal[];
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
    resultat,
    kvartaler,
}) => {
    switch (resultat) {
        case SykefraværResultat.OVER:
        case SykefraværResultat.MIDDELS:
        case SykefraværResultat.UNDER:
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
        case SykefraværResultat.MASKERT:
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
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Resultatet blir markert grå når vi ikke kan sammenligne.
                    </Normaltekst>
                    <Normaltekst>
                        Vi mangler tall for deler av perioden med sammenligning.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen lages når vi har tall for alle perioder.
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
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Vi viser dine tall når de publiseres. Sammenligningen lages når vi har tall
                        for alle perioder.
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                </>
            );
        case SykefraværResultat.FEIL:
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
