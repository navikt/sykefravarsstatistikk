import React, { FunctionComponent } from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Brødsmule, BrødsmulestiConfig, finnBrødsmule } from '../brødsmulesti-utils';
import './TilbakeTilForrigeBrødsmule.less';

interface Props {
    gjeldendeBrødsmule: Brødsmule;
    config: BrødsmulestiConfig;
}

const TilbakeTilForrigeBrødsmule: FunctionComponent<Props> = (props) => {
    const { gjeldendeBrødsmule, config } = props;
    const forrigeSmule =
        gjeldendeBrødsmule.overordnetSide &&
        finnBrødsmule(gjeldendeBrødsmule.overordnetSide, config);

    if (!forrigeSmule) {
        return null;
    }
    return (
        <div className="tilbakeknapp">
            {forrigeSmule.lenke(
                <>
                    <VenstreChevron />
                    {forrigeSmule.lenketekst}
                </>
            )}
        </div>
    );
};

export default TilbakeTilForrigeBrødsmule;
