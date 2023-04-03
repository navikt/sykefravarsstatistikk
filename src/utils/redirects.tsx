import { FunctionComponent, useContext } from 'react';
import { EnvironmentContext } from '../Context/EnvironmentContext';
import { PATH_KALKULATOR_REDIRECT } from '../konstanter';

export const KalkulatorRedirect: FunctionComponent = () => {
    const { FOREBYGGE_FRAVÆR_URL } = useContext(EnvironmentContext);
    window.location.replace(FOREBYGGE_FRAVÆR_URL + PATH_KALKULATOR_REDIRECT);
    return null;
};

export const ManglerRettighetRedirect: FunctionComponent = () => {
    const { MIN_SIDE_ARBEIDSGIVER_URL } = useContext(EnvironmentContext);
    window.location.replace(MIN_SIDE_ARBEIDSGIVER_URL);
    return null;
};
