import * as React from 'react';
import './Forside.less';
import { RestSammenligning, RestSammenligningStatus } from '../api/sammenligning';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import IkkeInnloggetSide from '../FeilSider/IkkeInnloggetSide/IkkeInnloggetSide';

interface Props {
    restSammenligning: RestSammenligning;
}

const Forside: React.FunctionComponent<Props> = props => {
    switch (props.restSammenligning.status) {
        case RestSammenligningStatus.HarIkkeRettigheterIAltinn: {
            return <ManglerRettigheterIAltinnSide />;
        }
        case RestSammenligningStatus.IkkeInnlogget: {
            return <IkkeInnloggetSide />;
        }
        default: {
            return (
                <div className="forside__wrapper">
                    <div className="forside">{props.children}</div>
                </div>
            );
        }
    }
};

export default Forside;
