import * as React from 'react';
import { useState } from 'react';
import './VarDetteRelevant.less';
import { TommelOppToggleKnapp } from './TommelOppToggleKnapp';

interface Props {
    kleintID?: string;
    tipsID?: string;
}
const VarDetteRelevant = (props: Props) => {
    const [relevantLikt, setRelevantLikt] = useState<boolean | 'ikke satt'>('ikke satt');

    return (
        <div className="var-dette-relevant">
            <TommelOppToggleKnapp
                retning="opp"
                pressed={relevantLikt !== 'ikke satt' && relevantLikt}
                onClick={() => setRelevantLikt(relevantLikt === true ? 'ikke satt' : true)}
            >
                Relevant
            </TommelOppToggleKnapp>
            <TommelOppToggleKnapp
                retning="ned"
                pressed={relevantLikt !== 'ikke satt' && !relevantLikt}
                onClick={() => setRelevantLikt(relevantLikt === false ? 'ikke satt' : false)}
            >
                Ikke relevant
            </TommelOppToggleKnapp>
        </div>
    );
};

export default VarDetteRelevant;
