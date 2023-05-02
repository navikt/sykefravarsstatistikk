import { Sykefraværsprosent } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import React, { FunctionComponent } from 'react';
import { KvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';
import { formaterProsent } from './tabell-utils';
import { Table } from '@navikt/ds-react';

const kolonneOverordnetEnhet = (
    overordnetEnhet: Sykefraværsprosent,
    harOverordnetEnhet: boolean
) => {
    if (harOverordnetEnhet) {
        return <Table.DataCell align={'right'}>{formaterProsent(overordnetEnhet)}</Table.DataCell>;
    }
};

type TabellRadProps = {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    harOverordnetEnhet: boolean;
};

export const Tabellrader: FunctionComponent<TabellRadProps> = ({
    kvartalsvisSammenligning,
    harOverordnetEnhet,
}: TabellRadProps) => {
    return (
        <>
            {kvartalsvisSammenligning.map((rad) => {
                const {
                    årstall,
                    kvartal,
                    virksomhet,
                    overordnetEnhet,
                    næringEllerBransje,
                    sektor,
                    land,
                } = rad;
                return (
                    <Table.Row key={årstall + '-' + kvartal}>
                        <Table.DataCell>{årstall}</Table.DataCell>
                        <Table.DataCell>{kvartal}</Table.DataCell>
                        <Table.DataCell align={'right'}>
                            {formaterProsent(virksomhet)}
                        </Table.DataCell>
                        {kolonneOverordnetEnhet(overordnetEnhet, harOverordnetEnhet)}
                        <Table.DataCell align={'right'}>
                            {formaterProsent(næringEllerBransje)}
                        </Table.DataCell>
                        <Table.DataCell align={'right'}>{formaterProsent(sektor)}</Table.DataCell>
                        <Table.DataCell align={'right'}>{formaterProsent(land)}</Table.DataCell>
                    </Table.Row>
                );
            })}
        </>
    );
};

export default Tabellrader;
