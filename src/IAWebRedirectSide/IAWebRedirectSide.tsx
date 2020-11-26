import * as React from 'react';
import '../Forside/Forside.less';
import { RestSykefraværshistorikk } from '../api/kvartalsvisSykefraværshistorikk';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const IAWebRedirectSide: React.FunctionComponent<Props> = (props) => {
    return (
        <div className="forside__wrapper">
            <div className="forside">{props.children}</div>
        </div>
    );
};

export default IAWebRedirectSide;
