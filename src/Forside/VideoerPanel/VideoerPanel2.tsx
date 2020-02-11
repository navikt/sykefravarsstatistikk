import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './VideoerPanel2.less';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

const VideoerPanel2: FunctionComponent = () => (
    <PanelBase className="videoerpanel2">
        <div className="videoerpanel2__tekst-wrapper">
        <Systemtittel className="videoerpanel2__overskrift" tag="h2">
            <Kalkulatorikon className="videoerpanel2__illustrasjon" />
            Informasjonsvideoer
        </Systemtittel>

        <Normaltekst className="videoerpanel2__ingress">
            Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
        </Normaltekst>
        </div>

        <div className="videoerpanel2__lenke-wrapper">
            <EksternLenke
                className="videoerpanel2__lenke"
                href="https://vimeo.com/showcase/6728595"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-redusering-av-sykefravær')
                }
            >
                Redusere sykefraværet
            </EksternLenke>

            <EksternLenke
                className="videoerpanel2__lenke"
                href="https://vimeo.com/showcase/6728594"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljøet')
                }
            >
                Forebygge arbeidsmiljøet
            </EksternLenke>
        </div>
    </PanelBase>
);
export default VideoerPanel2;
