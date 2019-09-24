import * as React from 'react';
import Infopanel from '../Infopanel/Infopanel';
import './Forside.less';
import IAwebpanel from '../IAwebpanel/IAwebpanel';
import Legemeldtsykefravarpanel from '../Legemeldtsykefravarpanel/Legemeldtsykefravarpanel';

const Forside: React.FunctionComponent = () => {
    return (
        <div className="forside">
            <Infopanel />
            <Legemeldtsykefravarpanel />
            <IAwebpanel />
        </div>
    );
};

export default Forside;
