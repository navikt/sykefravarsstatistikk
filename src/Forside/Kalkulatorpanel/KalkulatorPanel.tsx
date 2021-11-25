import * as React from 'react';
import { FunctionComponent } from 'react';
import kalkisSvg from './kalkis.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import { PATH_KALKULATOR } from '../../konstanter';
import classNames from 'classnames';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import InternLenke from '../../felleskomponenter/InternLenke/InternLenke';

const KalkulatorPanel: FunctionComponent<{ liten?: boolean }> = ({ liten }) => {
    return (
        <PanelBase className={classNames('kalkulatorpanel', liten && 'kalkulatorpanel--liten')}>
            <PaneltittelMedIkon src={kalkisSvg} alt="Kalkulatorikon">
                Hvor mye koster sykefraværet?
            </PaneltittelMedIkon>
            <Normaltekst className="kalkulatorpanel__ingress">
                Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.
            </Normaltekst>
            <InternLenke
                pathname={PATH_KALKULATOR}
                onClick={() => {}}
                className="kalkulatorpanel__lenke"
            >
                Gå til kostnadskalkulatoren
            </InternLenke>
        </PanelBase>
    );
};
export default KalkulatorPanel;
