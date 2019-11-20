import { FunctionComponent, default as React } from 'react';
import './DataErMaskertPanel.less';
import informasjonsirkelSvg from './informasjon-sirkel.svg';

interface Props {
    label: string;
}

export const DataErMaskertPanel: FunctionComponent<Props> = props => (
    <div className="data-er-maskert-panel">
        <img src={informasjonsirkelSvg} className="data-er-maskert-panel__ikon" alt="" />
        {props.label}
    </div>
);
