import * as React from 'react';
import { useState } from 'react';
import InfoToggler from './InfoToggler/InfoToggler';
import { Normaltekst } from 'nav-frontend-typografi';
import './LesMerPanel.less';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

interface Props {
    åpneLabel: string;
    lukkLabel?: string;
    className?: string;
    onÅpne?: () => void;
}

const LesMerPanel: React.FunctionComponent<Props> = ({
    åpneLabel,
    lukkLabel,
    children,
    className,
    onÅpne,
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
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <Normaltekst tag="span">{åpen ? lukkTekst : åpneLabel}</Normaltekst>
                </InfoToggler>
            </div>
            <div className="les-mer-panel__innhold">
                <Collapse isOpened={åpen}>{children}</Collapse>
            </div>
            <div className={classNames('les-mer-panel__print-innhold', className)}>{children}</div>
        </div>
    );
};

export default LesMerPanel;
