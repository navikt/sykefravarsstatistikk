import React, { FunctionComponent, useState } from 'react';
import { getTips } from '../../../felleskomponenter/tips/tips';
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import './EkspanderbareTips.less';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import lyspæreSvg from './lyspære.svg';
import { RestSummertSykefraværshistorikk } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { getAlleResultaterForSammenligningAvSykefravær } from '../barnehage-utils';
import { SammenligningsType } from '../vurderingstekster';
import { useSendEvent } from '../../../amplitude/amplitude';

interface Props {
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
}

export const EkspanderbareTips: FunctionComponent<Props> = ({ restSummertSykefraværshistorikk }) => {
    const [erÅpen, setErÅpen] = useState<boolean>(false);
    const sendEvent = useSendEvent();
    if (
        restSummertSykefraværshistorikk.status === RestStatus.IngenTilgang ||
        restSummertSykefraværshistorikk.status === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        restSummertSykefraværshistorikk.status === RestStatus.LasterInn ||
        restSummertSykefraværshistorikk.status === RestStatus.IkkeLastet
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
        restSummertSykefraværshistorikk.status,
        restSummertSykefraværshistorikk.status === RestStatus.Suksess
            ? restSummertSykefraværshistorikk.data
            : undefined
    );

    const tipsTotaltFravær = getTips(SammenligningsType.TOTALT, totaltFravær);
    const tipsKorttidsfravær = getTips(SammenligningsType.KORTTID, korttidsfravær);
    const tipsLangtidsfravær = getTips(SammenligningsType.LANGTID, langtidsfravær);

    return (
        <EkspanderbartpanelBase
            className="ekspanderbare-tips"
            onClick={() => {
                sendEvent('barnehage ekspanderbart tips', 'klikk', {
                    action: erÅpen ? 'lukk' : 'åpne',
                });
                setErÅpen(!erÅpen);
            }}
            apen={erÅpen}
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
        </EkspanderbartpanelBase>
    );
};
