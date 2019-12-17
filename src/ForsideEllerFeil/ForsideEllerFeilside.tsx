import React, {FunctionComponent, useContext} from 'react';
import {RestSammenligningContext, RestSammenligningStatus} from '../SammenligningProvider';
import ManglerRettigheterIAltinnSide from "../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide";
import IkkeInnloggetSide from "../FeilSider/IkkeInnloggetSide/IkkeInnloggetSide";
import Forside from "../Forside/Forside";

const ForsideEllerFeilside: FunctionComponent = () => {
    const sammenligningWithStatusContext = useContext(RestSammenligningContext);

    const renderForsideEllerFeilside = () => {
        switch (sammenligningWithStatusContext.status) {
            case RestSammenligningStatus.HarIkkeRettigheterIAltinn: {
                return <ManglerRettigheterIAltinnSide/>
            }
            case RestSammenligningStatus.IkkeInnlogget: {
                return <IkkeInnloggetSide/>
            }
            case RestSammenligningStatus.LasterInn: {
                return null;
            }
            default: {
                return <Forside/>
            }
        }
    };

    return (
        <div>
            {renderForsideEllerFeilside()}
        </div>);

}

export default ForsideEllerFeilside;