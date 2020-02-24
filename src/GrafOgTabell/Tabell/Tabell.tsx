import React, { FunctionComponent } from 'react';
import {
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/sykefraværshistorikk';
import './Tabell.less';
import { RestStatus } from '../../api/api-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Tabellrader from './Tabellrader';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Tabell: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }
    const historikkListe = props.restSykefraværsstatistikk.data;

    const hentHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        historikkListe.find(historikk => historikk.type === type);

    const harBransje = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    const historikkNæringEllerBransje = harBransje
        ? hentHistorikk(SykefraværshistorikkType.BRANSJE)!
        : hentHistorikk(SykefraværshistorikkType.NÆRING)!;

    const næringEllerBransjeTabellLabel = harBransje ? 'Bransje' : 'Næring';

    const labelNæringEllerBransje = historikkNæringEllerBransje.label;
    const labelVirksomhet = hentHistorikk(SykefraværshistorikkType.VIRKSOMHET)!.label;
    const labelSektor = hentHistorikk(SykefraværshistorikkType.SEKTOR)!.label;

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
                <Tabellrader restSykefraværsstatistikk={props.restSykefraværsstatistikk} />
            </tbody>
        </table>
    );
};

export default Tabell;
