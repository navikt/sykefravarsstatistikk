import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import './VideoerPanelTogglet.less';
import amplitude from '../../utils/amplitude';

const VideoerPanelTogglet: FunctionComponent = () => (
    <PanelBase className="videoerpaneltogglet">
        <div className="videoerpaneltogglet__tekst-wrapper">
            <Systemtittel className="videoerpaneltogglet__overskrift" tag="h2">
                <Kalkulatorikon className="videoerpaneltogglet__illustrasjon" />
                Hva kan du gjøre med sykefraværet?
            </Systemtittel>

            <Normaltekst className="videoerpaneltogglet__ingress">
                Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og arbeidsmiljø.
            </Normaltekst>
        </div>

        <div className="videoerpaneltogglet__lenke-wrapper">
            <EksternLenke
                className="videoerpaneltogglet__lenke"
                href="https://vimeo.com/showcase/6728595"
                onClick={() => {
                    sendEvent('sykefravarsstatistikk.klikk-til-redusering-av-sykefravar');
                    amplitude.logEvent('#sykefravarsstatistikk-forside videoer folgeopp-klikk');
                    amplitude.logEvent('#sykefravarsstatistikk-forside noe-klikket-pa');
                }}
            >
                Følge opp sykefravær
            </EksternLenke>

            <EksternLenke
                className="videoerpaneltogglet__lenke"
                href="https://vimeo.com/showcase/6728594"
                onClick={() => {
                    sendEvent('sykefravarsstatistikk.klikk-til-forebygge-arbeidsmiljoet');
                    amplitude.logEvent('#sykefravarsstatistikk-forside videoer forebygge-klikk');
                    amplitude.logEvent('#sykefravarsstatistikk-forside noe-klikket-pa');
                }}
            >
                Forebygge sykefravær
            </EksternLenke>
        </div>
    </PanelBase>
);
export default VideoerPanelTogglet;
