import React, { FunctionComponent } from 'react';
import './DetaljertSammenligning.less';
import { KorttidSammenligningPanel } from './DetaljertSammenligningPanel/KorttidSammenligningPanel';
import { LangtidSammenligningPanel } from './DetaljertSammenligningPanel/LangtidSammenligningPanel';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { getResultatForKorttidsfravær, getResultatForLangtidsfravær } from '../barnehage-utils';
import { RestStatus } from '../../../api/api-utils';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const DetaljertSammenligning: FunctionComponent<Props> = ({ restSykefraværsvarighet }) => {
    if (restSykefraværsvarighet.status !== RestStatus.Suksess) {
        return null; // TODO Feilhåndtering og lasting
    }
    return (
        <div className="detaljert-sammenligning">
            <KorttidSammenligningPanel
                resultat={getResultatForKorttidsfravær(restSykefraværsvarighet.data)}
            />
            <LangtidSammenligningPanel
                resultat={getResultatForLangtidsfravær(restSykefraværsvarighet.data)}
            />
        </div>
    );
};
