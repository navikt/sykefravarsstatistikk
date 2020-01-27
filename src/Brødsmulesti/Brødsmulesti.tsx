import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { Link, useLocation } from 'react-router-dom';
import { PATH_FORSIDE } from '../App';
import { Normaltekst } from 'nav-frontend-typografi';

const Brødsmulesti: FunctionComponent = () => {
    const location = useLocation();

    return (
        <Normaltekst tag="nav" className="brødsmulesti">
            <ol className="brødsmulesti__liste">
                <li>
                    <Link
                        to={{
                            pathname: PATH_FORSIDE,
                            search: location.search,
                        }}
                        className="brødsmulesti__lenke"
                    >
                        Sykefraværsstatistikk
                    </Link>
                </li>{' '}
                / <li>Kostnadskalkulator</li>
            </ol>
        </Normaltekst>
    );
};

export default Brødsmulesti;
