import React from 'react';
import './Banner.less';
import { Sidetittel } from 'nav-frontend-typografi';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

interface Props {
    tekst: string;
}

export interface Organisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string;
}

export interface JuridiskEnhetMedUnderEnheterArray {
    JuridiskEnhet: Organisasjon;
    Underenheter: Array<Organisasjon>;
}

export const tomAltinnOrganisasjon: Organisasjon = {
    Name: '',
    Type: '',
    OrganizationNumber: '',
    OrganizationForm: '',
    Status: '',
    ParentOrganizationNumber: '',
};

const liste: JuridiskEnhetMedUnderEnheterArray[] = [
    {
        JuridiskEnhet: {
            Name: 'BALLSTAD OG HAMARØY',
            Type: 'Business',
            OrganizationNumber: '811076732',
            ParentOrganizationNumber: '811076112',
            OrganizationForm: 'BEDR',
            Status: 'Active',
        },
        Underenheter: [
            {
                Name: 'BALLSTAD OG HORTEN',
                Type: 'Enterprise',
                ParentOrganizationNumber: '811076732',
                OrganizationNumber: '811076112',
                OrganizationForm: 'AS',
                Status: 'Active',
            },
            {
                Name: 'DIGITAL JUNKIES AS ',
                Type: 'Enterprise',
                OrganizationNumber: '822565212',
                ParentOrganizationNumber: '811076732',
                OrganizationForm: 'AS',
                Status: 'Active',
            },
            {
                Name: 'DIGITAL JUNKIES AS ',
                Type: 'Business',
                OrganizationNumber: '922658986',
                ParentOrganizationNumber: '822565212',
                OrganizationForm: 'BEDR',
                Status: 'Active',
            },
            {
                Name: 'NAV ENGERDAL',
                Type: 'Business',
                ParentOrganizationNumber: '874652202',
                OrganizationNumber: '991378642',
                OrganizationForm: 'BEDR',
                Status: 'Active',
            },
            {
                Name: 'NAV HAMAR',
                Type: 'Business',
                ParentOrganizationNumber: '874652202',
                OrganizationNumber: '990229023',
                OrganizationForm: 'BEDR',
                Status: 'Active',
            },
        ],
    },
];

const Banner: React.FunctionComponent<Props & RouteComponentProps> = props => {
    return (
        <Bedriftsmeny
            sidetittel="Sykefraværsstatistikk"
            history={props.history}
            onOrganisasjonChange={() => {}}
            organisasjonstre={liste}
        />
    );
};

export default withRouter(Banner);
