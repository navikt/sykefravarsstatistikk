import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { BrødsmulestiConfig, defaultBrødsmulestiConfig, finnBrødsmule } from './brødsmulesti-utils';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule/TilbakeTilForrigeBrødsmule';
import ListeMedLenker from './ListeMedLenker/ListeMedLenker';

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
    const forrigeSmule =
        gjeldendeSmule.overordnetSide && finnBrødsmule(gjeldendeSmule.overordnetSide, config);

    return (
        <nav className="brødsmulesti">
            <ListeMedLenker gjeldendeBrødsmule={gjeldendeSmule} config={config} />
            <TilbakeTilForrigeBrødsmule brødsmule={forrigeSmule} />
        </nav>
    );
};

export default Brødsmulesti;
