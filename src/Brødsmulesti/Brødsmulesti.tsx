import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { Link, useLocation } from 'react-router-dom';
import { PATH_FORSIDE } from '../App';

const Brødsmulesti: FunctionComponent = () => {
    const location = useLocation();

    return (
        <nav className="brødsmulesti">
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
        </nav>
    );
};

export default Brødsmulesti;
