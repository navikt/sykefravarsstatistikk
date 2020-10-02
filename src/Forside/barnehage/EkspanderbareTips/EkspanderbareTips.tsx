import React, { FunctionComponent } from 'react';
import { Tips } from '../../../felleskomponenter/tips/tips';
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
            <TipsVisning tips={tips[0]} />
            <Undertittel className="ekspanderbare-tips__undertittel">
                Dette kan du gjøre
            </Undertittel>
            <TipsVisning tips={tips[1]} />
            <TipsVisning tips={tips[2]} />
        </Ekspanderbartpanel>
    );
};
