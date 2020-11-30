import React, { FunctionComponent } from 'react';
import næringEllerBransjeIkonSvg from './næring-eller-bransje-ikon.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './DinNæringEllerBransje.less';
import {
    RestSummertSykefraværshistorikk,
    Statistikkategori,
} from '../../../../api/summertSykefraværshistorikk';
import { RestStatus } from '../../../../api/api-utils';

interface Props {
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
}

export const DinNæringEllerBransje: FunctionComponent<Props> = ({
    restSummertSykefraværshistorikk,
}) => {
    if (restSummertSykefraværshistorikk.status !== RestStatus.Suksess) {
        return null;
    }

    const dataForBransje = restSummertSykefraværshistorikk.data.find(
        (data) => data.type === Statistikkategori.BRANSJE
    );
    const dataForNæring = restSummertSykefraværshistorikk.data.find(
        (data) => data.type === Statistikkategori.BRANSJE
    );

    let tekst;
    if (dataForBransje) {
        tekst = 'Du tilhører bransjen: ' + dataForBransje.label;
    } else if (dataForNæring) {
        tekst = 'Du tilhører næringen: ' + dataForNæring.label;
    } else {
        return null;
    }

    return (
        <div className="din-næring-eller-bransje">
            <img
                className="din-næring-eller-bransje__ikon"
                src={næringEllerBransjeIkonSvg}
                alt=""
            />
            <Normaltekst>{tekst}</Normaltekst>
        </div>
    );
};
