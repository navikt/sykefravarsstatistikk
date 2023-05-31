import * as React from 'react';
import { ReactNode, useState } from 'react';
import InfoToggler from './InfoToggler/InfoToggler';
import './LesMerPanel.less';
import { UnmountClosed } from 'react-collapse';
import classNames from 'classnames';
import { sendPanelEkspanderEvent, sendPanelKollapsEvent } from '../../amplitude/events';
import { BodyShort } from "@navikt/ds-react";

interface Props {
    åpneLabel: string;
    lukkLabel?: string;
    className?: string;
    onÅpne?: () => void;
    children: ReactNode;
}

const LesMerPanel: React.FunctionComponent<Props> = ({
    åpneLabel,
    lukkLabel,
    className,
    onÅpne,
    children,
}) => {
    const [åpen, setÅpenState] = useState<boolean>(false);

    const setÅpen = (skalÅpnes: boolean) => {
        setÅpenState(skalÅpnes);
        if (skalÅpnes && onÅpne) {
            onÅpne();
        }
    };

    const lukkTekst = lukkLabel || åpneLabel;

    return (
        <div className="les-mer-panel">
            <div
                className={classNames(
                    'les-mer-panel__toggler',
                    åpen && 'les-mer-panel__toggler--åpen',
                    className
                )}
            >
                <InfoToggler
                    onToggle={() => {
                        if (åpen) {
                            sendPanelKollapsEvent(åpneLabel);
                        } else {
                            sendPanelEkspanderEvent(åpneLabel);
                        }
                        setÅpen(!åpen);
                    }}
                    åpen={åpen}
                >
                    <BodyShort as="span">{åpen ? lukkTekst : åpneLabel}</BodyShort>
                </InfoToggler>
            </div>
            <div className="les-mer-panel__innhold">
                {/*
                // @ts-ignore */}
                <UnmountClosed isOpened={åpen}>{children}</UnmountClosed>
            </div>
            <div className={classNames('les-mer-panel__print-innhold', className)}>{children}</div>
        </div>
    );
};

export default LesMerPanel;
