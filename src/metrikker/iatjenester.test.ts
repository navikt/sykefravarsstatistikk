import { IaTjenesteKilde, iaTjenesterMetrikkerErSendtForBedrift } from "./iatjenester";
import { TjenestePerOrgnr } from "./IaTjenesterMetrikkerContext";

describe('Testerforiatjenester', () => {
    test('ny_orgnr_skal_legges_til_i_en_tomliste', () => {
        const iaTjenesterListe: TjenestePerOrgnr[] = [
            { orgnr: '', kilde: '' },
            { orgnr: '999999999', kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK },
        ];
        expect(
            iaTjenesterMetrikkerErSendtForBedrift('999999999', [{ orgnr: '', kilde: '' }])
        ).toEqual(iaTjenesterListe);
    });
    test('samme_orgnr_skal_IKKE_legges_til_i_en_liste_som_har_samme_default_kilde', () => {
        const iaTjenesterListe: TjenestePerOrgnr[] = [
            { orgnr: '999999999', kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK },
        ];
        expect(
            iaTjenesterMetrikkerErSendtForBedrift('999999999', [
                { orgnr: '999999999', kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK },
            ])
        ).toEqual(iaTjenesterListe);
    });

    test('ny_orgnr_skal_legges_til_i_en_liste_som_IKKE_har_samme_kilde', () => {
        const iaTjenesterListe: TjenestePerOrgnr[] = [
            { orgnr: '999999999', kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK },
            { orgnr: '999999999', kilde: IaTjenesteKilde.KALKULATOR },
        ];
        expect(
            iaTjenesterMetrikkerErSendtForBedrift('999999999', [
                { orgnr: '999999999', kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK },
            ],IaTjenesteKilde.KALKULATOR)
        ).toEqual(iaTjenesterListe);
    });
    test('ny_orgnr_skal_legges_til_i_en_liste_som_har_samme_kilde', () => {
        const iaTjenesterListe: TjenestePerOrgnr[] = [
            { orgnr: '999999999', kilde: IaTjenesteKilde.KALKULATOR },
            { orgnr: '888888888', kilde: IaTjenesteKilde.KALKULATOR },
        ];

        expect(
            iaTjenesterMetrikkerErSendtForBedrift('888888888', [
              { orgnr: '999999999', kilde: IaTjenesteKilde.KALKULATOR },
            ],IaTjenesteKilde.KALKULATOR)
        ).toEqual(iaTjenesterListe);
    });
});
