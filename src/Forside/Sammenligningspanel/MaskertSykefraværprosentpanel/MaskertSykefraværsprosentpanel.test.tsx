import { shallow } from 'enzyme';
import React from 'react';
import MaskertSykefraværprosentpanel, {
    MaskertSykefraværprosentpanelProps,
} from './MaskertSykefraværprosentpanel';
import Sykefraværsprosentpanel from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { DataKanIkkeVisesPanel } from './DataKanIkkeVisesPanel/DataKanIkkeVisesPanel';
import { Sykefraværsprosent } from '../../../api/sykefraværshistorikk';

describe('Tester for MaskertSykefraværprosentpanel', () => {
    it('Skal rendre at data ikke kan vises, med maskert label, hvis sykefraværsprosenten er maskert', () => {
        const props: MaskertSykefraværprosentpanelProps = {
            ...tommeProps,
            labelHvisMaskert: 'maskert',
            sykefraværsprosent: {
                prosent: null,
                erMaskert: true,
                tapteDagsverk: null,
                muligeDagsverk: null,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataKanIkkeVisesPanel)).toEqual(true);
        expect(wrapper.find(DataKanIkkeVisesPanel).props().label).toEqual('maskert');
        expect(wrapper.exists(Sykefraværsprosentpanel)).toEqual(false);
    });

    it('Skal rendre at data ikke kan vises, med riktig label, hvis sykefraværsprosenten undefined', () => {
        const props: MaskertSykefraværprosentpanelProps = {
            ...tommeProps,
            labelHvisUndefined: 'prosent er undefined',
            sykefraværsprosent: {
                prosent: undefined,
                erMaskert: false,
                tapteDagsverk: undefined,
                muligeDagsverk: undefined,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataKanIkkeVisesPanel)).toEqual(true);
        expect(wrapper.find(DataKanIkkeVisesPanel).props().label).toEqual('prosent er undefined');
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

const tomtSykefraværsprosent: Sykefraværsprosent = {
    erMaskert: false,
    prosent: 0,
    tapteDagsverk: undefined,
    muligeDagsverk: undefined,
};

const tommeProps: MaskertSykefraværprosentpanelProps = {
    labelHvisMaskert: '',
    labelHvisUndefined: '',
    sykefraværsprosent: tomtSykefraværsprosent,
    laster: false,
};
