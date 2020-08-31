import React, { FunctionComponent, useRef } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useSendEvent } from '../../amplitude/amplitude';

interface Props {
    tekst: string;
    område: string;
}
export const TilbakemeldingerMedKnapper: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const harSendtTilbakeMelding = useRef(false);
    const knapper = (
        <>
            <Knapp
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-JA', 'klikk');
                    harSendtTilbakeMelding.current = true;
                }}
            >
                JA
            </Knapp>
            <Knapp
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-NEI', 'klikk');
                    harSendtTilbakeMelding.current = true;
                }}
            >
                NEI
            </Knapp>
        </>
    );

    return (
        <>
            <Ingress>{props.tekst}</Ingress>
            {console.log(harSendtTilbakeMelding.current)}
            {harSendtTilbakeMelding ? knapper : <Ingress>Takk</Ingress>}
        </>
    );
};
