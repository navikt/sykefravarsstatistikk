import React, { useContext } from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { OrganisasjonstreContext } from '../OrganisasjonstreProvider/OrganisasjonstreProvider';
import { JuridiskEnhetMedUnderEnheterArray } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { AltinnOrganisasjon, Organisasjon, Organisasjonstre } from '../OrganisasjonstreProvider/organisasjonstre-utils';

interface Props {
    tekst: string;
}

const mapTilAltinnOrganisasjon = (organisasjon: Organisasjon): AltinnOrganisasjon => {
    return {
        Name: organisasjon.navn,
        Type: 'UNKNOWN_TYPE',
        OrganizationNumber: organisasjon.orgnr,
        OrganizationForm: 'UNKNOWN_FORM',
        Status: 'UNKNOWN_STATUS',
        ParentOrganizationNumber: 'UNKNOWN NUMBER',
    };
};

const mapTilJuridiskEnhetMedUnderEnheterArray = (organisasjonstre: Organisasjonstre): JuridiskEnhetMedUnderEnheterArray[] => {
    return organisasjonstre.map(juridiskEnhetMedUnderenheter => {
        return {
            JuridiskEnhet: mapTilAltinnOrganisasjon(juridiskEnhetMedUnderenheter.juridiskEnhet),
            Underenheter: juridiskEnhetMedUnderenheter.underenheter.map(org => mapTilAltinnOrganisasjon(org))
        } as JuridiskEnhetMedUnderEnheterArray;
    });
};

const Banner: React.FunctionComponent<Props & RouteComponentProps> = props => {
    const organisasjonstre = useContext(OrganisasjonstreContext);
    return (
        <Bedriftsmeny
            sidetittel="Sykefraværsstatistikk"
            history={props.history}
            onOrganisasjonChange={() => {}}
            organisasjonstre={mapTilJuridiskEnhetMedUnderEnheterArray(organisasjonstre)}
        />
    );
};

export default withRouter(Banner);
