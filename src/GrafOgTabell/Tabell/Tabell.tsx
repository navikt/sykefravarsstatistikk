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
type Tabellprosent = string;
interface Rad {
    årstall: number;
    kvartal: number;
    virksomhet: Tabellprosent;
    næringEllerBransje: Tabellprosent;
    sektor: Tabellprosent;
    land: Tabellprosent;
}
const hentTabellrader = (historikkListe: Sykefraværshistorikk[]): Rad[] => {
    const hentTabellprosent = (
        type: SykefraværshistorikkType,
        årstall: number,
        kvartal: number
    ): Tabellprosent => {
        const hentHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
            historikkListe.find(historikk => historikk.type === type);

        const kvartalsvisProsent = hentHistorikk(type)!.kvartalsvisSykefraværsprosent.filter(
            prosent => prosent.årstall === årstall && prosent.kvartal === kvartal
        )[0];
        if (!kvartalsvisProsent) {
            return '';
        } else if (kvartalsvisProsent.erMaskert) {
            return '***';
        } else {
            return kvartalsvisProsent.prosent + ' %';
        }
    };

    type Tabellprosent = string;

    let radliste: Rad[] = [];

    interface ÅrstallOgKvartal {
        årstall: number;
        kvartal: number;
    }

    const førsteErTidligst = (årOgKv1: ÅrstallOgKvartal, årOgKv2: ÅrstallOgKvartal): boolean => {
        if (årOgKv1.årstall < årOgKv2.årstall) {
            return true;
        } else if (årOgKv1.årstall === årOgKv2.årstall) {
            return årOgKv1.kvartal < årOgKv2.kvartal;
        } else {
            return false;
        }
    };
    const velgTidligste = (
        årOgKvartal1: ÅrstallOgKvartal,
        årOgKvartal2: ÅrstallOgKvartal
    ): ÅrstallOgKvartal =>
        førsteErTidligst(årOgKvartal1, årOgKvartal2) ? { ...årOgKvartal1 } : { ...årOgKvartal2 };

    const velgSeneste = (
        årOgKvartal1: ÅrstallOgKvartal,
        årOgKvartal2: ÅrstallOgKvartal
    ): ÅrstallOgKvartal =>
        førsteErTidligst(årOgKvartal1, årOgKvartal2) ? { ...årOgKvartal2 } : { ...årOgKvartal1 };

    let førsteÅrstallOgKvartal: ÅrstallOgKvartal = {
        årstall: 9999,
        kvartal: 1,
    };
    let sisteÅrstallOgKvartal: ÅrstallOgKvartal = {
        årstall: 0,
        kvartal: 1,
    };
    historikkListe
        .flatMap(historikk => historikk.kvartalsvisSykefraværsprosent)
        .forEach(kvartalsvisProsent => {
            førsteÅrstallOgKvartal = velgTidligste(førsteÅrstallOgKvartal, kvartalsvisProsent);
            sisteÅrstallOgKvartal = velgSeneste(førsteÅrstallOgKvartal, kvartalsvisProsent);
        });

    const erLike = (årOgKv1: ÅrstallOgKvartal, årOgKv2: ÅrstallOgKvartal): boolean => {
        return årOgKv1.årstall === årOgKv2.årstall && årOgKv1.kvartal === årOgKv2.kvartal;
    };

    const neste = (årOgKv: ÅrstallOgKvartal): ÅrstallOgKvartal => {
        if (årOgKv.kvartal === 4) {
            return {
                årstall: årOgKv.årstall + 1,
                kvartal: 1,
            };
        } else {
            return {
                årstall: årOgKv.årstall,
                kvartal: årOgKv.kvartal + 1,
            };
        }
    };

    let gjeldendeÅrstallOgKvartal = { ...førsteÅrstallOgKvartal };

    while (true) {
        if (erLike(gjeldendeÅrstallOgKvartal, sisteÅrstallOgKvartal)) {
            break;
        }
        const { årstall, kvartal } = gjeldendeÅrstallOgKvartal;
        radliste.push({
            årstall,
            kvartal,
            virksomhet: hentTabellprosent(SykefraværshistorikkType.VIRKSOMHET, årstall, kvartal),
            næringEllerBransje: historikkListe.find(
                historikk => historikk.type === SykefraværshistorikkType.BRANSJE
            )
                ? hentTabellprosent(SykefraværshistorikkType.BRANSJE, årstall, kvartal)
                : hentTabellprosent(SykefraværshistorikkType.NÆRING, årstall, kvartal),
            sektor: hentTabellprosent(SykefraværshistorikkType.SEKTOR, årstall, kvartal),
            land: hentTabellprosent(SykefraværshistorikkType.LAND, årstall, kvartal),
        });
        gjeldendeÅrstallOgKvartal = neste(gjeldendeÅrstallOgKvartal);
    }

    return radliste;
};

