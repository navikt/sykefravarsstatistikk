import {
  formaterProsent,
  getTekstForOppdateringsdato,
  tilIsoDatoMedUtcTimezoneUtenMillis,
} from './app-utils';

it('formater ISO dato med UTC timezone uten millisekunder (millisekunder på ISO date feiler på backend)', () => {
  expect(tilIsoDatoMedUtcTimezoneUtenMillis(new Date(2021, 3, 11, 15, 45, 54, 999))).toMatch(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/
  );
});

it('formater tall med komma i stedet for punktum', () => {
  expect(formaterProsent(99.9)).toEqual('99,9');
  expect(formaterProsent(3.5)).toEqual('3,5');
  expect(formaterProsent(3)).toEqual('3,0');
  expect(formaterProsent(0.2)).toEqual('0,2');
  expect(formaterProsent(0.2)).toEqual('0,2');
});
