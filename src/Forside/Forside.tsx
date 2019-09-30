import * as React from 'react';
import Infopanel from '../Infopanel/Infopanel';
import './Forside.less';
import IAwebpanel from '../IAwebpanel/IAwebpanel';
import LegemeldtSykefravarPanel from '../Legemeldtsykefravarpanel/LegemeldtSykefravarPanel';

const Forside: React.FunctionComponent = () => {
    return (
        <div className="forside">
            <Infopanel />
            <LegemeldtSykefravarPanel />
            <IAwebpanel />
        </div>
    );
};

export default Forside;
