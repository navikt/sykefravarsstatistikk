import React, { FunctionComponent } from 'react';
import './DetaljertSammenligning.less';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { DetaljertSammenligningPanel } from './DetaljertSammenligningPanel/DetaljertSammenligningPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import {
    getResultatForKorttidsfravær,
    getResultatForLangtidsfravær,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import Skeleton from 'react-loading-skeleton';

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

    const varighet = restSykefraværsvarighet.data;

    const korttidVirksomhet = varighet.korttidsfraværSiste4Kvartaler.prosent;
    const korttidBransje = sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær;
    const resultatKorttid = getResultatForKorttidsfravær(varighet);

    const langtidVirksomhet = varighet.langtidsfraværSiste4Kvartaler.prosent;
    const langtidBransje = sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær;
    const resultatLangtid = getResultatForLangtidsfravær(varighet);

    return (
        <div className="detaljert-sammenligning">
            <DetaljertSammenligningPanel
                korttidEllerLangtid="korttidsfravær"
                resultat={resultatKorttid}
            >
                <Normaltekst>Andelen legemeldt sykefravær mellom 1 og 16 dager:</Normaltekst>
                <Normaltekst>
                    Ditt resultat: {formaterProsent(korttidVirksomhet)}&nbsp;%
                </Normaltekst>
                <Normaltekst>
                    Bransjens resultat: {formaterProsent(korttidBransje)}&nbsp;%
                </Normaltekst>
            </DetaljertSammenligningPanel>
            <DetaljertSammenligningPanel
                korttidEllerLangtid="langtidsfravær"
                resultat={resultatLangtid}
            >
                <Normaltekst>Andel langtidsfravær fra 17. dag:</Normaltekst>
                <Normaltekst>
                    Ditt resultat: {formaterProsent(langtidVirksomhet)}&nbsp;%
                </Normaltekst>
                <Normaltekst>
                    Bransjens resultat: {formaterProsent(langtidBransje)}&nbsp;%
                </Normaltekst>
            </DetaljertSammenligningPanel>
        </div>
    );
};
