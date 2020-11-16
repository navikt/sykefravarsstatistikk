import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './IAWebRedirectPanel.less';
import { ReactComponent as RedirectIkon } from './redirectIkon.svg';
import { ReactComponent as TilbakemeldingIkon } from './tilbakemeldingIkon.svg';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { PATH_FORSIDE } from '../konstanter';

const IAWebRedirectPanel: FunctionComponent = () => {
    return (
        <PanelBase className="iaweb-redirectpanel">
            <div className="iaweb-redirectpanel__innhold">
                <RedirectIkon className="iaweb-redirectpanel__ikon" />
                <Systemtittel className="iaweb-redirectpanel__tittel">
                    IA-web er ikke lenger tilgjengelig
                </Systemtittel>
                <Normaltekst className="iaweb-redirectpanel__tekst">
                    NAV har fjernet IA-web fordi tjenesten ble lite brukt. Vi tilbyr tjenesten
                    Sykefraværsstatistikk på Min side – arbeidsgiver.
                </Normaltekst>
                <Lenkepanel
                    className="iaweb-redirectpanel__lenkepanel"
                    href={PATH_FORSIDE}
                    tittelProps="normaltekst"
                    border
                    linkCreator={(props: any) => (
                        <Link to={props.href} {...props}>
                            {props.children}
                        </Link>
                    )}
                >
                    Gå til sykefraværsstatistikk
                </Lenkepanel>
                <div className="iaweb-redirectpanel__hotjar_lenke">
                    <MediaQuery maxWidth={767}>
                        <TilbakemeldingIkon style={{ width: 40, height: 40 }} />
                    </MediaQuery>
                    <MediaQuery minWidth={768}>
                        <TilbakemeldingIkon />
                    </MediaQuery>
                    <Lenke
                        className="iaweb-redirectpanel__tilbakemelding_lenke"
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
