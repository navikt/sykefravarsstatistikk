import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import {
    getGrønnGrenseTekst,
    getRødGrenseTekst,
    siste4PubliserteKvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { LenkeTilHistorikk } from '../../../felleskomponenter/LenkeTilHistorikk';

interface Props {
    resultat: SykefraværResultat;
    kvartaler?: ÅrstallOgKvartal[];
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({
    resultat,
    kvartaler,
}) => {
    const grønnGrense = getGrønnGrenseTekst(sykefraværForBarnehagerSiste4Kvartaler.totalt);
    const rødGrense = getRødGrenseTekst(sykefraværForBarnehagerSiste4Kvartaler.totalt);

    switch (resultat) {
        case SykefraværResultat.OVER:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen blir markert rød når ditt sykefravær er høyere enn{' '}
                        {rødGrense} prosent. Det betyr at du har høyere sykefravær enn andre
                        barnehager i Norge. Det er ikke tatt hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen blir markert gul når ditt sykefravær ligger mellom{' '}
                        {grønnGrense} og {rødGrense} prosent. Det betyr at du har omtrent likt
                        sykefravær som andre barnehager i Norge. Det er ikke tatt hensyn til din
                        virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer total" />
                </>
            );
        case SykefraværResultat.UNDER:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken
                        som NAV og Statistisk sentralbyrå (SSB) utarbeider.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Sammenligningen blir markert grønn når ditt sykefravær ligger under{' '}
                        {grønnGrense} prosent. Det betyr at du har lavere sykefravær enn andre
                        barnehager i Norge. Det er ikke tatt hensyn til din virksomhetens størrelse.
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
                        Resultatet blir markert grå når vi ikke kan sammenligne.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Du har for lave tall til at vi kan vise statistikken din. Med få ansatte kan
                        det være mulig å identifisere enkeltansatte. Vi viser derfor ikke
                        statistikken av hensyn til personvern.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Du kan fortsatt se statistikk for din bransje.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
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
                    <Normaltekst>
                        Resultatet blir markert grå når vi ikke kan sammenligne.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat-tekst__paragraf">
                        Vi finner ikke tall for virksomheten din. Det kan være fordi bedriften nylig
                        har blitt opprettet. Statistikken publiseres kvartalsvis.
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
