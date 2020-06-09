import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, { SykefraværprosentpanelProps } from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from './SammenligningsIkon';
import { SykefraværshistorikkType } from '../../api/sykefraværshistorikk';

type Props = SykefraværprosentpanelProps & {
    kvartal?: number;
    årstall?: number;
};

const Virksomhetspanel: FunctionComponent<Props> = props => {
    const {
        sykefraværsprosent,
        sykefraværprosentLabel,
        årstall,
        kvartal,
        laster,
        className,
    } = props;

    let feilmeldingHvisProsentErUndefined =
        'Vi kan ikke vise informasjon om sykefraværet til virksomheten din.';
    if (kvartal !== undefined && årstall !== undefined) {
        feilmeldingHvisProsentErUndefined += ` Det kan være fordi det ikke er registrert sykefravær for virksomheten i ${kvartal}. kvartal ${årstall}.`;
    }


    return (
        <Sykefraværsprosentpanel
            sykefraværsprosent={sykefraværsprosent}
            sykefraværprosentLabel={sykefraværprosentLabel}
            laster={laster}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.VIRKSOMHET} />}
            className={className}
        >
            Din virksomhet:
        </Sykefraværsprosentpanel>
    );
};

export default Virksomhetspanel;
