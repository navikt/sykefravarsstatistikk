import { LasterInn, Suksess } from './api-utils';

export type FeatureToggles = {
    [feature: string]: boolean;
};

export type RestFeatureToggles = LasterInn | Suksess<FeatureToggles>;
