import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefravarPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Sammenligning, SammenligningContext } from '../SammenligningProvider';
import Sykefravarsprosentpanel from './Sykefravarsprosentpanel/Sykefravarsprosentpanel';
import Lesmeriawebpanel from './Lesmeriawebpanel/Lesemeriawevpanel';

const LegemeldtSykefravarPanel: FunctionComponent = () => {
    const sammenligning: Sammenligning = useContext(SammenligningContext);
    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                    Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.år}
                </Systemtittel>
                <Sykefravarsprosentpanel
                    label={sammenligning.virksomhet.label}
                    prosent={sammenligning.virksomhet.prosent}
                />
                <Sykefravarsprosentpanel
                    label={sammenligning.næring.label}
                    prosent={sammenligning.næring.prosent}
                />
                <Sykefravarsprosentpanel
                    label={sammenligning.sektor.label}
                    prosent={sammenligning.sektor.prosent}
                />
                <Sykefravarsprosentpanel
                    label={sammenligning.land.label}
                    prosent={sammenligning.land.prosent}
                />

                <Lesmeriawebpanel åpneLabel="Hvordan beregnes disse tallene?" lukkLabel="Lukk">
                    <div className="lesmeriawebpanel__innhold">
                        Hovedkildene for sykefravær på web er sykefraværsregisteret, A-ordningen og
                        Enhetsregistret. Enhetsregistret fra Statistisk Sentralbyrå inneholder
                        organisasjonsstrukturen for alle bedriftene.
                    </div>
                </Lesmeriawebpanel>
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefravarPanel;
