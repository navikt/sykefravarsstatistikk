import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import './VarDetteRelevant.less';
import { TommelOppToggleKnapp } from './TommelOppToggleKnapp';
import { sendTilbakemeldingFraBrukerEvent } from '../../amplitude/events';

interface Props {
    tipsID: string;
}
const VarDetteRelevant: FunctionComponent<Props> = (props) => {
    const [erRelevant, setErRelevant] = useState<boolean | 'ikke satt'>('ikke satt');

    const onClick = (verdi: boolean) => {
        if (erRelevant === verdi) {
            setErRelevant('ikke satt');
        } else {
            setErRelevant(verdi);
            sendTilbakemeldingFraBrukerEvent(props.tipsID, 'var-dette-relevant', verdi);
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
