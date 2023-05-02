import { FunctionComponent, useContext } from 'react';
import { EnvironmentContext } from '../Context/EnvironmentContext';

export const ManglerRettighetRedirect: FunctionComponent = () => {
    const { MIN_SIDE_ARBEIDSGIVER_URL } = useContext(EnvironmentContext);
    window.location.replace(MIN_SIDE_ARBEIDSGIVER_URL);
    return null;
};
