import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as OverordnetEnhetSvg } from './OverordnetEnhet.svg';
import { ReactComponent as VirksomhetSvg } from './Virksomhet.svg';
import { ReactComponent as NæringSvg } from './Næring.svg';
import { ReactComponent as LandSvg } from './Norge.svg';
import { SykefraværshistorikkType } from '../../../../api/sykefraværshistorikk';

const SammenligningsIkon: FunctionComponent<{
    label: string;
}> = (props) => {
    switch (props.label) {
        case SykefraværshistorikkType.VIRKSOMHET:
            return <VirksomhetSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.OVERORDNET_ENHET:
            return <OverordnetEnhetSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.NÆRING:
            return <NæringSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.LAND:
            return <LandSvg style={{ width: 24, height: 24 }} className="sammenligningsikon" />;
        default:
            return <VirksomhetSvg className="sammenligningsikon" />;
    }
};

export default SammenligningsIkon;
