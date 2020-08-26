import React, { FunctionComponent } from 'react';
import './DetaljertSammenligning.less';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { KorttidSammenligningPanel } from './DetaljertSammenligningPanel/KorttidSammenligningPanel';
import { LangtidSammenligningPanel } from './DetaljertSammenligningPanel/LangtidSammenligningPanel';

export const DetaljertSammenligning: FunctionComponent = () => {
    return (
        <div className="detaljert-sammenligning">
            <KorttidSammenligningPanel resultat={SykefraværResultat.UNDER} />
            <LangtidSammenligningPanel resultat={SykefraværResultat.OVER} />
        </div>
    );
};
