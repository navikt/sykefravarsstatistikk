import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import classNames from 'classnames';
import { SykefraværshistorikkFeil, RestSykefraværshistorikkStatus } from '../../api/sykefraværshistorikk';

interface Props {
    status: RestSykefraværshistorikkStatus;
    className?: string;
}

const SammenligningspanelFeilmelding: FunctionComponent<Props> = (props) => {
    const { status, className } = props;
    if (
        status === RestStatus.Suksess ||
        status === RestStatus.IkkeLastet ||
        status === RestStatus.LasterInn
    ) {
        return null;
    } else if (status === SykefraværshistorikkFeil.FeilPgaIngenNæring) {
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
