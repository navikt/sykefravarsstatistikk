import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import kalenderSvg from './kalender.svg';
import './Kurskalender.less';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import { Kurs, RestKursliste } from '../../api/kurs-api';
import { RestStatus } from '../../api/api-utils';
import classNames from 'classnames';
import Lenke from 'nav-frontend-lenker';

interface Props {
    restKursliste: RestKursliste;
    liten?: boolean;
}
export const Kurskalender: FunctionComponent<Props> = (props) => {
    const nesteIANettkurs = getNesteIANettkurs(
        props.restKursliste.status === RestStatus.Suksess ? props.restKursliste.data : []
    );

    return nesteIANettkurs ? (
        <div
            className={classNames(
                'kurskalender',
                props.liten && 'kurskalender--liten'
            )}
        >
            <PaneltittelMedIkon src={kalenderSvg} alt="Kalenderikon">
                Kurskalender
            </PaneltittelMedIkon>
            <Normaltekst className="kurskalender__tekst">
                NAV tilbyr nettkurs, med temaer som forebygging og oppfølging av sykefravær
            </Normaltekst>

            <Lenke href="https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)">
                Gå til kurskalenderen
            </Lenke>
        </div>
    ) : null;
};

const getNesteIANettkurs = (kursliste: Kurs[]): Kurs | undefined => {
    return kursliste
        .filter((kurs) => kurs.tema === 'Inkluderende arbeidsliv (IA)')
        .filter((kurs) => kurs.type === 'Webinar')
        .sort(
            (kurs1, kurs2) => new Date(kurs1.start).getTime() - new Date(kurs2.start).getTime()
        )[0];
};
