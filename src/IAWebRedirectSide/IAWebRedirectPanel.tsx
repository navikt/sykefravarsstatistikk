import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './IAWebRedirectPanel.less';
import { RestSykefraværshistorikk, Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    historikkHarBransje,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../utils/sykefraværshistorikk-utils';
import { RestStatus } from '../api/api-utils';

import Skeleton from 'react-loading-skeleton';
import { ReactComponent as RedirectIkon } from './redirectIkon.svg';
import { ReactComponent as TilbakemeldingIkon } from './tilbakemeldingIkon.svg';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const getSammenligningForSisteKvartal = (
    historikkListe: Sykefraværshistorikk[]
): KvartalsvisSammenligning => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(historikkListe);
    kvartalsvisSammenligning.reverse();
    return kvartalsvisSammenligning[0];
};

const IAWebRedirectPanel: FunctionComponent<Props> = props => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let labels: HistorikkLabels | any = {};
    let sammenligningSisteKvartal: KvartalsvisSammenligning | any = {};
    let harBransje = undefined;

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const historikkListe = restSykefraværshistorikk.data;
        labels = getHistorikkLabels(historikkListe);
        sammenligningSisteKvartal = getSammenligningForSisteKvartal(historikkListe);
        harBransje = historikkHarBransje(restSykefraværshistorikk.data);
    }

    const { årstall, kvartal } = sammenligningSisteKvartal;

    const lasterinnhold = (
        <div className="sammenligningspanel__skeleton">
            <Skeleton height={228} />
        </div>
    );

    const innhold = (
        <div className="iawebredirectpanel__innhold">
            <div className="iawebredirectpanel__ikon">
                <RedirectIkon />
            </div>
            <div className="iawebredirectpanel__tittel">
                <Systemtittel> IA-web er ikke lenger tilgjengelig</Systemtittel>
            </div>
            <div className="iawebredirectpanel__tekst">
                <Normaltekst>
                    NAV har fjernet IA-web fordi tjenesten ble lite brukt. Vi tilbyr tjenesten
                    Sykefraværsstatistikk på Min side – arbeidsgiver.
                </Normaltekst>
            </div>
            <div className="iawebredirectpanel__lenkepanel">
                <Lenkepanel href="#" tittelProps="normaltekst" border>
                    Gå til sykefraværsstatistikk
                </Lenkepanel>
            </div>
            <div className="iawebredirectpanel__hotjar_lenke">
                <TilbakemeldingIkon />
                <Lenke
                    className="iawebredirectpanel__tilbakemelding_ikon"
                    href={'https://surveys.hotjar.com/s?siteId=118350&surveyId=157037'}
                >
                    Gi oss en tilbakemelding på hvordan dette påvirker deg
                </Lenke>
            </div>
        </div>
    );

    return (
        <PanelBase className="iawebredirectpanel">
            <div className="iawebredirectpanel__tekst-wrapper">{innhold}</div>
        </PanelBase>
    );
};

export default IAWebRedirectPanel;
