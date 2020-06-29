import { useEffect, useState } from 'react';
import { LasterInn, RestStatus, Suksess } from './api-utils';
import { hentRestFeatureToggles } from './api';

export type FeatureToggles = {
    [feature: string]: boolean;
};

export type RestFeatureToggles = LasterInn | Suksess<FeatureToggles>;
