import React, {FunctionComponent, useContext} from 'react';
import {RestSammenligningContext, RestSammenligningStatus} from '../SammenligningProvider';
import ManglerRettigheterIAltinnSide from "../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide";
import Forside from "../Forside/Forside";

const ForsideEllerFeilside: FunctionComponent = () => {
    const sammenligningWithStatusContext = useContext(RestSammenligningContext);

    const renderForsideEllerFeilside = () => {
        if (sammenligningWithStatusContext.status === RestSammenligningStatus.Suksess) {
            return <Forside/>
        } else if (sammenligningWithStatusContext.status === RestSammenligningStatus.HarIkkeRettigheterIAltinn) {
            return <ManglerRettigheterIAltinnSide/>
        } else if (sammenligningWithStatusContext.status === RestSammenligningStatus.Error) {
            return <Forside/>
        }
    };

    return (
        <div>
            {renderForsideEllerFeilside()}
        </div>);
};

export default ForsideEllerFeilside;

