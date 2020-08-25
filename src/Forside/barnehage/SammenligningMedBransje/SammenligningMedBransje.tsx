import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './SammenligningMedBransje.less';
import Panel from 'nav-frontend-paneler';
import { Speedometer, SykefraværResultat } from '../Speedometer';
import InternLenke from '../../../felleskomponenter/InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../../../App';
import { HoyreChevron } from 'nav-frontend-chevron';

export const SammenligningMedBransje: FunctionComponent = () => {
    return (
        <div className="sammenligning-med-bransje">
            <Systemtittel className="sammenligning-med-bransje__tittel">
                Legemeldt sykefravær: Dine tall
            </Systemtittel>
            <Panel className="sammenligning-med-bransje__panel">
                <Ingress className="sammenligning-med-bransje__panel-tittel">
                    Du har <strong>lavere sykefravær</strong> enn andre barnehager i Norge
                </Ingress>
                <div className="sammenligning-med-bransje__ikon-og-tall">
                    <Speedometer
                        className="sammenligning-med-bransje__ikon"
                        stor
                        resultat={SykefraværResultat.MIDDELS}
                    />
                    <div className="sammenligning-med-bransje__tall">
                        <Ingress className="sammenligning-med-bransje__virksomhet-tittel">
                            Din virksomhet:
                        </Ingress>
                        <Systemtittel>7,6 %</Systemtittel>
                        <Ingress className="sammenligning-med-bransje__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel>5 %</Systemtittel>
                        <Normaltekst className="sammenligning-med-bransje__neste-oppdatering">
                            Neste oppdatering: 02.09.2020
                        </Normaltekst>
                    </div>
                </div>
                <InternLenke
                    className="sammenligning-med-bransje__historikk-lenke"
                    pathname={PATH_HISTORIKK}
                >
                    Gå til sykefraværshistorikken <HoyreChevron />
                </InternLenke>
            </Panel>
        </div>
    );
};
