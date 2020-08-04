import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as BedriftSvg } from './Bedrift.svg';
import { ReactComponent as NæringSvg } from './Næring.svg';
import { ReactComponent as SektorSvg } from './Sektor.svg';
import { ReactComponent as LandSvg } from './Norge.svg';
import { SykefraværshistorikkType } from '../../api/sykefraværshistorikk';

const SammenligningsIkon: FunctionComponent<{
    label: string;
}> = (props) => {
    switch (props.label) {
        case SykefraværshistorikkType.VIRKSOMHET:
            return <BedriftSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.OVERORDNET_ENHET: // TODO
            return <BedriftSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.NÆRING:
            return <NæringSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.SEKTOR:
            return <SektorSvg className="sammenligningsikon" />;
        case SykefraværshistorikkType.LAND:
            return <LandSvg style={{ width: 24, height: 24 }} className="sammenligningsikon" />;
        default:
            return <BedriftSvg className="sammenligningsikon" />;
    }
};

export default SammenligningsIkon;
