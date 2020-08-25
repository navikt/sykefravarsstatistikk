import React, { FunctionComponent } from 'react';
import Panel from 'nav-frontend-paneler';
import './DetaljertSammenligning.less';
import { Normaltekst } from 'nav-frontend-typografi';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { Speedometer, SykefraværResultat } from '../Speedometer';

export const DetaljertSammenligning: FunctionComponent = () => {
    return (
        <div className="detaljert-sammenligning">
            <Panel className="detaljert-sammenligning__panel">
                <Normaltekst tag="h3">
                    Du har et <strong>lavere korttidsfravær</strong> enn bransjen
                </Normaltekst>
                <Speedometer resultat={SykefraværResultat.UNDER}/>
                <LesMerPanel åpneLabel="Se tallene" lukkLabel="Lukk">
                    <Normaltekst>Andelen sykefraværsdager som er gradert:</Normaltekst>
                    <Normaltekst>Ditt resultat: 20%</Normaltekst>
                    <Normaltekst>Bransjens resultat: 5%</Normaltekst>
                </LesMerPanel>
            </Panel>
            <Panel className="detaljert-sammenligning__panel">
                <Normaltekst tag="h3">
                    Du har et <strong>lavere korttidsfravær</strong> enn bransjen
                </Normaltekst>
                <Speedometer resultat={SykefraværResultat.OVER}/>
                <LesMerPanel åpneLabel="Se tallene" lukkLabel="Lukk">
                    <Normaltekst>Andelen sykefraværsdager som er gradert:</Normaltekst>
                    <Normaltekst>Ditt resultat: 20%</Normaltekst>
                    <Normaltekst>Bransjens resultat: 5%</Normaltekst>
                </LesMerPanel>
            </Panel>
        </div>
    );
};
