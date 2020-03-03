import { shallow } from 'enzyme';
import React from 'react';
import MaskertSykefraværprosentpanel, {
    MaskertSykefraværprosentpanelProps,
} from './MaskertSykefraværprosentpanel';
import Sykefraværsprosentpanel from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { DataKanIkkeVisesPanel } from './DataKanIkkeVisesPanel/DataKanIkkeVisesPanel';
import { Sykefraværprosent } from '../../../api/sammenligning';

describe('Tester for MaskertSykefraværprosentpanel', () => {
    it('Skal rendre at data ikke kan vises, med maskert label, hvis sykefraværsprosenten er maskert', () => {
        const props = {
            ...tommeProps,
            labelHvisMaskert: 'maskert',
            sykefraværprosent: {
                label: 'Fisk og fugl AS',
                prosent: null,
                erMaskert: true,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataKanIkkeVisesPanel)).toEqual(true);
        expect(wrapper.find(DataKanIkkeVisesPanel).props().label).toEqual('maskert');
        expect(wrapper.exists(Sykefraværsprosentpanel)).toEqual(false);
    });

    it('Skal rendre at data ikke kan vises, med riktig label, hvis sykefraværsprosenten null uten å være maskert', () => {
        const props = {
            ...tommeProps,
            labelHvisNull: 'prosent er null',
            sykefraværprosent: {
                label: 'Fisk og fugl AS',
                prosent: null,
                erMaskert: false,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataKanIkkeVisesPanel)).toEqual(true);
        expect(wrapper.find(DataKanIkkeVisesPanel).props().label).toEqual('prosent er null');
        expect(wrapper.exists(Sykefraværsprosentpanel)).toEqual(false);
    });

    it('Skal rendre vanlig komponent komponent hvis sykefraværsprosenten ikke er maskert', () => {
        const props = {
            ...tommeProps,
            sykefraværprosent: {
                label: 'Fisk og fugl AS',
                prosent: 4.7,
                erMaskert: false,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataKanIkkeVisesPanel)).toEqual(false);
        expect(wrapper.exists(Sykefraværsprosentpanel)).toEqual(true);
    });
});

const tomtSykefraværsprosent: Sykefraværprosent = {
    label: '',
    prosent: 0,
};

const tommeProps: MaskertSykefraværprosentpanelProps = {
    labelHvisMaskert: '',
    labelHvisUndefined: '',
    sykefraværsprosent: tomtSykefraværsprosent,
    laster: false,
};
