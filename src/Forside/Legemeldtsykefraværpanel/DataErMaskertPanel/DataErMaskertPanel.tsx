import { FunctionComponent, default as React } from 'react';
import InformasjonSirkelIkon from './InformasjonSirkelIkon';
import './DataErMaskertPanel.less';

interface Props {
    label: string;
}

export const DataErMaskertPanel: FunctionComponent<Props> = props => (
    <div className="data-er-maskert-panel">
        <InformasjonSirkelIkon />
        {props.label}
    </div>
);
