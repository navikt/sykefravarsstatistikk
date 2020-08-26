import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Speedometer, SykefraværResultat } from '../../Speedometer/Speedometer';
import LesMerPanel from '../../../../felleskomponenter/LesMerPanel/LesMerPanel';
import Panel from 'nav-frontend-paneler';
import { Vurderingstekst } from './Vurderingstekst';
import './DetaljertSammenligningPanel.less';

interface Props {
    resultat: SykefraværResultat;
    korttidEllerLangtid: 'korttidsfravær' | 'langtidsfravær';
}

export const DetaljertSammenligningPanel: FunctionComponent<Props> = ({
    children,
    resultat,
    korttidEllerLangtid,
}) => {
    return (
        <Panel className="detaljert-sammenligning-panel">
            <Normaltekst tag="h3">
                <Vurderingstekst resultat={resultat} korttidEllerLangtid={korttidEllerLangtid} />
            </Normaltekst>
            <div className="detaljert-sammenligning-panel__ikon-og-les-mer">
                <Speedometer resultat={resultat} />
                <LesMerPanel
                    className="detaljert-sammenligning-panel__les-mer"
                    åpneLabel="Se tallene"
                    lukkLabel="Lukk"
                >
                    <div className="detaljert-sammenligning-panel__les-mer-innhold">{children}</div>
                </LesMerPanel>
            </div>
        </Panel>
    );
};
