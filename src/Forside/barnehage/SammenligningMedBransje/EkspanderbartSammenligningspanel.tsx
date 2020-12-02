import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import { Speedometer, SykefraværVurdering } from '../Speedometer/Speedometer';
import {
    getForklaringAvVurdering,
    getVurderingstekst,
    SammenligningsType,
} from '../vurderingstekster';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { SykefraværMetadata } from './SykefraværMetadata';
import { DetaljertVisningSykefravær } from './DetaljertVisningSykefravær';
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import { getTips } from '../../../felleskomponenter/tips/tips';
import lyspære from './lyspære-liten.svg';
import classNames from 'classnames';
import { useSendEvent } from '../../../amplitude/amplitude';

interface Props {
    sammenligningResultat: SykefraværVurdering;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number | null | undefined;
    antallKvartalerVirksomhet: ReactElement | null;
    antallKvartalerBransje: ReactElement | null;
    sammenligningsType: SammenligningsType;
    erBarnehage: boolean;
    harBransje: boolean;
    defaultÅpen?: boolean;
    className?: string;
}

export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
    sammenligningResultat: sykefraværResultat,
    sykefraværVirksomhet,
    sykefraværBransje,
    antallKvartalerVirksomhet,
    antallKvartalerBransje,
    sammenligningsType,
    erBarnehage,
    harBransje,
    defaultÅpen,
    className,
}) => {
    const [erÅpen, setErÅpen] = useState<boolean>(!!defaultÅpen);
    const sendEvent = useSendEvent();
    const periode = '01.07.2019 til 30.06.2020';

    const visningAvProsentForBransje: number | null | undefined =
        sykefraværResultat === SykefraværVurdering.FEIL ? null : sykefraværBransje;

    const getPanelEventtekst = (sammenligningsType: SammenligningsType) => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return 'totalfravær';
            case SammenligningsType.KORTTID:
                return 'korttidsfravær';
            case SammenligningsType.LANGTID:
                return 'langtidsfravær';
        }
    };
    let overskriftForTallForNæringEllerBransje;
    if (erBarnehage) {
        overskriftForTallForNæringEllerBransje = 'Barnehager i Norge:';
    } else {
        overskriftForTallForNæringEllerBransje = harBransje ? 'Din bransje:' : 'Din næring:';
    }

    const innhold = (
        <>
            <div className="ekspanderbart-sammenligningspanel__metadata-og-detaljert-visning-sykefravær">
                <SykefraværMetadata
                    className="ekspanderbart-sammenligningspanel__sykefravær-metadata"
                    sammenligningsType={sammenligningsType}
                    periode={periode}
                />
                <DetaljertVisningSykefravær
                    className="ekspanderbart-sammenligningspanel__detaljert-visning"
                    overskrift="Din virksomhet:"
                    prosent={sykefraværVirksomhet}
                    visingAntallKvartaller={antallKvartalerVirksomhet}
                />
                <DetaljertVisningSykefravær
                    className="ekspanderbart-sammenligningspanel__detaljert-visning"
                    overskrift={overskriftForTallForNæringEllerBransje}
                    prosent={visningAvProsentForBransje}
                    visingAntallKvartaller={antallKvartalerBransje}
                />
            </div>
            <div className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering">
                {getForklaringAvVurdering(sykefraværResultat, sykefraværBransje)}
            </div>
        </>
    );

    let overskriftForTips;
    if (sammenligningsType === SammenligningsType.TOTALT) {
        overskriftForTips = erBarnehage
            ? 'Tips fra andre barnehager i lignende situasjon som deg'
            : 'Tips fra andre virksomheter i lignende situasjon som deg';
    } else {
        overskriftForTips = 'Dette kan du gjøre';
    }

    return (
        <div className={classNames('ekspanderbart-sammenligningspanel', className)}>
            <EkspanderbartpanelBase
                onClick={() => {
                    sendEvent('barnehage ekspanderbart sammenligning', 'klikk', {
                        panel: getPanelEventtekst(sammenligningsType),
                        action: erÅpen ? 'lukk' : 'åpne',
                    });
                    setErÅpen(!erÅpen);
                }}
                apen={erÅpen}
                tittel={
                    <span className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        <Speedometer resultat={sykefraværResultat} inline />
                        <Systemtittel
                            tag="h2"
                            className="ekspanderbart-sammenligningspanel__tittel"
                        >
                            {getVurderingstekst(sykefraværResultat, sammenligningsType, harBransje)}
                        </Systemtittel>
                    </span>
                }
                className="ekspanderbart-sammenligningspanel__panel"
            >
                <div className="ekspanderbart-sammenligningspanel__innhold">
                    {innhold}
                    {erBarnehage && getTips(sammenligningsType, sykefraværResultat) && (
                        <div className="ekspanderbart-sammenligningspanel__tips-tittel">
                            <img
                                className="ekspanderbart-sammenligningspanel__bilde"
                                src={lyspære}
                                alt=""
                            />
                            <Ingress>{overskriftForTips}</Ingress>
                        </div>
                    )}
                    {erBarnehage && (
                        <TipsVisning
                            tips={getTips(sammenligningsType, sykefraværResultat)}
                            className={'ekspanderbart-sammenligningspanel__tips'}
                        />
                    )}
                </div>
            </EkspanderbartpanelBase>
            <div className="ekspanderbart-sammenligningspanel__print-innhold">{innhold}</div>
        </div>
    );
};
