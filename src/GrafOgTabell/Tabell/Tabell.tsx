import React, { FunctionComponent } from 'react';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import './Tabell.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Tabellrader from './Tabellrader';
import {
    getHistorikkLabels,
    historikkHarBransje,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
} from '../../utils/sykefraværshistorikk-utils';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Tabell: FunctionComponent<Props> = (props) => {
    const harBransje = historikkHarBransje(props.sykefraværshistorikk);
    const næringEllerBransjeTabellLabel = harBransje ? 'Bransje' : 'Næring';
    const labels: HistorikkLabels = getHistorikkLabels(props.sykefraværshistorikk);

    const headerOverordnetEnhet = () => {
        if (historikkHarOverordnetEnhet(props.sykefraværshistorikk)) {
            return (
                <th scope="col">
                    <Element>Overordnet enhet</Element>
                    <Normaltekst>{labels.overordnetEnhet}</Normaltekst>
                </th>
            );
        }
    };

    return (
        <div className="graf-tabell__wrapper">
            <table className="graf-tabell tabell tabell--stripet">
                <thead>
                    <tr>
                        <th scope="col">År</th>
                        <th scope="col">Kvartal</th>
                        <th scope="col">
                            <Element>Din virksomhet</Element>{' '}
                            <Normaltekst>{labels.virksomhet}</Normaltekst>
                        </th>
                        {headerOverordnetEnhet()}
                        <th scope="col">
                            <Element>{næringEllerBransjeTabellLabel}</Element>{' '}
                            <Normaltekst>{labels.næringEllerBransje}</Normaltekst>
                        </th>
                        <th scope="col">
                            <Element>Sektor</Element> <Normaltekst>{labels.sektor}</Normaltekst>
                        </th>
                        <th scope="col">{labels.land}</th>
                    </tr>
                </thead>
                <tbody>
                    <Tabellrader sykefraværshistorikk={props.sykefraværshistorikk} />
                </tbody>
            </table>
        </div>
    );
};

export default Tabell;
