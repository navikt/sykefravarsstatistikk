import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';
import kalenderSvg from './kalender.svg';
import './KursForBarnehager.less';
import { PaneltittelMedIkon } from '../../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';

export const KursForBarnehager: FunctionComponent = () => (
    <div className="kurs-for-barnehager">
        <PaneltittelMedIkon src={kalenderSvg} alt="Kalenderikon">
            Kurskalender
        </PaneltittelMedIkon>
        <Normaltekst className="kurs-for-barnehager__tekst">
            NAV tilbyr nettkurs, med temaer som forebygging og oppfølging av sykefravær
        </Normaltekst>
        <EksternLenke href="https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)">
            Gå til kurskalenderen
        </EksternLenke>
    </div>
);
