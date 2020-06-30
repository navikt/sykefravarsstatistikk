import React, { FunctionComponent, ReactElement } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './KalkulatorradNy.less';

interface Props {
    onChange: (event: any) => void;
    onClick: (event: any) => void;
    value: number | undefined;
    label: string;
    name: string;
    hjelpetekst?: string | ReactElement;
    placeholder?: string;
    visSpinner?: boolean;
    step?: number;
}

export const KalkulatorradNy: FunctionComponent<Props> = (props) => {
    const labelId = props.name + '-label';
    return (
        <div className="kalkulatorrad">
            <Element id={labelId} className="kalkulatorrad_label">
                {props.label}
            </Element>
            <div className="kalkulatorrad__input-hjelpetekst-wrapper">
                <Input
                    label=""
                    onChange={props.onChange}
                    onClick={props.onClick}
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
                {props.hjelpetekst && (
                    <Hjelpetekst className="kalkulatorrad__hjelpetekst">
                        <Normaltekst className="kalkulatorrad__hjelpetekst-innhold">
                            {props.hjelpetekst}
                        </Normaltekst>
                    </Hjelpetekst>
                )}
            </div>
        </div>
    );
};
