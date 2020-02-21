import {
    KvartalsvisSykefraværsprosent,
    RestSykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/sykefraværshistorikk';
import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { harBransje, lagHistorikkListePaddedMedUndefined } from './tabell-utils';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

type Tabellrad = (KvartalsvisSykefraværsprosent & {
    type: SykefraværshistorikkType;
})[];

const Tabellrader: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const paddedHistorikk = lagHistorikkListePaddedMedUndefined(
        props.restSykefraværsstatistikk.data
    );

    const kvartalsvisHistorikk: Tabellrad[] = paddedHistorikk[0].kvartalsvisSykefraværsprosent.map(
        (kvartalsvisProsent, i) =>
            paddedHistorikk.map(historikk => {
                return { ...historikk.kvartalsvisSykefraværsprosent[i], type: historikk.type };
            })
    );
    kvartalsvisHistorikk.reverse();

    const bransjeEllerNæringType = harBransje(paddedHistorikk)
        ? SykefraværshistorikkType.BRANSJE
        : SykefraværshistorikkType.NÆRING;

    const getProsent = (tabellrad: Tabellrad, type: SykefraværshistorikkType) => {
        return tabellrad.find(prosent => prosent.type === type)!.prosent;
    };

    return (
        <>
            {kvartalsvisHistorikk.map(rad => {
                const { årstall, kvartal } = rad[0];
                return (
                    <tr key={årstall + '-' + kvartal}>
                        <td>{årstall}</td>
                        <td>{kvartal}</td>
                        <td>{getProsent(rad, SykefraværshistorikkType.VIRKSOMHET)}</td>
                        <td>{getProsent(rad, bransjeEllerNæringType)}</td>
                        <td>{getProsent(rad, SykefraværshistorikkType.SEKTOR)}</td>
                        <td>{getProsent(rad, SykefraværshistorikkType.LAND)}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default Tabellrader;
