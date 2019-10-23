import * as React from "react";
import InfoToggler from "./InfoToggler/InfoToggler";
import {Normaltekst} from "nav-frontend-typografi";
import EkspanderbartInnhold from './EkspanderbartInnhold/EkspanderbartInnhold';
import { useState } from 'react';
import './LesMerPanel.less';

interface Props {
    åpneLabel: string;
    lukkLabel: string;
}

const LesMerPanel : React.FunctionComponent<Props> = ({ åpneLabel, lukkLabel, children }) => {

    const [åpen, setÅpen] = useState<boolean>(false);

    return (
        <div className="lesmeriawebpanel">
            <div className="lesmeriawebpanel__toggler">
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <Normaltekst tag="span">{åpen ? lukkLabel : åpneLabel}</Normaltekst>
                </InfoToggler>
            </div>
            <div className="lesmeriawebpanel__innhold">
                <EkspanderbartInnhold erApen={åpen}>{children}</EkspanderbartInnhold>
            </div>
        </div>

    );
}

export default LesMerPanel