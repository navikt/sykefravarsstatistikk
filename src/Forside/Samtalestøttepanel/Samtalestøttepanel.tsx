import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import lampeSvg from './lampe.svg';
import './Samtalestøttepanel.less';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import { PATH_SAMTALESTØTTE } from '../../konstanter';
import classNames from 'classnames';
import Lenke from 'nav-frontend-lenker';
import { useSendNavigereEvent } from '../../amplitude/amplitude';
import '../../felleskomponenter/InternLenke/InternLenke.less';

const Samtalestøttepanel: FunctionComponent = () => {
    const sendNavigereEvent = useSendNavigereEvent();
    const lenkeTekst = 'Gå til samtalestøtten';

    return (
        <PanelBase className="samtalestøttepanel">
            <PaneltittelMedIkon src={lampeSvg} alt="lampeikon">
                Forbered samtale med medarbeider!
            </PaneltittelMedIkon>
            <Normaltekst className="samtalestøttepanel__ingress">
                Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy for
                arbeidsgivere for å gjøre det lettere å forberede seg.
            </Normaltekst>
            <Lenke
                href={PATH_SAMTALESTØTTE + '?ref=' + window.location.href}
                className={classNames('intern-lenke')}
                onClick={() => {
                    sendNavigereEvent({
                        lenketekst: lenkeTekst,
                        destinasjon: PATH_SAMTALESTØTTE,
                        url: window.location.href,
                    });
                }}
            >
                {lenkeTekst}
            </Lenke>
        </PanelBase>
    );
};

export default Samtalestøttepanel;
