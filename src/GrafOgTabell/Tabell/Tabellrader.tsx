import { Sykefraværshistorikk, Sykefraværsprosent } from '../../api/sykefraværshistorikk';
import React, { FunctionComponent } from 'react';
import { konverterTilKvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const formaterProsent = (prosent: Sykefraværsprosent): string => {
    if (prosent.erMaskert) {
        return '***';
    } else if (prosent.prosent === undefined) {
        return '';
    } else {
        return (prosent.prosent + ' %').replace('.', ',');
    }
};

const Tabellrader: FunctionComponent<Props> = props => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.sykefraværshistorikk
    );
    kvartalsvisSammenligning.reverse();
    return (
        <>
            {kvartalsvisSammenligning.map(rad => {
                const { årstall, kvartal, virksomhet, næringEllerBransje, sektor, land } = rad;
                return (
                    <tr key={årstall + '-' + kvartal}>
                        <td>{årstall}</td>
                        <td>{kvartal}</td>
                        <td>{formaterProsent(virksomhet)}</td>
                        <td>{formaterProsent(næringEllerBransje)}</td>
                        <td>{formaterProsent(sektor)}</td>
                        <td>{formaterProsent(land)}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default Tabellrader;
