import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import kalenderSvg from './kalender.svg';
import './KursForBarnehager.less';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import { RestKursliste } from '../../api/kurs-api';
import { RestStatus } from '../../api/api-utils';
import { getNesteIANettkurs } from '../../api/kurs-utils';
import classNames from 'classnames';

interface Props {
    restKursliste: RestKursliste;
    liten?: boolean;
}
export const KursForBarnehager: FunctionComponent<Props> = (props) => {
    const nesteIANettkurs = getNesteIANettkurs(
        props.restKursliste.status === RestStatus.Suksess ? props.restKursliste.data : []
    );

    return nesteIANettkurs ? (
        <div
            className={classNames(
                'kurs-for-barnehager',
                props.liten && 'kurs-for-barnehager--liten'
            )}
        >
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
    ) : null;
};
