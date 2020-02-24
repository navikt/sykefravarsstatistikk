import {
    KvartalsvisSykefraværsprosent,
    RestSykefraværshistorikk,
} from '../../api/sykefraværshistorikk';
import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { konverterTilKvartalsvisSammenligning } from './tabell-utils';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const formaterProsent = (prosent: KvartalsvisSykefraværsprosent): string => {
    if (prosent.erMaskert) {
        return '***';
    } else if (prosent.prosent === undefined) {
        return '';
    } else {
        return (prosent.prosent + ' %').replace('.', ',');
    }
};

const Tabellrader: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.restSykefraværsstatistikk.data
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
