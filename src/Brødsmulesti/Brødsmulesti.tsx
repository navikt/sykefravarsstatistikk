import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import { Link, useLocation } from 'react-router-dom';
import { PATH_FORSIDE } from '../App';
import Lenke from 'nav-frontend-lenker';

interface Props {
    gjeldendeSide: 'sykefraværsstatistikk' | 'kalkulator';
}

const Brødsmulesti: FunctionComponent<Props> = props => {
    const location = useLocation();

    const minSideArbeidsgiver = (
        <li>
            <Lenke href={'/min-side-arbeidsgiver/' + location.search}>
                Min side – arbeidsgiver
            </Lenke>
        </li>
    );
    const lenketekstSykefraværsstatistikk = 'Sykefraværsstatistikk';
    const divider = <div className="brødsmulesti__divider">/</div>;

    let lenker;
    if (props.gjeldendeSide === 'sykefraværsstatistikk') {
        lenker = (
            <>
                {minSideArbeidsgiver}
                {divider}
                {lenketekstSykefraværsstatistikk}
            </>
        );
    } else if (props.gjeldendeSide === 'kalkulator') {
        lenker = (
            <>
                {minSideArbeidsgiver}
                {divider}
                <Link
                    to={{
                        pathname: PATH_FORSIDE,
                        search: location.search,
                    }}
                    className="brødsmulesti__lenke"
                >
                    {lenketekstSykefraværsstatistikk}
                </Link>
                {divider} Kostnadskalkulator
            </>
        );
    }

    return (
        <nav className="brødsmulesti">
            <ol className="brødsmulesti__liste">{lenker}</ol>
        </nav>
    );
};

export default Brødsmulesti;
