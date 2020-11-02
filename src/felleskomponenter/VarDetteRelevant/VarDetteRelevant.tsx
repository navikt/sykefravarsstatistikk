import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import './VarDetteRelevant.less';
import { TommelOppToggleKnapp } from './TommelOppToggleKnapp';
import { useSendEvent } from '../../amplitude/amplitude';

interface Props {
    tipsID: string;
}
const VarDetteRelevant: FunctionComponent<Props> = (props) => {
    const [erRelevant, setErRelevant] = useState<boolean | 'ikke satt'>('ikke satt');
    const sendEvent = useSendEvent();

    const onClick = (verdi: boolean) => {
        if (erRelevant === verdi) {
            setErRelevant('ikke satt');
        } else {
            setErRelevant(verdi);
            sendEvent('tips tilbakemelding', 'svar', {
                relevant: verdi,
                tipsID: props.tipsID,
            });
        }
    };

    return (
        <div className="var-dette-relevant">
            <TommelOppToggleKnapp
                retning="opp"
                pressed={erRelevant !== 'ikke satt' && erRelevant}
                onClick={() => onClick(true)}
            >
                Relevant
            </TommelOppToggleKnapp>
            <TommelOppToggleKnapp
                retning="ned"
                pressed={erRelevant !== 'ikke satt' && !erRelevant}
                onClick={() => onClick(false)}
            >
                Ikke relevant
            </TommelOppToggleKnapp>
        </div>
    );
};

export default VarDetteRelevant;
