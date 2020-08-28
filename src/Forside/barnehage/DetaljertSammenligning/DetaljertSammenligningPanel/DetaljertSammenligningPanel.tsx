import React, { FunctionComponent, ReactElement } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Speedometer, SykefraværResultat } from '../../Speedometer/Speedometer';
import LesMerPanel from '../../../../felleskomponenter/LesMerPanel/LesMerPanel';
import Panel from 'nav-frontend-paneler';
import './DetaljertSammenligningPanel.less';

interface Props {
    resultat: SykefraværResultat;
    vurderingstekst: ReactElement | string;
}

export const DetaljertSammenligningPanel: FunctionComponent<Props> = ({
    children,
    resultat,
    vurderingstekst,
}) => {
    return (
        <Panel className="detaljert-sammenligning-panel">
            <Normaltekst tag="h3">{vurderingstekst}</Normaltekst>
            <div className="detaljert-sammenligning-panel__ikon-og-les-mer">
                <Speedometer resultat={resultat} />
                <LesMerPanel
                    className="detaljert-sammenligning-panel__les-mer"
                    åpneLabel="Se tallene"
                >
                    <div className="detaljert-sammenligning-panel__les-mer-innhold">{children}</div>
                </LesMerPanel>
            </div>
        </Panel>
    );
};
