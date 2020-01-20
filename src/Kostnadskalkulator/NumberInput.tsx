import React, { FunctionComponent } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

interface Props {
    label: string;
    value: number|undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: FunctionComponent<Props> = props => {
    const brukOnChangeHvisVerdiErTall = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) > 0) {
            props.onChange(event);
        }
    };
    return (
        <Input
            value={props.value}
            label={<Element>Antall tapte dagsverk</Element>}
            onChange={brukOnChangeHvisVerdiErTall}
        />
    );
};

export default  NumberInput;
