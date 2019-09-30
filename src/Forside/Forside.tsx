import * as React from 'react';
import Infopanel from './Infopanel/Infopanel';
import './Forside.less';
import IAwebpanel from './IAwebpanel/IAwebpanel';
import LegemeldtSykefraværPanel from './Legemeldtsykefraværpanel/LegemeldtSykefraværPanel';

const Forside: React.FunctionComponent = () => {
    return (
        <div className="forside">
            <Infopanel />
            <LegemeldtSykefraværPanel />
            <IAwebpanel />
        </div>
    );
};

export default Forside;
