import React, { FunctionComponent } from 'react';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';
import { SykefraværprosentpanelProps } from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { ReactComponent as BedriftSvg } from './Bedrift.svg';
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
        <MaskertSykefraværprosentpanel
            sykefraværsprosent={sykefraværsprosent}
            sykefraværprosentLabel={sykefraværprosentLabel}
            labelHvisMaskert="Det er for få personer i datagrunnlaget til at vi kan vise sykefraværet."
            labelHvisUndefined={feilmeldingHvisProsentErUndefined}
            laster={laster}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.VIRKSOMHET} />}
            className={className}
        >
            Din virksomhet:
        </MaskertSykefraværprosentpanel>
    );
};

export default Virksomhetspanel;
