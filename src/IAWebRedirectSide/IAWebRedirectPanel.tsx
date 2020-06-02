import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './IAWebRedirectPanel.less';
import { ReactComponent as RedirectIkon } from './redirectIkon.svg';
import { ReactComponent as TilbakemeldingIkon } from './tilbakemeldingIkon.svg';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { PATH_FORSIDE } from '../App';

const IAWebRedirectPanel: FunctionComponent = () => {
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
                <Lenkepanel href={PATH_FORSIDE} tittelProps="normaltekst" border>
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
