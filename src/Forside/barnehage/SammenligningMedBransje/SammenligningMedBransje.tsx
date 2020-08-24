import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningMedBransje.less';
import Panel from 'nav-frontend-paneler';

export const SammenligningMedBransje: FunctionComponent = () => {
    return (
        <div className="sammenligning-med-bransje">
            <Systemtittel className="sammenligning-med-bransje__tittel">
                Legemeldt sykefravær: Dine tall
            </Systemtittel>
            <Panel className="sammenligning-med-bransje__panel">
                <Normaltekst>
                    Du har <strong>lavere fravær</strong> enn andre
                </Normaltekst>
                {/* ikon */}
                <Normaltekst>Neste oppdatering: 02.09.2020</Normaltekst>
            </Panel>
        </div>
    );
};
