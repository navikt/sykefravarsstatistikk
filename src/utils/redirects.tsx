import React, { FunctionComponent } from 'react';
import { Bransjetype, RestBedriftsmetrikker } from '../api/bedriftsmetrikker';
import { Redirect, useLocation } from 'react-router-dom';
import { RestStatus } from '../api/api-utils';
import { PATH_FORSIDE_BARNEHAGE, PATH_FORSIDE_VANLIG } from '../App';

export const BarnehageRedirect: FunctionComponent<{
    restBedriftsmetrikker: RestBedriftsmetrikker;
}> = ({ restBedriftsmetrikker }) => {
    const location = useLocation();
    if (restBedriftsmetrikker.status !== RestStatus.Suksess) {
        return null;
    }
    if (restBedriftsmetrikker.data.bransje !== Bransjetype.BARNEHAGER) {
        return null;
    }
    return <Redirect to={PATH_FORSIDE_BARNEHAGE + location.search} />;
};

export const VanligForsideRedirect: FunctionComponent<{
    restBedriftsmetrikker: RestBedriftsmetrikker;
}> = ({ restBedriftsmetrikker }) => {
    const location = useLocation();
    if (restBedriftsmetrikker.status !== RestStatus.Suksess) {
        return null;
    }
    if (restBedriftsmetrikker.data.bransje === Bransjetype.BARNEHAGER) {
        return null;
    }
    return <Redirect to={PATH_FORSIDE_VANLIG + location.search} />;
};
