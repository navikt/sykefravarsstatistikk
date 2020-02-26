import React, { FunctionComponent } from 'react';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../../api/sykefraværshistorikk';
import './Tabell.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Tabellrader from './Tabellrader';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Tabell: FunctionComponent<Props> = props => {
    const getHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        props.sykefraværshistorikk.find(historikk => historikk.type === type);

    const harBransje = props.sykefraværshistorikk.find(
        historikk => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    const historikkNæringEllerBransje = harBransje
        ? getHistorikk(SykefraværshistorikkType.BRANSJE)!
        : getHistorikk(SykefraværshistorikkType.NÆRING)!;

    const næringEllerBransjeTabellLabel = harBransje ? 'Bransje' : 'Næring';

    const labelNæringEllerBransje = historikkNæringEllerBransje.label;
    const labelVirksomhet = getHistorikk(SykefraværshistorikkType.VIRKSOMHET)!.label;
    const labelSektor = getHistorikk(SykefraværshistorikkType.SEKTOR)!.label;

    return (
        <table className="graf-tabell tabell tabell--stripet">
            <thead>
                <tr>
                    <th>År</th>
                    <th>Kvartal</th>
                    <th>
                        <Element>Din virksomhet</Element>{' '}
                        <Normaltekst>{labelVirksomhet}</Normaltekst>
                    </th>
                    <th>
                        <Element>{næringEllerBransjeTabellLabel}</Element>{' '}
                        <Normaltekst>{labelNæringEllerBransje}</Normaltekst>
                    </th>
                    <th>
                        <Element>Sektor</Element> <Normaltekst>{labelSektor}</Normaltekst>
                    </th>
                    <th>Norge</th>
                </tr>
            </thead>
            <tbody>
                <Tabellrader sykefraværshistorikk={props.sykefraværshistorikk} />
            </tbody>
        </table>
    );
};

export default Tabell;
