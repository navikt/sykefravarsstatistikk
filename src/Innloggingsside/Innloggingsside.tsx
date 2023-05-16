import React, { useContext } from 'react';
import { Button, Link } from "@navikt/ds-react";
import illustrasjonSvg from './statistikk-ikon.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './Innloggingsside.less';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';
import { EnvironmentContext } from '../Context/EnvironmentContext';
import { BASE_PATH } from "../konstanter";

interface Props {
    redirectUrl: string;
}

const Innloggingsside: React.FunctionComponent<Props> = ({ redirectUrl }) => {
    const { MIN_SIDE_ARBEIDSGIVER_URL } = useContext(EnvironmentContext);
    const redirectTilLogin = () => {
        window.location.href = `${BASE_PATH}/redirect-til-login?redirect=${redirectUrl}`;
    };

    return (
        <div className="innloggingsside__wrapper">
            <div className="innloggingsside">
                <img src={illustrasjonSvg} className="innloggingsside__illustrasjon" alt="" />

                <Sidetittel className="innloggingsside__sidetittel">
                    Sykefraværsstatistikk
                </Sidetittel>

                <Normaltekst className="innloggingsside__overskrift">
                    Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
                    virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer
                    gjennom Altinn.
                </Normaltekst>

                <Link
                    className="innloggingsside__lenke"
                    href={MIN_SIDE_ARBEIDSGIVER_URL + '/informasjon-om-tilgangsstyring'}
                >
                    Les mer om roller og tilganger
                </Link>

                <Button
                    variant="primary"
                    onClick={redirectTilLogin}
                    className="innloggingsside__loginKnapp-wrapper">
                    Logg inn
                </Button>
            </div>
        </div>
    );
};

export default Innloggingsside;
