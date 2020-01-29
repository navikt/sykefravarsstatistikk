import * as React from 'react';
import { FunctionComponent } from 'react';
import kalkulatorikon from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './VideoerPanel.less';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

const VideoerPanel: FunctionComponent = () => (
    <PanelBase className="videoerpanel">
        <div className="videoerpanel__tekst-wrapper">
            <div className="videoerpanel__overskrift">
                <Systemtittel className="videoerpanel__overskrift videoerpanel__tittel-ikon" tag="h2">
                    <img src={kalkulatorikon} alt="" className="videoerpanel__illustrasjon" />
                    Informasjonsvideoer
                </Systemtittel>
                <Normaltekst>
                    Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
                </Normaltekst>
            </div>
            <div className="videoerpanel__overskrift">
                <EksternLenke
                    href="https://vimeo.com/showcase/6728595"
                    onClick={() =>
                        sendEvent('sykefravarsstatistikk.klikk-til-redusering-av-sykefravær')
                    }
                >
                    Redusering av sykefravær
                </EksternLenke>
            </div>

            <EksternLenke
                href="https://vimeo.com/showcase/6728594"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljøet')
                }
            >
                <span>Forebygge arbeidsmiljøet</span>
            </EksternLenke>
        </div>
    </PanelBase>
);
export default VideoerPanel;
