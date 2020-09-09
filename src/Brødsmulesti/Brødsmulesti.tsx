import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { BrødsmulestiConfig, defaultBrødsmulestiConfig, finnBrødsmule } from './brødsmulesti-utils';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule/TilbakeTilForrigeBrødsmule';
import ListeMedBrødsmuler from './ListeMedBrødsmuler/ListeMedBrødsmuler';
import MediaQuery from 'react-responsive';

interface Props {
    gjeldendeSide: string;
    config?: BrødsmulestiConfig;
}

const Brødsmulesti: FunctionComponent<Props> = (props) => {
    const { gjeldendeSide } = props;
    const config = props.config
        ? { ...defaultBrødsmulestiConfig, ...props.config }
        : defaultBrødsmulestiConfig;

    const gjeldendeSmule = finnBrødsmule(gjeldendeSide, config);

    return (
        <>
            <MediaQuery minWidth={768}>
                <nav className="brødsmulesti" aria-label="brødsmulesti">
                    <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeSmule} config={config} />
                </nav>
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                <nav className="brødsmulesti">
                    <TilbakeTilForrigeBrødsmule
                        gjeldendeBrødsmule={gjeldendeSmule}
                        config={config}
                    />
                </nav>
            </MediaQuery>
        </>
    );
};

export default Brødsmulesti;
