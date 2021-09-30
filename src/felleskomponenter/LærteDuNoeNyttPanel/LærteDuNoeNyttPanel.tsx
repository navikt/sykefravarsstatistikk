import React, { FunctionComponent, useContext, useState } from 'react';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useSendEvent } from '../../amplitude/events';
import './LærteDuNoeNyttPanel.less';
import { tilbakemeldingContext } from '../../utils/TilbakemeldingContext';

interface Props {
    tekst: string;
    område: string;
    skalVises: boolean;
}

const ANONYM_TILBAKEMELDING_INFOTEKST =
    'Tilbakemeldingen kan ikke knyttes til deg eller din virksomhet.';

export const LærteDuNoeNyttPanel: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const [harSendtTilbakemeldingState, setharSendtTilbakemeldingState] = useState<boolean>(false);

    const context = useContext(tilbakemeldingContext);

    if (!props.skalVises || (context.harSendtTilbakemelding && !harSendtTilbakemeldingState)) {
        return null;
    }

    if (!harSendtTilbakemeldingState) {
        return (
            <div className="lærte-du-noe-nytt-panel">
                <Element
                    className="lærte-du-noe-nytt-panel__overskrift"
                    id="lærte-du-noe-nytt-panel__spørsmål-id"
                >
                    {props.tekst}
                </Element>

                <Undertekst>Vi ønsker å forstå om sammenligningen ga deg ny kunnskap.</Undertekst>
                <Undertekst>{ANONYM_TILBAKEMELDING_INFOTEKST}</Undertekst>

                <div className="lærte-du-noe-nytt-panel__knapp-wrapper">
                    <Knapp
                        className="lærte-du-noe-nytt-panel__knapp"
                        onClick={() => {
                            sendEvent(props.område, 'klikk', { svar: 'ja' });
                            setharSendtTilbakemeldingState(true);
                            context.setHarSendtTilbakemelding(true);
                        }}
                        aria-labelledby="lærte-du-noe-nytt-panel__spørsmål-id lærte-du-noe-nytt-panel__ja-knapp-id"
                    >
                        <span id="lærte-du-noe-nytt-panel__ja-knapp-id">JA</span>
                    </Knapp>
                    <Knapp
                        className="lærte-du-noe-nytt-panel__knapp"
                        onClick={() => {
                            sendEvent(props.område, 'klikk', { svar: 'nei' });
                            setharSendtTilbakemeldingState(true);
                            context.setHarSendtTilbakemelding(true);
                        }}
                        aria-labelledby="lærte-du-noe-nytt-panel__spørsmål-id lærte-du-noe-nytt-panel__nei-knapp-id"
                    >
                        <span id="lærte-du-noe-nytt-panel__nei-knapp-id">NEI</span>
                    </Knapp>
                </div>
            </div>
        );
    } else {
        return (
            <div className="lærte-du-noe-nytt-panel">
                <Element className="lærte-du-noe-nytt-panel__overskrift">
                    Takk for tilbakemeldingen din
                </Element>
                <Undertekst className="lærte-du-noe-nytt-panel__takk">
                    {ANONYM_TILBAKEMELDING_INFOTEKST}
                </Undertekst>
            </div>
        );
    }
};
