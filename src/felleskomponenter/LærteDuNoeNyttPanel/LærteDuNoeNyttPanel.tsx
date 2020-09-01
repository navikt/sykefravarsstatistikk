import React, { FunctionComponent, useState } from 'react';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useSendEvent } from '../../amplitude/amplitude';
import './LærteDuNoeNyttPanel.less';

interface Props {
    tekst: string;
    område: string;
}

const ANONYM_TILBAKEMELDING_INFOTEKST =
    'Tilbakemeldingen kan ikke knyttes til deg eller din virksomhet.';

export const LærteDuNoeNyttPanel: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const [harSendtTilbakemeldingState, setharSendtTilbakemeldingState] = useState<boolean>(false);
    const knapper = (
        <div className="lærte-du-noe-nytt-panel__knapp-wrapper">
            <Knapp
                className="lærte-du-noe-nytt-panel__knapp"
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-JA', 'klikk');
                    setharSendtTilbakemeldingState(true);
                }}
            >
                JA
            </Knapp>
            <Knapp
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-NEI', 'klikk');
                    setharSendtTilbakemeldingState(true);
                }}
            >
                NEI
            </Knapp>
        </div>
    );

    return (
        <div className="lærte-du-noe-nytt-panel">
            {!harSendtTilbakemeldingState ? (
                <Element className="lærte-du-noe-nytt-panel__overskrift">{props.tekst}</Element>
            ) : null}

            {!harSendtTilbakemeldingState ? (
                <>
                    <Undertekst>
                        Vi ønsker å forstå om sammenligningen ga deg ny kunnskap.
                    </Undertekst>
                    <Undertekst>{ANONYM_TILBAKEMELDING_INFOTEKST}</Undertekst>
                </>
            ) : null}

            {!harSendtTilbakemeldingState ? (
                knapper
            ) : (
                <>
                    <Element className="lærte-du-noe-nytt-panel__overskrift">
                        Takk for tilbakemeldingen din
                    </Element>
                    <Undertekst className="lærte-du-noe-nytt-panel__takk">
                        {ANONYM_TILBAKEMELDING_INFOTEKST}
                    </Undertekst>
                </>
            )}
        </div>
    );
};
