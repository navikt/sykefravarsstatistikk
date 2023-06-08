import React from 'react';
import informasjonsirkelSvg from './informasjon-sirkel.svg';
import './ManglerRettigheterIAltinnSide.less';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { OrganisasjonerMedTilgangListe } from './OrganisasjonerMedTilgangListe/OrganisasjonerMedTilgangListe';
import { BeOmTilgang } from './BeOmTilgang/BeOmTilgang';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { BodyShort, Heading } from "@navikt/ds-react";

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
                    <Heading level="2" size={"medium"}>Du mangler rettigheter i Altinn</Heading>
                </div>

                <BodyShort className="mangler-rettigheter-i-altinn__overskrift">
                    Du har ikke Altinn-tilgangen du trenger for å se sykefraværsstatistikk for denne
                    virksomheten. Bytt til en virksomhet der du har tilgang eller be om tilgang i
                    Altinn for denne virksomheten.
                </BodyShort>
                <BeOmTilgang />

                <OrganisasjonerMedTilgangListe
                    restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                />
                <EksternLenke
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
                >
                    Les mer om hvordan tilgangsstyringen i Altinn fungerer
                </EksternLenke>
            </div>
        </div>
    );
};
