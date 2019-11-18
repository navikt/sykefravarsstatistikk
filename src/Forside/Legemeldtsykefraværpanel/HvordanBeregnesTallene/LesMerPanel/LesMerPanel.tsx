import * as React from 'react';
import { useState } from 'react';
import InfoToggler from './InfoToggler/InfoToggler';
import { Normaltekst } from 'nav-frontend-typografi';
import './LesMerPanel.less';
import { Collapse } from 'react-collapse';

interface Props {
    åpneLabel: string;
    lukkLabel: string;
}

const LesMerPanel: React.FunctionComponent<Props> = ({ åpneLabel, lukkLabel, children }) => {
    const [åpen, setÅpen] = useState<boolean>(false);

    return (
        <div className="lesmeriawebpanel">
            <div className="lesmeriawebpanel__toggler">
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <Normaltekst tag="span">{åpen ? lukkLabel : åpneLabel}</Normaltekst>
                </InfoToggler>
            </div>
            <div className="lesmeriawebpanel__innhold">
                <Collapse isOpened={åpen}>{children}</Collapse>
            </div>
        </div>
    );
};

export default LesMerPanel;
