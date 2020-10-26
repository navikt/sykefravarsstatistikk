import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';
import kalenderSvg from './kalender.svg';
import './KursForBarnehager.less';

export const KursForBarnehager: FunctionComponent = () => (
    <PanelBase className="kurs-for-barnehager">
        <div className="kurs-for-barnehager__tittel-wrapper">
            <img src={kalenderSvg} alt="Kalenderikon" />
            <Undertittel tag="h2">
                NAV tilbyr nettkurs, med temaer som forebygging og oppfølging av sykefravær
            </Undertittel>
        </div>
        <EksternLenke href="https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)">
            Gå til kursoversikten
        </EksternLenke>
    </PanelBase>
);
