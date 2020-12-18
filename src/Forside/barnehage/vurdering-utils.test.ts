import { getVurdering } from './barnehage-utils';
import { SykefraværVurdering } from './Speedometer/Speedometer';

it('getVurdering skal gi riktig vurdering', () => {
    expect(getVurdering(5.5, 5)).toEqual(SykefraværVurdering.OVER);
    expect(getVurdering(5.4, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.5, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.49, 5)).toEqual(SykefraværVurdering.UNDER);
});

it('getVurderingForSammenligningMedProsent skal gi riktig resultat', () => {
    expect(getVurdering(5.5, 5)).toEqual(SykefraværVurdering.OVER);
    expect(getVurdering(5.4, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.5, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.49, 5)).toEqual(SykefraværVurdering.UNDER);
});
