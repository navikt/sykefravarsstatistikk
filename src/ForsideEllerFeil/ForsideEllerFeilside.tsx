import React, {FunctionComponent, useContext} from 'react';
import {RestSammenligningContext, Status} from '../SammenligningProvider';
import ManglerRettigheterIAltinnSide from "../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide";
import Forside from "../Forside/Forside";

const ForsideEllerFeilside: FunctionComponent = () => {
    const sammenligningWithStatusContext = useContext(RestSammenligningContext);

    const renderForsideEllerFeilside = () => {
        if (sammenligningWithStatusContext.status === Status.Suksess) {
            return <Forside/>
        } else if (sammenligningWithStatusContext.status === Status.Feil) {
            console.log(sammenligningWithStatusContext.status);
            return <ManglerRettigheterIAltinnSide/>
        }
    };

    return (
        <div>
            {renderForsideEllerFeilside()}
        </div>);
};

export default ForsideEllerFeilside;

