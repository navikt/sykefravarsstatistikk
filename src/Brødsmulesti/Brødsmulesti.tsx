import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import {
    BrødsmulestiConfig,
    defaultBrødsmulestiConfig,
    finnBrødsmule,
    getBrødsmulesti, medOrgnrQuery,
} from './brødsmulesti-utils';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useOrgnr } from '../utils/orgnr-hook';
import { useHistory } from 'react-router-dom';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler/dist';
import { BASE_PATH } from '../konstanter';

interface Props {
    gjeldendeSide: string;
    config?: BrødsmulestiConfig;
}

const Brødsmulesti: FunctionComponent<Props> = (props) => {
    const { gjeldendeSide } = props;
    const history = useHistory();
    const orgnr = useOrgnr();

    const config = props.config
        ? { ...defaultBrødsmulestiConfig, ...props.config }
        : defaultBrødsmulestiConfig;

    const gjeldendeSmule = finnBrødsmule(gjeldendeSide, config);

    const brødsmulesti = getBrødsmulesti(gjeldendeSmule, config);

    setBreadcrumbs(
        brødsmulesti.map((smule) => ({
            url: medOrgnrQuery(smule.href, orgnr),
            title: smule.lenketekst,
            handleInApp: smule.handleMedReactRouter,
        }))
    );

    onBreadcrumbClick((breadcrumb) => {
        history.push(breadcrumb.url.replace(BASE_PATH, ''));
    });

    return null;
};

export default Brødsmulesti;
