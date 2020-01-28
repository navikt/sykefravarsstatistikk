import React, { FunctionComponent } from 'react';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import IkkeInnloggetSide from '../FeilSider/IkkeInnloggetSide/IkkeInnloggetSide';
import { RestSammenligning, RestSammenligningStatus } from '../api/sammenligning';

interface Props {
    restSammenligning: RestSammenligning;
}

const ForsideEllerFeilside: FunctionComponent<Props> = props => {
    switch (props.restSammenligning.status) {
        case RestSammenligningStatus.HarIkkeRettigheterIAltinn: {
            return <ManglerRettigheterIAltinnSide />;
        }
        case RestSammenligningStatus.IkkeInnlogget: {
            return <IkkeInnloggetSide />;
        }
        default: {
            return <>{props.children}</>;
        }
    }
};

export default ForsideEllerFeilside;
