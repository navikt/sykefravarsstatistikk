import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { BrødsmulestiConfig, defaultBrødsmulestiConfig, finnBrødsmule } from './brødsmulesti-utils';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule/TilbakeTilForrigeBrødsmule';
import ListeMedBrødsmuler from './ListeMedBrødsmuler/ListeMedBrødsmuler';

interface Props {
    gjeldendeSide: 'sykefraværsstatistikk' | 'kalkulator';
    config?: BrødsmulestiConfig;
}

const Brødsmulesti: FunctionComponent<Props> = props => {
    const { gjeldendeSide } = props;
    const config = props.config
        ? { ...defaultBrødsmulestiConfig, ...props.config }
        : defaultBrødsmulestiConfig;

    const gjeldendeSmule = finnBrødsmule(gjeldendeSide, config);

    return (
        <nav className="brødsmulesti">
            <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeSmule} config={config} />
            <TilbakeTilForrigeBrødsmule gjeldendeBrødsmule={gjeldendeSmule} config={config} />
        </nav>
    );
};

export default Brødsmulesti;
