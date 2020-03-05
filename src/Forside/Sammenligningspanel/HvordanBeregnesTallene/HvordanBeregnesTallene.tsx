import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import './HvordanBeregnesTallene.less';

export const HvordanBeregnesTallene: FunctionComponent = () => (
    <LesMerPanel
        åpneLabel="Hvordan beregnes disse tallene?"
        lukkLabel="Lukk"
        className="hvordan-beregnes-tallene"
    >
        <Element className="hvordan-beregnes-tallene__punkt">Legemeldt sykefravær:</Element>
        <Normaltekst>
            Sykefraværsregisteret er hovedkilden til informasjon om legemeldt sykefravær.
            Sykefraværsregisteret er basert på NAVs registreringer av Sykemeldingsattest 1A i
            sykepengerutinen. Disse registreringene omfatter alt legemeldt fravær.
        </Normaltekst>
        <Element className="hvordan-beregnes-tallene__punkt">Sykefraværsprosent:</Element>
        <Normaltekst>
            Tapte dagsverk på grunn av egen sykdom i prosent av avtalte dagsverk.
        </Normaltekst>
        <Element className="hvordan-beregnes-tallene__punkt">Tapte dagsverk:</Element>
        <Normaltekst>
            Antall avtalte dagsverk tapt i et sykefraværstilfelle i perioden multiplisert med
            sykeuføregrad.
        </Normaltekst>
        <Element className="hvordan-beregnes-tallene__punkt">Avtalte dagsverk:</Element>
        <Normaltekst>
            Dager man etter avtalen skal være på jobb, korrigert for stillingsandel. I praksis
            regnes mandag til fredag med unntak av offentlige fridager (f.eks. 17. mai og
            Skjærtorsdag) som ”dager man skulle ha vært på jobb”.
        </Normaltekst>
    </LesMerPanel>
);
