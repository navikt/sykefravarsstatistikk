import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { konverterTilKvartalsvisSammenligning } from './tabell-utils';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Tabellrader: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.restSykefraværsstatistikk.data
    );

    return (
        <>
            {kvartalsvisSammenligning.map(rad => {
                const { årstall, kvartal } = rad;
                return (
                    <tr key={årstall + '-' + kvartal}>
                        <td>{årstall}</td>
                        <td>{kvartal}</td>
                        <td>{rad.virksomhet.prosent}</td>
                        <td>{rad.næringEllerBransje.prosent}</td>
                        <td>{rad.sektor.prosent}</td>
                        <td>{rad.land.prosent}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default Tabellrader;
