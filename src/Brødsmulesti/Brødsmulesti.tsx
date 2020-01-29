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

    const minSideArbeidsgiverLenketekst = 'Min side – arbeidsgiver';
    const sykefraværsstatistikkLenketekst = 'Sykefraværsstatistikk';
    const kalkulatorLenketekst = 'Kostnadskalkulator';

    const minSideArbeidsgiverLenke = (
        <Lenke href={'/min-side-arbeidsgiver/' + location.search}>{minSideArbeidsgiverLenketekst}</Lenke>
    );

    let listeMedLenker;
    if (props.gjeldendeSide === 'sykefraværsstatistikk') {
        listeMedLenker = (
            <>
                <li>{minSideArbeidsgiverLenke}</li>
                <li>{sykefraværsstatistikkLenketekst}</li>
            </>
        );
    } else if (props.gjeldendeSide === 'kalkulator') {
        listeMedLenker = (
            <>
                <li>{minSideArbeidsgiverLenke}</li>
                <li>
                    <Link
                        to={{
                            pathname: PATH_FORSIDE,
                            search: location.search,
                        }}
                        className="brødsmulesti__lenke"
                    >
                        {sykefraværsstatistikkLenketekst}
                    </Link>
                </li>
                <li>{kalkulatorLenketekst}</li>
            </>
        );
    }

    return (
        <nav className="brødsmulesti">
            <ol className="brødsmulesti__liste">{listeMedLenker}</ol>
        </nav>
    );
};

export default Brødsmulesti;
