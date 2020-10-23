import * as React from 'react';
import { useEffect, useState } from 'react';
import Tommelopp from './tommelopp.png';
import Tommelopp_likt from './tommelopp-likt.png';
import { Normaltekst } from 'nav-frontend-typografi';
import './LikeTommel.less';

interface Props {
    kleintID?: string;
    tipsID?: string;
}
const LikeTommel = (props: Props) => {
    const [likt, setLikt] = useState<boolean>(false);
    useEffect(() => {}, []);
    return (
        <>
            <div className="liketommel">
                {' '}
                {!likt ? (
                    <button onClick={() => setLikt(!likt)} className="liketommel__bilde">
                        <img src={Tommelopp} alt="Forhåndsvisning av video" />
                    </button>
                ) : (
                    <button onClick={() => setLikt(!likt)} className="liketommel__bilde">
                        <img src={Tommelopp_likt} alt="" />
                    </button>
                )}
                <Normaltekst tag="span">Er dette relevant for din situasjon?</Normaltekst>
            </div>
        </>
    );
};

export default LikeTommel;
