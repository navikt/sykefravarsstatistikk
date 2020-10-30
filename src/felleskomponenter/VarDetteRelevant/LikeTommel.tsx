import React, { FunctionComponent } from 'react';
import './LikeTommel.less';
import { Knapp } from 'nav-frontend-knapper';
import { ReactComponent as TommelOpp } from './tommel-opp.svg';
import { ReactComponent as TommelOppFylt } from './tommel-opp-fylt.svg';

interface Props {
    retning: 'opp' | 'ned';
    fylt: boolean;
    onClick: () => void;
}
export const LikeTommel: FunctionComponent<Props> = (props) => {
    const modifier = props.retning;

    // aria-pressed?
    // Er dette egentlig en toggle button?
    return (
        <Knapp mini kompakt onClick={props.onClick} className="like-tommel">
            <div className={'like-tommel__bilde like-tommel__bilde--' + modifier}>
                {props.fylt ? <TommelOppFylt title={'tommel ' + props.retning} /> : <TommelOpp />}
            </div>
            {props.children}
        </Knapp>
    );
};
