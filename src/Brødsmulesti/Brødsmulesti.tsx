import React, { FunctionComponent } from 'react';
import './Brødsmulesti.less';
import {
    BrødsmulestiConfig,
    defaultBrødsmulestiConfig,
    finnBrødsmule,
    getBrødsmulesti,
} from './brødsmulesti-utils';
import TilbakeTilForrigeBrødsmule from './TilbakeTilForrigeBrødsmule/TilbakeTilForrigeBrødsmule';
import ListeMedBrødsmuler from './ListeMedBrødsmuler/ListeMedBrødsmuler';
import MediaQuery from 'react-responsive';
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
            url: smule.href(orgnr),
            title: smule.lenketekst,
            handleInApp: true,
        }))
    );

    onBreadcrumbClick((breadcrumb) => {
        console.log('push', breadcrumb);
        history.push(breadcrumb.url.replace(BASE_PATH, ''));
    });

    return (
        <>
            <MediaQuery minWidth={768}>
                <nav className="brødsmulesti" aria-label="brødsmulesti">
                    <ListeMedBrødsmuler gjeldendeBrødsmule={gjeldendeSmule} config={config} />
                </nav>
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                <nav className="brødsmulesti">
                    <TilbakeTilForrigeBrødsmule
                        gjeldendeBrødsmule={gjeldendeSmule}
                        config={config}
                    />
                </nav>
            </MediaQuery>
        </>
    );
};

export default Brødsmulesti;
