import React, { FunctionComponent } from 'react';
import './DetaljertSammenligning.less';
import {
    erMaskert,
    harSykefravær,
    RestSykefraværsvarighet,
} from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { DetaljertSammenligningPanel } from './DetaljertSammenligningPanel/DetaljertSammenligningPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import {
    getResultatForSammenligningAvSykefravær,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import Skeleton from 'react-loading-skeleton';
import {
    getVurderingstekstKorttid,
    getVurderingstekstLangtid,
    Vurderingstekst,
} from './DetaljertSammenligningPanel/Vurderingstekst';
import { LesMerKorttid } from './LesMerKorttid';
import { LesMerLangtid } from './LesMerLangtid';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const DetaljertSammenligning: FunctionComponent<Props> = ({ restSykefraværsvarighet }) => {
    if (
        restSykefraværsvarighet.status === RestStatus.LasterInn ||
        restSykefraværsvarighet.status === RestStatus.IkkeLastet
    ) {
        return <Skeleton className="detaljert-sammenligning" height={160} />;
    }

    if (restSykefraværsvarighet.status !== RestStatus.Suksess) {
        return null;
    }

    if (erMaskert(restSykefraværsvarighet.data) || !harSykefravær(restSykefraværsvarighet.data)) {
        return null;
    }

    const varighet = restSykefraværsvarighet.data;

    const korttidVirksomhet = varighet.korttidsfraværSiste4Kvartaler;
    const korttidBransje = sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær;
    const resultatKorttid = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        korttidVirksomhet,
        korttidBransje
    );

    const langtidVirksomhet = varighet.langtidsfraværSiste4Kvartaler;
    const langtidBransje = sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær;
    const resultatLangtid = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        langtidVirksomhet,
        langtidBransje
    );

    return (
        <div className="detaljert-sammenligning">
            <DetaljertSammenligningPanel
                korttidEllerLangtid="korttidsfravær"
                resultat={resultatKorttid}
                vurderingstekst={getVurderingstekstKorttid(resultatKorttid)}
            >
                <LesMerKorttid
                    korttidsfraværSiste4KvartalerVirksomhet={korttidVirksomhet}
                    korttidsfraværSiste4KvartalerBransje={korttidBransje}
                    resultat={resultatKorttid}
                />
            </DetaljertSammenligningPanel>
            <DetaljertSammenligningPanel
                korttidEllerLangtid="langtidsfravær"
                resultat={resultatLangtid}
                vurderingstekst={getVurderingstekstLangtid(resultatLangtid)}
            >
                <LesMerLangtid
                    langtidsfraværSiste4KvartalerVirksomhet={langtidVirksomhet}
                    langtidsfraværSiste4KvartalerBransje={langtidBransje}
                    resultat={resultatLangtid}
                />
            </DetaljertSammenligningPanel>
        </div>
    );
};
