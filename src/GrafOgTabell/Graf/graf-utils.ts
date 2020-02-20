const testdataJson: Testdata = require('./testdata.json');

const toDesimaler = (n: number): number => Number.parseFloat(n.toFixed(2));

const rnd = (min: number, max: number) => toDesimaler(Math.random() * (max - min) + min);

export const genererTestdata = () => {
    let testdata: {
        name: string;
        virksomhet: number;
        næring: number;
        land: number;
        sektor: number;
    }[] = [];

    let forrigevirksomhet = rnd(0, 2);
    ['2015', '2016', '2017', '2018', '2019'].forEach(årstall => {
        [1, 2, 3, 4].forEach(kvartal => {
            const virksomhet = Math.max(toDesimaler(forrigevirksomhet + rnd(-0.5, 2)), 0);
            forrigevirksomhet = virksomhet;
            testdata.push({
                name: årstall + ', ' + kvartal + '. kvartal',
                virksomhet: virksomhet,
                næring: rnd(2, 4.5),
                sektor: rnd(4, 6.5),
                land: rnd(6, 7.5),
            });
        });
    });

    return testdata;
};

type Datatype = 'LAND' | 'SEKTOR' | 'NÆRING' | 'BRANSJE' | 'VIRKSOMHET';

type Testdata = {
    sykefraværsstatistikkType: Datatype;
    label: string;
    kvartalsvisSykefraværProsent: {
        kvartal: number;
        årstall: number;
        prosent: number;
        erMaskert: boolean;
    }[];
}[];

export const getTestdata = () => {
    let testdata: {
        name: string;
        virksomhet: number | null;
        næring: number | null;
        land: number | null;
        sektor: number | null;
    }[] = [];

    const getProsent = (type: Datatype, årstall: number, kvartal: number) => {
        const liste = testdataJson.filter(data => data.sykefraværsstatistikkType === type)[0];
        const kvartalsvisProsent = liste
            ? liste.kvartalsvisSykefraværProsent.filter(
                  prosent => prosent.årstall === årstall && prosent.kvartal === kvartal
              )[0]
            : null;
        return kvartalsvisProsent ? kvartalsvisProsent.prosent : null;
    };

    [2014, 2015, 2016, 2017, 2018, 2019].forEach(årstall => {
        [1, 2, 3, 4].forEach(kvartal => {
            const sektorProsent = getProsent('SEKTOR', årstall, kvartal);
            testdata.push({
                name: årstall + ', ' + kvartal + '. kvartal',
                virksomhet: getProsent('VIRKSOMHET', årstall, kvartal),
                næring: sektorProsent ? sektorProsent * 2 : null,
                sektor: sektorProsent,
                land: getProsent('LAND', årstall, kvartal),
            });
        });
    });

    return testdata;
};
