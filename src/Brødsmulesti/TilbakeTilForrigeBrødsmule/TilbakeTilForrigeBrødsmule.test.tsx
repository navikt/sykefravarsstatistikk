import { shallow } from 'enzyme';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule';
import { BrødsmulestiConfig } from '../brødsmulesti-utils';
import { lagTestbrødsmule } from '../ListeMedBrødsmuler/ListeMedBrødsmuler.test';
import React from 'react';

describe('Tester for TilbakeTilForrigeBrødsmule', () => {
    it('Skal rendre overordnet brødsmule hvis den eksisterer', () => {
        const gjeldendeBrødsmule = lagTestbrødsmule('b', 'Tekst B', 'a', '/b');

        const config: BrødsmulestiConfig = [
            lagTestbrødsmule('a', 'Tekst A', undefined, '/a'),
            gjeldendeBrødsmule,
        ];

        const wrapper = shallow(
            <TilbakeTilForrigeBrødsmule gjeldendeBrødsmule={gjeldendeBrødsmule} config={config} />
        );

        expect(wrapper.find('a').prop('href')).toEqual('/a');
    });

    it('Skal IKKE rendre noe hvis overordnet brødsmule IKKE eksisterer', () => {
        const gjeldendeBrødsmule = lagTestbrødsmule('a', 'Tekst A', undefined, '/a');
        const config: BrødsmulestiConfig = [gjeldendeBrødsmule];

        const wrapper = shallow(
            <TilbakeTilForrigeBrødsmule gjeldendeBrødsmule={gjeldendeBrødsmule} config={config} />
        );
        expect(wrapper.find('a').exists()).toEqual(false);
    });
});
