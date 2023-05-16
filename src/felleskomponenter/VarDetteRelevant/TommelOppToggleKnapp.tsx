import React, { FunctionComponent, ReactNode } from 'react';
import './TommelOppToggleKnapp.less';
import { Button } from "@navikt/ds-react";
import { ReactComponent as TommelOpp } from './tommel-opp.svg';
import { ReactComponent as TommelOppFylt } from './tommel-opp-fylt.svg';

interface Props {
    retning: 'opp' | 'ned';
    pressed: boolean;
    onClick: () => void;
    children: ReactNode;
}

export const TommelOppToggleKnapp: FunctionComponent<Props> = (props) => {
    const modifier = props.retning;

    return (
        <Button
            variant="tertiary"
            size="xsmall"
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
        </Button>
    );
};
