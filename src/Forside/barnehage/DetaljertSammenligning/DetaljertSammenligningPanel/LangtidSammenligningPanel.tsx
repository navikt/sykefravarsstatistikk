import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Speedometer, SykefraværResultat } from '../../Speedometer';
import LesMerPanel from '../../../../felleskomponenter/LesMerPanel/LesMerPanel';
import Panel from 'nav-frontend-paneler';
import './DetaljertSammenligningPanel.less';

interface Props {
    resultat: SykefraværResultat;
}
export const LangtidSammenligningPanel: FunctionComponent<Props> = ({resultat}) => (
    <Panel className="detaljert-sammenligning-panel">
        <Normaltekst tag="h3">
            Du har et <strong>lavere langtidsfravær</strong> enn bransjen
        </Normaltekst>
        <div className="detaljert-sammenligning-panel__ikon-og-les-mer">
            <Speedometer resultat={resultat} />
            <LesMerPanel
                className="detaljert-sammenligning-panel__les-mer"
                åpneLabel="Se tallene"
                lukkLabel="Lukk"
            >
                <div className="detaljert-sammenligning-panel__les-mer-innhold">
                    <Normaltekst>Andelen sykefraværsdager som er gradert:</Normaltekst>
                    <Normaltekst>Ditt resultat: 20%</Normaltekst>
                    <Normaltekst>Bransjens resultat: 5%</Normaltekst>
                </div>
            </LesMerPanel>
        </div>
    </Panel>
);
