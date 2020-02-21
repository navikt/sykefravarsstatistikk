import React, { FunctionComponent } from 'react';
import {
    KvartalsvisSykefraværsprosent,
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

const padHistorikk = (
    historikk: Sykefraværshistorikk,
    årstallOgKvartal: { årstall: number; kvartal: number }[]
): Sykefraværshistorikk => {
    const paddedVirksomhetHistorikk: KvartalsvisSykefraværsprosent[] = årstallOgKvartal.map(
        årOgKvartal => {
            const prosentForVirksomhet = historikk.kvartalsvisSykefraværsprosent.find(
                prosent =>
                    prosent.årstall === årOgKvartal.årstall &&
                    prosent.kvartal === årOgKvartal.kvartal
            );
            return (
                prosentForVirksomhet || {
                    prosent: undefined,
                    ...årOgKvartal,
                    erMaskert: false,
                }
            );
        }
    );
    return {
        ...historikk,
        kvartalsvisSykefraværsprosent: paddedVirksomhetHistorikk,
    };
};

const lagHistorikkListePaddedMedUndefined = (
    historikkListe: Sykefraværshistorikk[]
): Sykefraværshistorikk[] => {
    const historikkVirksomhet = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET
    )!;
    const historikkBransjeEllerNæring =
        historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.BRANSJE) ||
        historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.NÆRING)!;
    const historikkSektor = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.SEKTOR
    )!;
    const historikkLand = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.LAND
    )!;

    const årstallOgKvartalDerDetFinnesStatistikkForLand = historikkLand.kvartalsvisSykefraværsprosent.map(
        prosent => {
            return { årstall: prosent.årstall, kvartal: prosent.kvartal };
        }
    );

    return [
        padHistorikk(historikkVirksomhet, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkBransjeEllerNæring, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkSektor, årstallOgKvartalDerDetFinnesStatistikkForLand),
        historikkLand,
    ];
};

const hentProsent = (historikk: Sykefraværshistorikk, årstall: number, kvartal: number) => {
    return historikk.kvartalsvisSykefraværsprosent.find(
        kvartalsvisProsent =>
            kvartalsvisProsent.årstall === årstall && kvartalsvisProsent.kvartal === kvartal
    )!;
};

type Tabellrad = (KvartalsvisSykefraværsprosent & {
    type: SykefraværshistorikkType;
})[];

const Tabell: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const paddedHistorikk = lagHistorikkListePaddedMedUndefined(
        props.restSykefraværsstatistikk.data
    );

    const hentHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        paddedHistorikk.find(historikk => historikk.type === type);

    const matrise = paddedHistorikk.map(historikk => historikk.kvartalsvisSykefraværsprosent);

    const transponertMatrise = matrise[0].map((col, i) => matrise.map(row => row[i]));
    const transponert2: Tabellrad[] = paddedHistorikk[0].kvartalsvisSykefraværsprosent.map(
        (kvartalsvisProsent, i) =>
            paddedHistorikk.map(historikk => {
                return { ...historikk.kvartalsvisSykefraværsprosent[i], type: historikk.type };
            })
    );

    transponertMatrise.reverse();
    transponert2.reverse();

    console.log(transponertMatrise);
    console.log(transponert2);

    const historikkNæringEllerBransje: Sykefraværshistorikk =
        hentHistorikk(SykefraværshistorikkType.BRANSJE) ||
        hentHistorikk(SykefraværshistorikkType.NÆRING)!;

    const harBransje = historikkNæringEllerBransje.type === SykefraværshistorikkType.BRANSJE;
    const næringEllerBransjeTabellLabel = harBransje ? 'Bransje' : 'Næring';
    const bransjeEllerNæringType = harBransje
        ? SykefraværshistorikkType.BRANSJE
        : SykefraværshistorikkType.NÆRING;
    const labelNæringEllerBransje = historikkNæringEllerBransje.label;
    const labelVirksomhet = hentHistorikk(SykefraværshistorikkType.VIRKSOMHET)!.label;
    const labelSektor = hentHistorikk(SykefraværshistorikkType.SEKTOR)!.label;

    const nyeTabellrader = transponertMatrise.map(rad => {
        const { årstall, kvartal } = rad[0];
        return (
            <tr key={årstall + '-' + kvartal}>
                <td>{årstall}</td>
                <td>{kvartal}</td>
                <td>{rad[0].prosent}</td>
                <td>{rad[1].prosent}</td>
                <td>{rad[2].prosent}</td>
                <td>{rad[3].prosent}</td>
            </tr>
        );
    });

    const getProsent = (tabellrad: Tabellrad, type: SykefraværshistorikkType) => {
        return tabellrad.find(prosent => prosent.type === type)!.prosent;
    };

    const nyeTabellrader2 = transponert2.map(rad => {
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
    });

    return (
        <div className="graf-tabell">
            <table className="tabell tabell--stripet">
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
                <tbody>{nyeTabellrader2}</tbody>
            </table>
        </div>
    );
};

export default Tabell;
