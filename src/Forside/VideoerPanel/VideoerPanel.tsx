import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendMetrikker } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './VideoerPanel.less';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import VideoerPanelTogglet from './VideoerPanelTogglet';
import { sendEvent } from '../../utils/amplitude';

const VideoerPanel: FunctionComponent<{ visNyttDesign: boolean }> = (props) => {
    if (props.visNyttDesign) {
        return <VideoerPanelTogglet />;
    }
    return (
        <PanelBase className="videoerpanel">
            <Systemtittel className="videoerpanel__overskrift" tag="h2">
                <Kalkulatorikon className="videoerpanel__illustrasjon" />
                Videoer
            </Systemtittel>
            <Normaltekst className="videoerpanel__ingress">
                Se NAVs videoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
            </Normaltekst>

            <EksternLenke
                className="videoerpanel__lenke"
                href="https://vimeo.com/showcase/6728595"
                onClick={() => {
                    sendMetrikker('sykefravarsstatistikk.klikk-til-redusering-av-sykefravar');
                    sendEvent('forside videoer redusering', 'klikk');
                }}
            >
                Redusering av sykefravær
            </EksternLenke>

            <EksternLenke
                className="videoerpanel__lenke"
                href="https://vimeo.com/showcase/6728594"
                onClick={() => {
                    sendMetrikker('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljoet');
                    sendEvent('forside videoer redusering', 'klikk');
                }}
            >
                Forebygge arbeidsmiljøet
            </EksternLenke>
        </PanelBase>
    );
};
export default VideoerPanel;
