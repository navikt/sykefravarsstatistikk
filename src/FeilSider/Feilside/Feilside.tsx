import React, { FunctionComponent } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './Feilside.less';
import classNames from 'classnames';

interface Props {
    className?: string;
}

const Feilside: FunctionComponent<Props> = props => {
    return (
        <div className={classNames('feilside', props.className)}>
            <AlertStripe type="feil" className="feilside__alertstripe">
                {props.children}
            </AlertStripe>
        </div>
    );
};

export default Feilside;
