import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './VideoerPanel.less';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import VideoerPanelTogglet from './VideoerPanelTogglet';

const VideoerPanel: FunctionComponent<{ visNyttDesign: boolean }> = props => {
    if (props.visNyttDesign) {
        return <VideoerPanelTogglet />;
    }
    return (
        <PanelBase className="videoerpanel">
            <Systemtittel className="videoerpanel__overskrift" tag="h2">
                <Kalkulatorikon className="videoerpanel__illustrasjon" />
                Informasjonsvideoer
            </Systemtittel>
            <Normaltekst className="videoerpanel__ingress">
                Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
            </Normaltekst>

            <EksternLenke
                className="videoerpanel__lenke"
                href="https://vimeo.com/showcase/6728595"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-redusering-av-sykefravar')
                }
            >
                Redusering av sykefravær
            </EksternLenke>

            <EksternLenke
                className="videoerpanel__lenke"
                href="https://vimeo.com/showcase/6728594"
                onClick={() =>
                    sendEvent('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljoet')
                }
            >
                Forebygge arbeidsmiljøet
            </EksternLenke>
        </PanelBase>
    );
};
export default VideoerPanel;
