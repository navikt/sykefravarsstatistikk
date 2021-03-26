import { FunctionComponent, useEffect } from 'react';
import {
    BrødsmulestiConfig,
    defaultBrødsmulestiConfig,
    finnBrødsmule,
    getBrødsmulesti,
    medOrgnrQuery,
} from './brødsmulesti-utils';
import { setBreadcrumbs, onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { useOrgnr } from '../utils/orgnr-hook';
import { useHistory } from 'react-router-dom';
import { BASE_PATH } from '../konstanter';

interface Props {
    gjeldendeSide: string;
    config?: BrødsmulestiConfig;
}

const Brødsmulesti: FunctionComponent<Props> = (props) => {
    const { gjeldendeSide } = props;
    const history = useHistory();
    const orgnr = useOrgnr();

    useEffect(() => {
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
    }, [props.config, gjeldendeSide, history, orgnr]);

    return null;
};

export default Brødsmulesti;
