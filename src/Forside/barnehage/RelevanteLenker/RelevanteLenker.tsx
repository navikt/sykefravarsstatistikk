import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './RelevanteLenker.less';
import videoikonSvg from './videoikon.svg';
import idebankenLogoSvg from './idebanken-logo.svg';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';

export const RelevanteLenker: FunctionComponent = () => (
    <div className="relevante-lenker">
        <Systemtittel className="relevante-lenker__tittel">Andre relevante lenker</Systemtittel>

        <div className="relevante-lenker__lenke-wrapper">
            <img src={videoikonSvg} alt="videoikon" className="relevante-lenker__ikon" />
            <div>
                <Normaltekst tag="p">
                    Se opptak av tidligere nettkurs om oppfølging og forebygging av sykefravær
                </Normaltekst>
                <EksternLenke
                    href="https://vimeo.com/showcase/7671659"
                    className="relevante-lenker__lenke"
                >
                    Gå til Barnehagefokuserte nettkurs
                </EksternLenke>
            </div>
        </div>
        <div className="relevante-lenker__lenke-wrapper">
            <img src={idebankenLogoSvg} alt="Idébanken-logo" className="relevante-lenker__ikon" />
            <div>
                <Normaltekst tag="p">
                    På idebanken.org finner du tips, erfaringer og verktøy som kan bidra til bedre
                    arbeidsmiljø og lavere sykefravær.
                </Normaltekst>
                <EksternLenke href="https://www.idebanken.org" className="relevante-lenker__lenke">
                    Gå til idébanken
                </EksternLenke>
            </div>
        </div>
    </div>
);
