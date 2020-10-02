import React, { FunctionComponent } from 'react';
import { Tips, tipsvariasjoner } from '../../../felleskomponenter/tips/tips';
import { TipsVisning } from '../../../felleskomponenter/tips/TipsVisning';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './EkspanderbareTips.less';
import { Undertittel, Systemtittel } from 'nav-frontend-typografi';
import lyspæreSvg from './lyspære.svg';

interface Props {
    tips: Tips[];
}

export const EkspanderbareTips: FunctionComponent<Props> = ({ tips }) => {
    return (
        <Ekspanderbartpanel
            className="ekspanderbare-tips"
            apen
            tittel={
                <>
                    <img className="ekspanderbare-tips__bilde" src={lyspæreSvg} alt="" />
                    <Systemtittel tag="span">Se tips om hva du kan gjøre</Systemtittel>
                </>
            }
        >
            <Undertittel className="ekspanderbare-tips__undertittel">
                Tips fra andre barnehager i lignende situasjon som deg
            </Undertittel>
            <TipsVisning className="ekspanderbare-tips__tips" tips={tips[0]} />
            <Undertittel className="ekspanderbare-tips__undertittel">
                Dette kan du gjøre
            </Undertittel>
            <TipsVisning className="ekspanderbare-tips__tips" tips={tips[1]} />
            <TipsVisning className="ekspanderbare-tips__tips" tips={tips[2]} />

            <Undertittel className="ekspanderbare-tips__undertittel">
                LAs forslag til variasjoner
            </Undertittel>
            {tipsvariasjoner.map((tip) => (
                <TipsVisning className="ekspanderbare-tips__tips" tips={tip} key={tip.tittel} />
            ))}
            <Undertittel className="ekspanderbare-tips__undertittel">
                Alle tipsene
            </Undertittel>
            {tips.map((tip) => (
                <TipsVisning className="ekspanderbare-tips__tips" tips={tip} key={tip.tittel} />
            ))}
        </Ekspanderbartpanel>
    );
};
// må se bra ut uten tidsbruk
