import React from 'react';
import informasjonsirkelSvg from './informasjon-sirkel.svg';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './ManglerRettigheterIAltinnSide.less';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { OrganisasjonerMedTilgangListe } from './OrganisasjonerMedTilgangListe/OrganisasjonerMedTilgangListe';
import { BeOmTilgang } from './BeOmTilgang/BeOmTilgang';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

interface Props {
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

export const ManglerRettigheterIAltinnSide: React.FunctionComponent<Props> = ({
    restOrganisasjonerMedStatistikk,
}) => {
    return (
        <div className="mangler-rettigheter-i-altinn__wrapper">
            <div className="mangler-rettigheter-i-altinn">
                <div className="mangler-rettigheter-i-altinn__tekst_og_ikon">
                    <img
                        src={informasjonsirkelSvg}
                        className="mangler-rettigheter-i-altinn__tekst_og_ikon__ikon"
                        alt="altinn-logo"
                    />
                    <Systemtittel tag="h2">Du mangler rettigheter i Altinn</Systemtittel>
                </div>

                <Normaltekst className="mangler-rettigheter-i-altinn__overskrift">
                    Du har ikke Altinn-tilgangen du trenger for å se sykefraværsstatistikk for denne
                    virksomheten. Bytt til en virksomhet der du har tilgang eller be om tilgang i
                    Altinn for denne virksomheten.
                </Normaltekst>
                <BeOmTilgang />

                <OrganisasjonerMedTilgangListe
                    restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                />
                <Element className="mangler-rettigheter-i-altinn__mer-info">
                    Lenker til mer informasjon
                </Element>
                <EksternLenke
                    className="mangler-rettigheter-i-altinn__lenke"
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
                >
                    Les mer om hvordan tilgangsstyringen i Altinn fungerer
                </EksternLenke>
            </div>
        </div>
    );
};
