import { FunctionComponent, default as React } from 'react';
import './DataKanIkkeVisesPanel.less';
import informasjonsirkelSvg from './informasjon-sirkel.svg';

interface Props {
    label: string;
}

export const DataKanIkkeVisesPanel: FunctionComponent<Props> = props => (
    <div className="data-kan-ikke-vises-panel">
        <img src={informasjonsirkelSvg} className="data-kan-ikke-vises-panel__ikon" alt="" />
        {props.label}
    </div>
);
