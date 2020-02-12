import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import {
    BrødsmulestiConfig,
    defaultBrødsmulestiConfig,
    finnBrødsmule,
    Side,
} from './brødsmulesti-utils';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule/TilbakeTilForrigeBrødsmule';
import ListeMedBrødsmuler from './ListeMedBrødsmuler/ListeMedBrødsmuler';
import MediaQuery from 'react-responsive';

interface Props {
    gjeldendeSide: Side;
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
            <MediaQuery minWidth={768}>
                <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeSmule} config={config} />
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                <TilbakeTilForrigeBrødsmule gjeldendeBrødsmule={gjeldendeSmule} config={config} />
            </MediaQuery>
        </nav>
    );
};

export default Brødsmulesti;