/*


export interface Sykefraværshistorikk {
    type: SykefraværshistorikkType;
    label: string;
    kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}
 */

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
    // const matrise = historikkListe.map(historikk => historikk.kvartalsvisSykefraværsprosent);

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
        historikkLand,
        padHistorikk(historikkVirksomhet, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkBransjeEllerNæring, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkSektor, årstallOgKvartalDerDetFinnesStatistikkForLand),
    ];
};

const Tabell: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const hentHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        historikkListe.find(historikk => historikk.type === type);

    const historikkListe: Sykefraværshistorikk[] = props.restSykefraværsstatistikk.data;


    const paddedHistorikk = lagHistorikkListePaddedMedUndefined(historikkListe);
    const matrise = paddedHistorikk.map(historikk => historikk.kvartalsvisSykefraværsprosent);
    const transponertMatrise = matrise[0].map((col, i) => matrise.map(row => row[i]));
    console.log('matrise', matrise);
    console.log('transponert', transponertMatrise);

    const virksomhetHistorikk: Sykefraværshistorikk = hentHistorikk(
        SykefraværshistorikkType.VIRKSOMHET
    )!;
    const sektorHistorikk: Sykefraværshistorikk = hentHistorikk(SykefraværshistorikkType.SEKTOR)!;
    const landHistorikk: Sykefraværshistorikk = hentHistorikk(SykefraværshistorikkType.LAND)!;

    const næringEllerBransjeHistorikk: Sykefraværshistorikk =
        hentHistorikk(SykefraværshistorikkType.BRANSJE) ||
        hentHistorikk(SykefraværshistorikkType.NÆRING)!;

    const harBransje = næringEllerBransjeHistorikk.type === SykefraværshistorikkType.BRANSJE;
    const næringEllerBransjeTabellLabel = harBransje ? 'Bransje' : 'Næring';
    return (
        <div className="graf-tabell">
            <table className="tabell tabell--stripet">
                <thead>
                    <tr>
                        <th>År</th>
                        <th>Kvartal</th>
                        <th>
                            <Element>Din virksomhet</Element>{' '}
                            <Normaltekst>{virksomhetHistorikk.label}</Normaltekst>
                        </th>
                        <th>
                            <Element>{næringEllerBransjeTabellLabel}</Element>{' '}
                            <Normaltekst>{næringEllerBransjeHistorikk.label}</Normaltekst>
                        </th>
                        <th>
                            <Element>Sektor</Element>{' '}
                            <Normaltekst>{sektorHistorikk.label}</Normaltekst>
                        </th>
                        <th>Norge</th>
                    </tr>
                </thead>
                <tbody>
                    {hentTabellrader(historikkListe).map(rad => (
                        <tr key={rad.årstall + '-' + rad.kvartal}>
                            <td>{rad.årstall}</td>
                            <td>{rad.kvartal}</td>
                            <td>{rad.virksomhet}</td>
                            <td>{rad.næringEllerBransje}</td>
                            <td>{rad.sektor}</td>
                            <td>{rad.land}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabell;
