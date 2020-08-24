import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';
import KoronaInfotekst from '../Sammenligningspanel/KoronaInfotekst/KoronaInfotekst';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';

export const SammenligningIngress: FunctionComponent = () => {
    // TODO: Teksten her er ikke ferdig.
    return (
        <>
            <KoronaInfotekst className="sammenligning-ingress__koronainfo" />
            <Systemtittel className="sammenligning-ingress__tittel">
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre barnehager i Norge.
                Vi har laget en oversikt for deg.
            </Normaltekst>
            <LesMerPanel
                className="sammenligning-ingress__utregningsinfo"
                åpneLabel={'Hvordan utarbeides sammenligningen?'}
                lukkLabel={'Lukk'}
            >
                <div className="sammenligning-ingress__utregningsinfo-innhold">
                    <Normaltekst>
                        Ditt sykefravær ligger lavere enn bransjens gjennomsnitt minus 10%.
                    </Normaltekst>
                    <Normaltekst>Det er ikke tatt hensyn til virksomhetens størrelse.</Normaltekst>
                    <Normaltekst>Tallene er beregnet på sykefraværsstatistikk fra:</Normaltekst>
                    <ul>
                        <Normaltekst tag="li">1. kvartal 2020</Normaltekst>
                        <Normaltekst tag="li">4. kvartal 2019</Normaltekst>
                        <Normaltekst tag="li">3. kvartal 2019</Normaltekst>
                        <Normaltekst tag="li">2. kvartal 2019</Normaltekst>
                    </ul>
                </div>
            </LesMerPanel>
        </>
    );
};
