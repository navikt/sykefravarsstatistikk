import React, { useContext } from 'react';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import illustrasjonSvg from './statistikk-ikon.svg';
import './Innloggingsside.css';
import { EnvironmentContext } from '../Context/EnvironmentContext';
import { BASE_PATH } from '../konstanter';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';

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
                <Heading spacing level="2" size="large">
                    Sykefraværsstatistikk
                </Heading>
                <BodyShort spacing>
                    Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
                    virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer
                    gjennom Altinn.
                </BodyShort>
                <EksternLenke href={MIN_SIDE_ARBEIDSGIVER_URL + '/informasjon-om-tilgangsstyring'}>
                    Les mer om roller og tilganger
                </EksternLenke>
                <div className="innloggingsside__loginKnapp-wrapper">
                    <Button variant="primary" onClick={redirectTilLogin}>
                        Logg inn
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Innloggingsside;
