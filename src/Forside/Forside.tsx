import * as React from 'react';
import Infopanel from '../Infopanel/Infopanel';
import './Forside.less';
import IAwebpanel from '../IAwebpanel/IAwebpanel';

const Forside: React.FunctionComponent = () => {
    return (
        <div className="forside">
            <Infopanel />
            <IAwebpanel />
        </div>
    );
};

export default Forside;
