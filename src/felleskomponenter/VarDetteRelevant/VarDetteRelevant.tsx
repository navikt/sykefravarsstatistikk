import * as React from 'react';
import { useState } from 'react';
import './VarDetteRelevant.less';
import { TommelOppToggleKnapp } from './TommelOppToggleKnapp';

interface Props {
    kleintID?: string;
    tipsID?: string;
}
const VarDetteRelevant = (props: Props) => {
    const [relevantLikt, setRelevantLikt] = useState<boolean>(false);

    return (
        <div className="var-dette-relevant">
            <TommelOppToggleKnapp
                retning="opp"
                pressed={relevantLikt}
                onClick={() => setRelevantLikt(!relevantLikt)}
            >
                Relevant
            </TommelOppToggleKnapp>
            <TommelOppToggleKnapp
                retning="ned"
                pressed={!relevantLikt}
                onClick={() => setRelevantLikt(!relevantLikt)}
            >
                Ikke relevant
            </TommelOppToggleKnapp>
        </div>
    );
};

export default VarDetteRelevant;
