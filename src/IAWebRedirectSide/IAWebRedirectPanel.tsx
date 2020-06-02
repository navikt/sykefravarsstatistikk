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
    return (
        <PanelBase className="iawebredirectpanel">
            <div className="iawebredirectpanel__innhold">
                <RedirectIkon className="iawebredirectpanel__ikon" />
                <Systemtittel className="iawebredirectpanel__tittel">
                    IA-web er ikke lenger tilgjengelig
                </Systemtittel>
                <Normaltekst className="iawebredirectpanel__tekst">
                    NAV har fjernet IA-web fordi tjenesten ble lite brukt. Vi tilbyr tjenesten
                    Sykefraværsstatistikk på Min side – arbeidsgiver.
                </Normaltekst>
                <Lenkepanel
                    className="iawebredirectpanel__lenkepanel"
                    href={PATH_FORSIDE}
                    tittelProps="normaltekst"
                    border
                >
                    Gå til sykefraværsstatistikk
                </Lenkepanel>
                <div className="iawebredirectpanel__hotjar_lenke">
                    <TilbakemeldingIkon />
                    <Lenke
                        className="iawebredirectpanel__tilbakemelding_lenke"
                        href={'https://surveys.hotjar.com/s?siteId=118350&surveyId=157037'}
                    >
                        <Normaltekst>
                            Gi oss en tilbakemelding på hvordan dette påvirker deg
                        </Normaltekst>
                    </Lenke>
                </div>
            </div>
        </PanelBase>
    );
};

export default IAWebRedirectPanel;
