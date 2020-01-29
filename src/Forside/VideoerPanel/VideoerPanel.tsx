import * as React from 'react';
import { FunctionComponent } from 'react';
import kalkulatorikon from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './VideoerPanel.less';
import { ReactComponent as EksternalLenkeIkon } from './eksternalLenkeIkon.svg';
import Lenke from 'nav-frontend-lenker';

const VideoerPanel: FunctionComponent = () => (
    <PanelBase className="videoerpanel">
        <img src={kalkulatorikon} alt="" className="videoerpanel__illustrasjon" />
        <div className="videoerpanel__tekst-wrapper">
            <div className="videoerpanel__overskrift">
                <Systemtittel className="videoerpanel__overskrift" tag="h2">
                    Informasjonsvideoer
                </Systemtittel>
                <Normaltekst>
                    Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
                </Normaltekst>
            </div>
            <div className="videoerpanel__overskrift">
                <Lenke
                    href="https://vimeo.com/showcase/6728595"
                    onClick={() =>
                        sendEvent('sykefravarsstatistikk.klikk-til-redusering-av-sykefravær')
                    }
                >
                    Redusering av sykefravær
                    <EksternalLenkeIkon />
                </Lenke>
            </div>

            <Lenke
                href="https://vimeo.com/showcase/6728594"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljøet')
                }
            >
                <span>Forebygge arbeidsmiljøet</span>
                <EksternalLenkeIkon />
            </Lenke>
        </div>
    </PanelBase>
);
export default VideoerPanel;
