import React, { FunctionComponent, ReactElement } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';

interface Props {
    onChange: (event: any) => void;
    onClick: (event: any) => void;
    value: number | undefined;
    label: string;
    hjelpetekst?: string | ReactElement;
    placeholder?: string;
}

export const Kalkulatorrad: FunctionComponent<Props> = (props) => {
    // TODO Label er ikke knyttet til input-feltet
    return (
        <div className="kalkulator__rad">
            <Element className="kalkulator__label_fast_størrelse">{props.label}</Element>
            <Input
                label={''}
                onChange={props.onChange}
                onClick={props.onClick}
                value={props.value || ''}
                bredde={'XS'}
                maxLength={15}
                type="number"
                className="kalkulator__input"
                placeholder={props.placeholder}
            />
            {props.hjelpetekst && (
                <Hjelpetekst>
                    <Normaltekst className="kalkulator__hjelpetekst-innhold">
                        {props.hjelpetekst}
                    </Normaltekst>
                </Hjelpetekst>
            )}
        </div>
    );
};
