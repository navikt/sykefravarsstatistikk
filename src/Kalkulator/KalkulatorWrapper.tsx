import React, { FunctionComponent, useEffect, useState } from 'react';
import './Kalkulator.less';
import { hentRestTapteDagsverk } from '../api/api';
import { useOrgnr } from '../utils/orgnr-hook';
import { RestTapteDagsverk } from '../api/tapteDagsverk';
import { RestStatus } from '../api/api-utils';
import Kalkulator from './Kalkulator';

const KalkulatorWrapper: FunctionComponent = () => {
    const [restTapteDagsverk, setRestTapteDagsverk] = useState<RestTapteDagsverk>({
        status: RestStatus.IkkeLastet,
    });

    const orgnr = useOrgnr();

    useEffect(() => {
        const hentTapteDagsverkOgSettState = async () => {
            if (orgnr && restTapteDagsverk.status === RestStatus.IkkeLastet) {
                setRestTapteDagsverk(await hentRestTapteDagsverk(orgnr));
            }
        };
        hentTapteDagsverkOgSettState();
    }, [orgnr, restTapteDagsverk]);

    return <Kalkulator defaultTapteDagsverk={restTapteDagsverk} />;
};
export default KalkulatorWrapper;
