import { default as React, FunctionComponent } from 'react';
import { Loader } from "@navikt/ds-react";
import './Lasteside.less';

const Lasteside: FunctionComponent = () => {
    return (
        <div className="lasteside">
            <Loader size="2xlarge" />
        </div>
    );
};

export default Lasteside;
