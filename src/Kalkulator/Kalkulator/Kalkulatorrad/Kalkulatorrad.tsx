import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { Input } from "nav-frontend-skjema";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import NavFrontendSpinner from "nav-frontend-spinner";
import "./Kalkulatorrad.less";
import { sendInputfeltUtfyltEvent } from "../../../amplitude/events";
import classNames from "classnames";
import { IaTjenesteKilde, useSendIaTjenesteMetrikkMottattEvent } from "../../../metrikker/iatjenester";

interface Props {
    onChange: (event: any) => void;
    value: number | undefined;
    label: string;
    name: string;
    hjelpetekst?: string | ReactElement;
    placeholder?: string;
    visSpinner?: boolean;
    step?: number;
}

export const Kalkulatorrad: FunctionComponent<Props> = (props) => {
    const labelId = props.name + '-label';
    const [sendKalkulatorMetrikker, setSendKalkulatorMetrikker] = useState<boolean>(false);

    const sendIaTjensterKalkulatorMetrikker = useSendIaTjenesteMetrikkMottattEvent(
      IaTjenesteKilde.KALKULATOR,
      sendKalkulatorMetrikker
    );

    useEffect(() => {
        return sendIaTjensterKalkulatorMetrikker;
    }, [sendIaTjensterKalkulatorMetrikker, sendKalkulatorMetrikker]);

    return (
        <div className="kalkulatorrad">
            <Element id={labelId}>{props.label}</Element>
            <div
                className={
                    props.hjelpetekst
                        ? 'kalkulatorrad__input-hjelpetekst-wrapper'
                        : classNames(
                              'kalkulatorrad__input-hjelpetekst-wrapper',
                              'kalkulatorrad__input-no-hjelpetekst-wrapper'
                          )
                }
            >
                <Input
                    label=""
                    onChange={(event: any) => {
                        props.onChange(event);
                        sendInputfeltUtfyltEvent(props.label, props.name);
                        setSendKalkulatorMetrikker(true);
                    }}
                    value={props.value || ''}
                    type="number"
                    className="kalkulatorrad__input"
                    placeholder={props.placeholder || '0'}
                    step={props.step}
                    aria-labelledby={labelId}
                />
                {props.visSpinner && (
                    <NavFrontendSpinner className="kalkulatorrad__spinner" transparent={true} />
                )}
                <div className={'kalkulatorrad__hjelpetekst_wrapper'}>
                    {props.hjelpetekst && (
                        <Hjelpetekst className="kalkulatorrad__hjelpetekst">
                            <Normaltekst className="kalkulatorrad__hjelpetekst-innhold">
                                {props.hjelpetekst}
                            </Normaltekst>
                        </Hjelpetekst>
                    )}
                </div>
            </div>
        </div>
    );
};
