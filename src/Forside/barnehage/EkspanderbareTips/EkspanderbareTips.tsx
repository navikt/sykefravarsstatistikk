import React, { FunctionComponent } from 'react';
import { getTips } from '../../../felleskomponenter/tips/tips';
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './EkspanderbareTips.less';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import lyspæreSvg from './lyspære.svg';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { getAlleResultaterForSammenligningAvSykefravær } from '../barnehage-utils';
import { SammenligningsType } from '../vurderingstekster';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const EkspanderbareTips: FunctionComponent<Props> = ({ restSykefraværsvarighet }) => {
    if (
        restSykefraværsvarighet.status === RestStatus.IngenTilgang ||
        restSykefraværsvarighet.status === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        restSykefraværsvarighet.status === RestStatus.LasterInn ||
        restSykefraværsvarighet.status === RestStatus.IkkeLastet
    ) {
        return (
            <Skeleton
                className="ekspanderbart-sammenligningspanel__loading-skeleton"
                height={355}
            />
        );
    }

    const {
        totaltFravær,
        korttidsfravær,
        langtidsfravær,
    } = getAlleResultaterForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined
    );

    const tipsTotaltFravær = getTips(SammenligningsType.TOTALT, totaltFravær);
    const tipsKorttidsfravær = getTips(SammenligningsType.KORTTID, korttidsfravær);
    const tipsLangtidsfravær = getTips(SammenligningsType.LANGTID, langtidsfravær);

    return (
        <Ekspanderbartpanel
            className="ekspanderbare-tips"
            apen
            tittel={
                <>
                    <img className="ekspanderbare-tips__bilde" src={lyspæreSvg} alt="" />
                    <Systemtittel tag="span">Se tips om hva du kan gjøre</Systemtittel>
                </>
            }
        >
            {tipsTotaltFravær && (
                <Undertittel className="ekspanderbare-tips__undertittel">
                    Tips fra andre barnehager i lignende situasjon som deg
                </Undertittel>
            )}
            <TipsVisning className="ekspanderbare-tips__tips" tips={tipsTotaltFravær} />
            {(tipsKorttidsfravær || tipsLangtidsfravær) && (
                <Undertittel className="ekspanderbare-tips__undertittel">
                    Dette kan du gjøre
                </Undertittel>
            )}
            <TipsVisning className="ekspanderbare-tips__tips" tips={tipsKorttidsfravær} />
            <TipsVisning className="ekspanderbare-tips__tips" tips={tipsLangtidsfravær} />
        </Ekspanderbartpanel>
    );
};
