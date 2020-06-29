import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendMetrikker } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import './VideoerPanel.less';
import { useSendEvent } from '../../amplitude/amplitude';

const VideoerPanel: FunctionComponent = () => {
    const sendEvent = useSendEvent();

    return (
        <PanelBase className="videoerpanel">
            <div className="videoerpanel__tekst-wrapper">
                <Systemtittel className="videoerpanel__overskrift" tag="h2">
                    <Kalkulatorikon className="videoerpanel__illustrasjon" />
                    Hva kan du gjøre med sykefraværet?
                </Systemtittel>

                <Normaltekst className="videoerpanel__ingress">
                    Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og
                    arbeidsmiljø.
                </Normaltekst>
            </div>

            <div className="videoerpanel__lenke-wrapper">
                <EksternLenke
                    className="videoerpanel__lenke"
                    href="https://vimeo.com/showcase/6728595"
                    onClick={() => {
                        sendMetrikker('sykefravarsstatistikk.klikk-til-redusering-av-sykefravar');
                        sendEvent('forside videoer folgeopp', 'klikk');
                    }}
                >
                    Følge opp sykefravær
                </EksternLenke>

                <EksternLenke
                    className="videoerpanel__lenke"
                    href="https://vimeo.com/showcase/6728594"
                    onClick={() => {
                        sendMetrikker('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljoet');
                        sendEvent('forside videoer forebygge', 'klikk');
                    }}
                >
                    Forebygge sykefravær
                </EksternLenke>
            </div>
        </PanelBase>
    );
};
export default VideoerPanel;
