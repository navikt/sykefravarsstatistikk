import React, { FunctionComponent } from 'react';
import { RestStatus, Årsak } from '../../api/api-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import classNames from 'classnames';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    className?: string;
}

const SammenligningspanelFeilmelding: FunctionComponent<Props> = (props) => {
    const { restSykefraværshistorikk, className } = props;
    const status = restSykefraværshistorikk.status;
    if (
        status === RestStatus.Suksess ||
        status === RestStatus.IkkeLastet ||
        status === RestStatus.LasterInn
    ) {
        return null;
    } else if (
        restSykefraværshistorikk.status === RestStatus.Feil &&
        restSykefraværshistorikk.causedBy === Årsak.INGEN_NÆRING
    ) {
        return (
            <AlertStripeFeil className={classNames(className)}>
                Kan ikke vise sykefraværet. Virksomheten har ikke registrert en næring.
            </AlertStripeFeil>
        );
    } else {
        return (
            <AlertStripeFeil className={classNames(className)}>
                Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
};

export default SammenligningspanelFeilmelding;
