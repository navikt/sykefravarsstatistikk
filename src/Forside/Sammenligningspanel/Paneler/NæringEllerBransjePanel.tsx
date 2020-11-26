import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { SykefraværshistorikkType } from '../../../api/kvartalsvisSykefraværshistorikk';
import SammenligningsIkon from './SammenligningsIkon/SammenligningsIkon';

type Props = SykefraværprosentpanelProps & {
    harBransje?: boolean;
};

const NæringEllerBransjePanel: FunctionComponent<Props> = (props) => {
    const tekstForNæringEllerBransje = props.harBransje ? 'Bransje:' : 'Næring:';

    return (
        <Sykefraværsprosentpanel
            sykefraværsprosent={props.sykefraværsprosent}
            sykefraværprosentLabel={props.sykefraværprosentLabel}
            laster={props.laster}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.NÆRING} />}
            className={props.className}
        >
            {tekstForNæringEllerBransje}
        </Sykefraværsprosentpanel>
    );
};

export default NæringEllerBransjePanel;
