import { formaterProsent, getTekstForOppdateringsdato } from './app-utils';

it('formater tall med komma i stedet for punktum', () => {
    expect(formaterProsent(99.9)).toEqual('99,9');
    expect(formaterProsent(3.5)).toEqual('3,5');
    expect(formaterProsent(3)).toEqual('3,0');
    expect(formaterProsent(0.2)).toEqual('0,2');
    expect(formaterProsent(0.2)).toEqual('0,2');
});

it('returner tekst for sist oppdatert eller neste oppdatering basert på dagensdato', () => {
    expect(
        getTekstForOppdateringsdato(
            new Date('2021.01.15 01:00:00'),
            new Date('2020.12.02'),
            new Date('2021.03.03')
        )
    ).toEqual('Sist oppdatert: 02.12.2020');
    expect(
        getTekstForOppdateringsdato(
            new Date('2021.01.16 01:00:00'),
            new Date('2020.12.02'),
            new Date('2021.03.03')
        )
    ).toEqual('Neste oppdatering: 03.03.2021');
    expect(
        getTekstForOppdateringsdato(
            new Date('2021.03.03 01:00:00'),
            new Date('2020.12.02'),
            new Date('2021.03.03')
        )
    ).toEqual('Neste oppdatering: 03.03.2021');
    expect(
        getTekstForOppdateringsdato(
            new Date('2021.03.04 01:00:00'),
            new Date('2020.12.02'),
            new Date('2021.03.03')
        )
    ).toEqual('Neste oppdatering: 03.03.2021');
});
