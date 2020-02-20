import React, { FunctionComponent } from 'react';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import './Tabell.less';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Tabell: FunctionComponent<Props> = props => {
    return <div className="tabell">{JSON.stringify(props.restSykefraværsstatistikk)}</div>;
};

export default Tabell;
