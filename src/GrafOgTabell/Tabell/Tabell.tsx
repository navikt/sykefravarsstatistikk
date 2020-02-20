import React, { FunctionComponent } from 'react';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Tabell: FunctionComponent<Props> = props => {
    return <div>{JSON.stringify(props.restSykefraværsstatistikk)}</div>;
};

export default Tabell;
