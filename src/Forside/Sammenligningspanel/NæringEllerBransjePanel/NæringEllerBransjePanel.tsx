import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import './NæringEllerBransjePanel.less';

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
        >
            {tekstForNæringEllerBransje}
        </Sykefraværsprosentpanel>
    );
};

export default NæringEllerBransjePanel;
