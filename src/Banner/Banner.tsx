import React from 'react';
import './Banner.less';
import {Sidetittel} from 'nav-frontend-typografi';

interface Props {
    tekst: string;
}

const Banner: React.FunctionComponent<Props> = props => {
    return (
        <div className="banner">
            <div className="banner__innhold">
                <Sidetittel className="banner__tekst">{props.tekst}</Sidetittel>
            </div>
        </div>
    );
};

export default Banner;
