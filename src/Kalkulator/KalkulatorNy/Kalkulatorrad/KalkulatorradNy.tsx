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
    hjelpetekst?: string | ReactElement;
    placeholder?: string;
    visSpinner?: boolean;
    step?: number;
}

export const KalkulatorradNy: FunctionComponent<Props> = (props) => {
    // TODO Label er ikke knyttet til input-feltet
    return (
        <div className="kalkulatorrad">
            <Element className="kalkulatorrad_label">{props.label}</Element>
            <Input
                label={''}
                onChange={props.onChange}
                onClick={props.onClick}
                value={props.value || ''}
                bredde={'XS'}
                maxLength={15}
                type="number"
                className="kalkulatorrad__input"
                placeholder={props.placeholder || '0'}
                step={props.step}
            />
            {props.visSpinner && (
                <NavFrontendSpinner className="kalkulatorrad__spinner" transparent={true} />
            )}
            {props.hjelpetekst && (
                <Hjelpetekst>
                    <Normaltekst className="kalkulatorrad__hjelpetekst-innhold">
                        {props.hjelpetekst}
                    </Normaltekst>
                </Hjelpetekst>
            )}
        </div>
    );
};
