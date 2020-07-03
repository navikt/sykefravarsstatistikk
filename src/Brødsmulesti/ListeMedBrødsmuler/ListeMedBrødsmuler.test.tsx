import React from 'react';
import ListeMedBrødsmuler from './ListeMedBrødsmuler';
import { shallow } from 'enzyme';
import { Brødsmule, BrødsmulestiConfig } from '../brødsmulesti-utils';

describe('Tester for ListeMedBrødsmuler', () => {
    it('Alle foregående brødsmuler skal rendres', () => {
        const gjeldendeBrødsmule = lagTestbrødsmule('d', 'Tekst D', 'c', '/d');

        const config: BrødsmulestiConfig = [
            lagTestbrødsmule('a', 'Tekst A', undefined, '/a'),
            lagTestbrødsmule('b', 'Tekst B', 'a', '/b'),
            lagTestbrødsmule('c', 'Tekst C', 'b', '/c'),
            gjeldendeBrødsmule,
        ];

        const wrapper = shallow(
            <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeBrødsmule} config={config} />
        );
        expect(wrapper.findWhere((element) => element.props().href === '/a').exists()).toEqual(
            true
        );
        expect(wrapper.findWhere((element) => element.props().href === '/b').exists()).toEqual(
            true
        );
        expect(wrapper.findWhere((element) => element.props().href === '/c').exists()).toEqual(
            true
        );
    });

    it('Skal ikke vise andre brødsmuler enn de foregående', () => {
        const gjeldendeBrødsmule = lagTestbrødsmule('b', 'Tekst B', 'a', '/b');

        const config: BrødsmulestiConfig = [
            lagTestbrødsmule('a', 'Tekst A', undefined, '/a'),
            gjeldendeBrødsmule,
            lagTestbrødsmule('b2', 'Tekst B2', 'a', '/b2'),
            lagTestbrødsmule('c', 'Tekst C', 'b', '/c'),
        ];

        const wrapper = shallow(
            <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeBrødsmule} config={config} />
        );
        expect(wrapper.findWhere((element) => element.props().href === '/c').exists()).toEqual(
            false
        );
        expect(wrapper.findWhere((element) => element.props().href === '/b2').exists()).toEqual(
            false
        );
    });

    it('Gjeldende brødsmule skal ikke være lenke', () => {
        const gjeldendeBrødsmule = lagTestbrødsmule('b', 'Tekst B', 'a', '/b');

        const config: BrødsmulestiConfig = [
            lagTestbrødsmule('a', 'Tekst A', undefined, '/a'),
            gjeldendeBrødsmule,
        ];

        const wrapper = shallow(
            <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeBrødsmule} config={config} />
        );
        expect(wrapper.findWhere((element) => element.props().href === '/b').exists()).toEqual(
            false
        );
        expect(wrapper.findWhere((element) => element.text() === 'Tekst B').exists()).toEqual(true);
    });
});

export const lagTestbrødsmule = (
    side: string,
    lenketekst: string,
    overordnetSide: string | undefined,
    href: string
): Brødsmule => {
    return {
        side: side,
        lenketekst: lenketekst,
        overordnetSide: overordnetSide,
        lenke: (innhold) => <a href={href}>{innhold}</a>,
    };
};
