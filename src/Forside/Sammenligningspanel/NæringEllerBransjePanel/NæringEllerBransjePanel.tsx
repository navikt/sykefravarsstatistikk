import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import './NæringEllerBransjePanel.less';
import { ReactComponent as NæringSvg } from '../Næring.svg';
import SammenligningsIkon from '../SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/sykefraværshistorikk';

type Props = SykefraværprosentpanelProps & {
    harBransje?: boolean;
};

const NæringEllerBransjePanel: FunctionComponent<Props> = props => {
    const tekstForNæringEllerBransje = props.harBransje ? (
        <div className="næring-eller-bransje-panel__label">
            Bransjen virksomheten tilhører:
            <Hjelpetekst className="næring-eller-bransje-panel__hjelpetekst">
                Bransjen er definert i samsvar med bransjeprogrammene under IA-avtalen 2019–2022.
            </Hjelpetekst>
        </div>
    ) : (
        'Næringen virksomheten tilhører:'
    );

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
