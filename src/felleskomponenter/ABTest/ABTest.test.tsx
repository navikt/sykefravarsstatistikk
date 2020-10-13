import React from 'react';
import { shallow } from 'enzyme';
import { ABTest } from './ABTest';
import { RestStatus } from '../../api/api-utils';
import { RestFeatureToggles } from '../../api/featureToggles';

describe('Tester for ABTest', () => {
    it('Skal rendre versjon A hvis toggle er skrudd av', () => {
        const toggles: RestFeatureToggles = {
            status: RestStatus.Suksess,
            data: {
                'ab-feature': false,
            },
        };
        const wrapper = shallow(
            <ABTest
                feature={'ab-feature'}
                restFeatureToggles={toggles}
                versjonA={<div id="versjon-a" />}
                versjonB={<div id="versjon-b" />}
            />
        );

        expect(wrapper.find('#versjon-a').exists()).toBeTruthy();
        expect(wrapper.find('#versjon-b').exists()).toBeFalsy();
    });

    it('Skal rendre versjon B hvis toggle er skrudd på', () => {
        const toggles: RestFeatureToggles = {
            status: RestStatus.Suksess,
            data: {
                'ab-feature': true,
            },
        };
        const wrapper = shallow(
            <ABTest
                feature={'ab-feature'}
                restFeatureToggles={toggles}
                versjonA={<div id="versjon-a" />}
                versjonB={<div id="versjon-b" />}
            />
        );

        expect(wrapper.find('#versjon-a').exists()).toBeFalsy();
        expect(wrapper.find('#versjon-b').exists()).toBeTruthy();
    });

    it('Skal rendre versjon A som fallback hvis toggle ikke finnes', () => {
        const toggles: RestFeatureToggles = {
            status: RestStatus.Suksess,
            data: {},
        };
        const wrapper = shallow(
            <ABTest
                feature={'ab-feature'}
                restFeatureToggles={toggles}
                versjonA={<div id="versjon-a" />}
                versjonB={<div id="versjon-b" />}
            />
        );

        expect(wrapper.find('#versjon-a').exists()).toBeTruthy();
        expect(wrapper.find('#versjon-b').exists()).toBeFalsy();
    });
});
