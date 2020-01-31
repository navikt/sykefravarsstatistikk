import React, { FunctionComponent } from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Brødsmule } from '../brødsmulesti-utils';
import './TilbakeTilForrigeBrødsmule.less';

interface Props {
    brødsmule?: Brødsmule;
}

const TilbakeTilForrigeBrødsmule: FunctionComponent<Props> = props => {
    const { brødsmule } = props;
    if (!brødsmule) {
        return null;
    }
    return (
        <div className="tilbakeknapp">
            {brødsmule.lenke(
                <>
                    <VenstreChevron />
                    {brødsmule.lenketekst}
                </>
            )}
        </div>
    );
};

export default TilbakeTilForrigeBrødsmule;
