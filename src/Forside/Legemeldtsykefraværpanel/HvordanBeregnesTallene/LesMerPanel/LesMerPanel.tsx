import * as React from 'react';
import { useState } from 'react';
import InfoToggler from './InfoToggler/InfoToggler';
import { Normaltekst } from 'nav-frontend-typografi';
import './LesMerPanel.less';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

interface Props {
    åpneLabel: string;
    lukkLabel: string;
}

const LesMerPanel: React.FunctionComponent<Props> = ({ åpneLabel, lukkLabel, children }) => {
    const [åpen, setÅpen] = useState<boolean>(false);

    return (
        <div className="les-mer-panel">
            <div
                className={classNames(
                    'les-mer-panel__toggler',
                    åpen && 'les-mer-panel__toggler--åpen'
                )}
            >
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <Normaltekst tag="span">{åpen ? lukkLabel : åpneLabel}</Normaltekst>
                </InfoToggler>
            </div>
            <div className="les-mer-panel__innhold">
                <Collapse isOpened={åpen}>{children}</Collapse>
            </div>
        </div>
    );
};

export default LesMerPanel;
