import {formaterProsent} from "./Sykefravarsprosentpanel";

it('formater tall med komma i stedet for punktum', () => {
    expect(formaterProsent(99.9)).toEqual('99,9');
    expect(formaterProsent(3.5)).toEqual('3,5');
    expect(formaterProsent(3)).toEqual('3,0');
    expect(formaterProsent(.2)).toEqual('0,2');
    expect(formaterProsent(0.2)).toEqual('0,2');
});
