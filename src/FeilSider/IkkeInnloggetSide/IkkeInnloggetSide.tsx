import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import illustrasjonSvg from './statistikk-ikon.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './IkkeInnloggetSide.less';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';

export const IkkeInnloggetSide: React.FunctionComponent = () => {
    const redirectTilLogin = () => {
        window.location.href = '/sykefravarsstatistikk/redirect-til-login';
    };

    return (
        <div className="ikke-innlogget-side__wrapper">
            <div className="ikke-innlogget-side">
                <img src={illustrasjonSvg} className="ikke-innlogget-side__illustrasjon" alt="" />

                <Sidetittel className="ikke-innlogget-side__sidetittel">
                    Sykefraværsstatistikk
                </Sidetittel>

                <Normaltekst className="ikke-innlogget-side__overskrift">
                    Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
                    virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer
                    gjennom Altinn.
                </Normaltekst>

                <Lenke
                    className="ikke-innlogget-side__lenke"
                    href={
                        'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
                    }
                >
                    Les mer om roller og tilganger
                </Lenke>

                <Hovedknapp
                    onClick={redirectTilLogin}
                    className="ikke-innlogget-side__loginKnapp-wrapper"
                >
                    Logg inn
                </Hovedknapp>
            </div>
        </div>
    );
};

export default IkkeInnloggetSide;
