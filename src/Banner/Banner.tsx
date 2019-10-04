import React, { useContext } from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { OrganisasjonstreContext } from '../OrganisasjonstreProvider/OrganisasjonstreProvider';
import { JuridiskEnhetMedUnderEnheterArray } from '@navikt/bedriftsmeny/lib/Organisasjon';

interface Props {
    tekst: string;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = props => {
    const organisasjonstre = useContext(OrganisasjonstreContext);
    return (
        <Bedriftsmeny
            sidetittel="Sykefraværsstatistikk"
            history={props.history}
            onOrganisasjonChange={() => {}}
            organisasjonstre={organisasjonstre as JuridiskEnhetMedUnderEnheterArray[]}
        />
    );
};

export default withRouter(Banner);
