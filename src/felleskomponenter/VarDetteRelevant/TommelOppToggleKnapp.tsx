import React, { FunctionComponent } from 'react';
import './TommelOppToggleKnapp.less';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as TommelOpp } from './tommel-opp.svg';
import { ReactComponent as TommelOppFylt } from './tommel-opp-fylt.svg';

interface Props {
    retning: 'opp' | 'ned';
    pressed: boolean;
    onClick: () => void;
}

export const TommelOppToggleKnapp: FunctionComponent<Props> = (props) => {
    const modifier = props.retning;

    return (
        <Flatknapp
            mini
            kompakt
            onClick={props.onClick}
            className="tommel-opp-toggle-knapp"
            aria-pressed={props.pressed}
        >
            <div
                className={
                    'tommel-opp-toggle-knapp__bilde tommel-opp-toggle-knapp__bilde--' + modifier
                }
            >
                {props.pressed ? (
                    <TommelOppFylt title={'tommel ' + props.retning} />
                ) : (
                    <TommelOpp title={'tommel ' + props.retning} />
                )}
            </div>
            {props.children}
        </Flatknapp>
    );
};
