import * as React from 'react';
import './Forside.less';

const Forside: React.FunctionComponent = props => {
    return (
        <div className="forside__wrapper">
            <div className="forside">{props.children}</div>
        </div>
    );
};

export default Forside;
