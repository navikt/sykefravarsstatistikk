import * as React from 'react';
import { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './VarDetteRelevant.less';
import { LikeTommel } from './LikeTommel';

interface Props {
    kleintID?: string;
    tipsID?: string;
}
const VarDetteRelevant = (props: Props) => {
    const [relevantLikt, setRelevantLikt] = useState<boolean>(false);

    return (
        <>
            <div className="vardetterelevant">
                <LikeTommel
                    retning="opp"
                    fylt={relevantLikt}
                    onClick={() => setRelevantLikt(!relevantLikt)}>
                    Relevant
                </LikeTommel>
            </div>
            <div className="vardetterelevant">
                <LikeTommel
                    retning="ned"
                    fylt={!relevantLikt}
                    onClick={() => setRelevantLikt(!relevantLikt)}>
                    Ikke relevant
                </LikeTommel>
            </div>
        </>
    );
};

export default VarDetteRelevant;
