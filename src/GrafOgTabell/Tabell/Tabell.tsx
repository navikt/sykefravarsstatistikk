import React, { FunctionComponent } from 'react';
import {
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/sykefraværshistorikk';
import './Tabell.less';
import { RestStatus } from '../../api/api-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Tabell: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const hentHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        historikkListe.find(historikk => historikk.type === type);

    const historikkListe: Sykefraværshistorikk[] = props.restSykefraværsstatistikk.data;

    const virksomhetHistorikk: Sykefraværshistorikk = hentHistorikk(
        SykefraværshistorikkType.VIRKSOMHET
    )!;
    const sektorHistorikk: Sykefraværshistorikk = hentHistorikk(SykefraværshistorikkType.SEKTOR)!;
    const landHistorikk: Sykefraværshistorikk = hentHistorikk(SykefraværshistorikkType.LAND)!;

    const næringEllerBransjeHistorikk: Sykefraværshistorikk =
        hentHistorikk(SykefraværshistorikkType.BRANSJE) ||
        hentHistorikk(SykefraværshistorikkType.NÆRING)!;

    const næringEllerBransjeTabellLabel =
        næringEllerBransjeHistorikk.type === SykefraværshistorikkType.BRANSJE
            ? 'Bransje'
            : 'Næring';


    return (
        <div className="graf-tabell">
            <table className="tabell tabell--stripet">
                <thead>
                    <tr>
                        <th className="teste">År</th>
                        <th className="teste">Kvartal</th>
                        <th className="teste">
                            <Element>Din virksomhet</Element>{' '}
                            <Normaltekst>{virksomhetHistorikk.label}</Normaltekst>
                        </th>
                        <th className="teste">
                            <Element>{næringEllerBransjeTabellLabel}</Element>{' '}
                            <Normaltekst>{næringEllerBransjeHistorikk.label}</Normaltekst>
                        </th>
                        <th className="teste">
                            <Element>Sektor</Element>{' '}
                            <Normaltekst>{sektorHistorikk.label}</Normaltekst>
                        </th>
                        <th className="teste">
                            Norge
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jean-Luc</td>
                        <td>Picard</td>
                        <td>Kaptein</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>William</td>
                        <td>Riker</td>
                        <td>Kommandør</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Geordi</td>
                        <td>La Forge</td>
                        <td>Sjefsingeniør</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Tabell;
