import React, { FunctionComponent, useState } from 'react';
import {Element, Ingress, Normaltekst, Undertekst} from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useSendEvent } from '../../amplitude/amplitude';
import './LærteDuNoeNyttPanel.less';

interface Props {
    tekst: string;
    område: string;
}

export const LærteDuNoeNyttPanel: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const [harSendtTilbakemeldingState, setharSendtTilbakemeldingState] = useState<boolean>(false);
    const knapper = (
        <div className="lærte-du-noe-nytt-panel__knapp-wrapper">
            <Knapp className="lærte-du-noe-nytt-panel__knapp"
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
                <Element className="lærte-du-noe-nytt-panel__spørsmål">{props.tekst}</Element>
            ): null
            }


            {/*
                <Undertekst>
                    Vi ønsker å forstå om det var nyttig å se tallene dine på denne måten.
                </Undertekst>

            */}
            {!harSendtTilbakemeldingState ? (
                knapper
            ) : (
                <Undertekst className="lærte-du-noe-nytt-panel__takk">Takk for tilbakemeldingen din</Undertekst>
            )}
        </div>
    );
};
