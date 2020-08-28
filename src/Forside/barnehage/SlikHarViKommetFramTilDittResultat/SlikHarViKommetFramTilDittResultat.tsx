import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../../utils/sykefraværshistorikk-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import './SlikHarViKommetFramTilDittResultat.less';

interface Props {
    resultat: SykefraværResultat;
    kvartaler?: ÅrstallOgKvartal[];
}

export const SlikHarViKommetFramTilDittResultat: FunctionComponent<Props> = ({
    resultat,
    kvartaler,
}) => {
    switch (resultat) {
        case SykefraværResultat.OVER:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Sammenligningen blir markert rød når ditt sykefravær er høyere enn 9,1
                        prosent. Det er ikke tatt hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Sammenligningen blir markert gul når ditt sykefravær ligger mellom 7,5 og
                        9,1 prosent. Det er ikke tatt hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                </>
            );
        case SykefraværResultat.UNDER:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Sammenligningen blir markert grønn når ditt sykefravær ligger under 7,5
                        prosent. Det er ikke tatt hensyn til din virksomhetens størrelse.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Du har for lave tall til at vi kan vise sykefraværstatistikken din. Med få
                        ansatte kan det være mulig å identifisere enkeltansatte. Vi viser derfor
                        ikke statistikken av hensyn til personvern.
                    </Normaltekst>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Du kan fortsatt se statistikk for din bransje.
                    </Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Normaltekst>Dine tall er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <Kvartalsliste kvartaler={kvartaler} />
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                    <Normaltekst>
                        Vi mangler tall for deler av perioden med sammenligning.
                    </Normaltekst>
                    <Normaltekst>
                        Sammenligningen lages når vi har tall for alle perioder.
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Vi finner ikke tall for virksomheten din. Det kan være fordi bedriften nylig
                        har blitt opprettet. Statistikken publiseres kvartalsvis.
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens tall er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Kvartalsliste kvartaler={siste4PubliserteKvartaler} />
                    <Normaltekst>
                        Vi viser dine tall når de publiseres. Sammenligningen lages når vi har tall
                        for alle perioder.
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.FEIL:
            return (
                <>
                    <Normaltekst className="slik-har-vi-kommet-fram-til-ditt-resultat__paragraf">
                        Tallene er beregnet på sykefraværsstatistikk fra:
                    </Normaltekst>
                    <Normaltekst>—</Normaltekst>
                </>
            );
        default:
            return null;
    }
};

// TODO Hardkodede tall
const siste4PubliserteKvartaler: ÅrstallOgKvartal[] = [
    {
        årstall: 2020,
        kvartal: 1,
    },
    {
        årstall: 2019,
        kvartal: 4,
    },
    {
        årstall: 2019,
        kvartal: 3,
    },
    {
        årstall: 2019,
        kvartal: 2,
    },
];

const Kvartalsliste: FunctionComponent<{ kvartaler?: ÅrstallOgKvartal[] }> = ({ kvartaler }) => (
    <ul className="slik-har-vi-kommet-fram-til-ditt-resultat__kvartalsliste">
        {kvartaler?.map((kvartal, index) => (
            <Normaltekst tag="li" key={index}>
                {kvartal.kvartal}. kvartal {kvartal.årstall}
            </Normaltekst>
        ))}
    </ul>
);
