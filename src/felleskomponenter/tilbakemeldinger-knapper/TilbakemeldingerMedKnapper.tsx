import React, { FunctionComponent } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    tekst: String;
    onClickJA?: (e: any) => any;
    onClickNEI?: (e: any) => any;
}
export const TilbakemeldingerMedKnapper: FunctionComponent<Props> = (props) => {
    return (
        <>
            <Ingress>{props.tekst}</Ingress>
            <Knapp onClick={props.onClickJA}>JA</Knapp>
            <Knapp onClick={props.onClickNEI}>NEI</Knapp>
        </>
    );
};
