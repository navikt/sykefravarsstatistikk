import React from 'react';
import informasjonsirkelSvg from './informasjon-sirkel.svg';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './ManglerRettigheterIAltinnSide.less';
import Lenke from 'nav-frontend-lenker';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
interface Props {
    restOrgannisasjoner?: RestAltinnOrganisasjoner;
}

const ManglerRettigheterIAltinnSide: React.FunctionComponent<Props> = props => {
    console.log(props.restOrgannisasjoner?.status);
    console.log(props.restOrgannisasjoner);
    return (
        <div className="mangler-rettigheter-i-altinn__wrapper">
            <div className="mangler-rettigheter-i-altinn">
                <div className="mangler-rettigheter-i-altinn__tekst_og_ikon">
                    <img
                        src={informasjonsirkelSvg}
                        className="mangler-rettigheter-i-altinn__tekst_og_ikon__ikon"
                        alt=""
                    />
                    <Systemtittel tag="h2">Du mangler rettigheter i Altinn</Systemtittel>
                </div>

                <Normaltekst className="mangler-rettigheter-i-altinn__overskrift">
                    Du har ikke Altinn-tilgangen du trenger for å se Sykefraværsstatistikk for denne
                    virksomheten. Bytt til en virksomhet der du har tilgang eller be om tilgang i
                    Altinn for denne virksomheten.
                </Normaltekst>
                {/*<Element className="mangler-rettigheter-i-altinn__overskrift">
                    For å se sykefraværsstatistikk kan du
                </Element>*/}
                {/*<ul className="mangler-rettigheter-i-altinn__list-wrapper">
                    <li>
                        <Normaltekst>
                            Bytte til en virksomhet der du har tilgang til sykefraværsstatistikk
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>Be om tilgang til Altinn for denne virksomhet</Normaltekst>
                    </li>
                </ul>*/}
                <Lenke
                    className="mangler-rettigheter-i-altinn__lenke"
                    href={
                        'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
                    }
                >
                    Les mer om hvordan tilgangsstyringen i Altinn fungerer
                </Lenke>
            </div>
        </div>
    );
};

export default ManglerRettigheterIAltinnSide;
