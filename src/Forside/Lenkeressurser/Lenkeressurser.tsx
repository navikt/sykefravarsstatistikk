import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as Kalkulatorikon } from './video.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import './Lenkeressurser.less';
import { useSendEvent } from '../../amplitude/amplitude';

const Lenkeressurser: FunctionComponent = () => {
    const sendEvent = useSendEvent();

    return (
        <PanelBase className="lenkeressurser">
            <Systemtittel className="lenkeressurser__overskrift" tag="h2">
                <Kalkulatorikon className="lenkeressurser__illustrasjon" />
                Hva kan du gjøre med sykefraværet?
            </Systemtittel>
            <div className="lenkeressurser__videolenker">
                <Normaltekst className="lenkeressurser__tekst">
                    Se NAVs informasjonsvideoer om hvordan du kan jobbe med sykefravær og
                    arbeidsmiljø.
                </Normaltekst>

                <div className="lenkeressurser__lenke-wrapper">
                    <EksternLenke
                        className="lenkeressurser__lenke"
                        href="https://vimeo.com/showcase/6728595"
                        onClick={() => sendEvent('forside videoer folgeopp', 'klikk')}
                    >
                        Følge opp sykefravær
                    </EksternLenke>

                    <EksternLenke
                        className="lenkeressurser__lenke"
                        href="https://vimeo.com/showcase/6728594"
                        onClick={() => sendEvent('forside videoer forebygge', 'klikk')}
                    >
                        Forebygge sykefravær
                    </EksternLenke>
                </div>
            </div>
            <div className="lenkeressurser__idebanken">
                <Normaltekst className="lenkeressurser__tekst">
                    På idebanken.org finner du tips, erfaringer og verktøy som kan bidra til bedre
                    arbeidsmiljø og lavere sykefravær.
                </Normaltekst>
                <div className="lenkeressurser__lenke-wrapper">
                    <EksternLenke href="https://www.idebanken.org/">Idébanken</EksternLenke>
                </div>
            </div>
        </PanelBase>
    );
};
export default Lenkeressurser;
