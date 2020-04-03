import { default as React, FunctionComponent } from 'react';
import './DataKanIkkeVisesPanel.less';
import informasjonsirkelSvg from './informasjon-sirkel.svg';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    label: string;
}

export const DataKanIkkeVisesPanel: FunctionComponent<Props> = props => (
    <div className="data-kan-ikke-vises-panel">
        <img src={informasjonsirkelSvg} className="data-kan-ikke-vises-panel__ikon" alt="" />

        <Normaltekst>{props.label}</Normaltekst>
    </div>
);
