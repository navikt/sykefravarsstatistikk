import React, { FunctionComponent, useRef, useState } from 'react';
import { Ingress, Undertekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useSendEvent } from '../../amplitude/amplitude';

interface Props {
    tekst: string;
    område: string;
}
export const TilbakemeldingerMedKnapper: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    //const harSendtTilbakeMelding = useRef(false);
    const [harSendtTilbakemeldingState, setharSendtTilbakemeldingState] = useState<boolean>(false);
    const knapper = (
        <>
            <Knapp
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-JA', 'klikk');
                    //harSendtTilbakeMelding.current = true;
                    setharSendtTilbakemeldingState(true);
                    //console.log(harSendtTilbakeMelding.current);
                }}
            >
                JA
            </Knapp>
            <Knapp
                onClick={() => {
                    sendEvent('Lærte du noe nytt-' + props.område + '-NEI', 'klikk');
                    //harSendtTilbakeMelding.current = true;
                    setharSendtTilbakemeldingState(true);
                }}
            >
                NEI
            </Knapp>
        </>
    );

    return (
        <>
            <Ingress>{props.tekst}</Ingress>
            <Undertekst>
                Vi ønsker å forstå om det var nyttig å se tallene dine på denne måten.
            </Undertekst>
            {!harSendtTilbakemeldingState ? (
                knapper
            ) : (
                <Ingress>Takk for din tilbakemelding</Ingress>
            )}
        </>
    );
};
