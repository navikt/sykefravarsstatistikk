import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as BedriftSvg } from './Bedrift.svg';
import { ReactComponent as NæringSvg } from './Næring.svg';
import { ReactComponent as SektorSvg } from './Sektor.svg';
import { ReactComponent as LandSvg } from './Norge.svg';
import LandsPanel from './LandsPanel/LandsPanel';
import { SykefraværshistorikkType } from '../../api/sykefraværshistorikk';


const SammenligningsIkon: FunctionComponent<{
    label: string;
}> = props => {
    switch (props.label) {
        case SykefraværshistorikkType.VIRKSOMHET:
            return <BedriftSvg />;
        case SykefraværshistorikkType.NÆRING:
            return <NæringSvg />;
        case SykefraværshistorikkType.SEKTOR:
            return <SektorSvg />;
        case SykefraværshistorikkType.LAND:
            return <LandSvg />;
        default:
            return <BedriftSvg/>
    }
};

export default SammenligningsIkon;
