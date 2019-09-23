import * as React from 'react';
import Infopanel from '../Infopanel/Infopanel';
import './Forside.less';
import IAwebpanel from '../IAwebpanel/IAwebpanel';
import Legemeldtsykefravarpanel from '../Legemeldtsykefravarpanel/Legemeldtsykefravarpanel';
import { Sykefraværprosent } from '../SykefraværprosentProvider';


const Forside: React.FunctionComponent<Sykefraværprosent> = sykefraværprosent => {
    return (
        <div className="forside">
            <Infopanel />
            <Legemeldtsykefravarpanel
                kvartal={sykefraværprosent.kvartal}
                land={sykefraværprosent.land}
            />
            <IAwebpanel />
        </div>
    );
};

export default Forside;
