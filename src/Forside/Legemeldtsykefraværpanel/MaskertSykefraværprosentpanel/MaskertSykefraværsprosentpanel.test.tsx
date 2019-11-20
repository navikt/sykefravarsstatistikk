import { shallow } from 'enzyme';
import React from 'react';
import MaskertSykefraværprosentpanel, {
    MaskertSykefraværprosentpanelProps,
} from './MaskertSykefraværprosentpanel';
import { DataErMaskertPanel } from './DataErMaskertPanel/DataErMaskertPanel';
import Sykefraværsprosentpanel from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';

describe('Tester for MaskertSykefraværprosentpanel', () => {
    it('Skal rendre maskert komponent hvis sykefraværsprosenten er maskert', () => {
        const props = {
            ...tommeProps,
            sykefraværprosent: {
                label: 'Fisk og fugl AS',
                prosent: null,
                erMaskert: true,
            },
        };

        const wrapper = shallow(<MaskertSykefraværprosentpanel {...props} />);
        expect(wrapper.exists(DataErMaskertPanel)).toEqual(true);
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
        expect(wrapper.exists(DataErMaskertPanel)).toEqual(false);
        expect(wrapper.exists(Sykefraværsprosentpanel)).toEqual(true);
    });
});


const tommeProps: MaskertSykefraværprosentpanelProps = {
    label: '',
    labelHvisMaskert: '',
    sykefraværprosent: {
        label: '',
        prosent: 0,
    },
};
