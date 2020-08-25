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
                <div className="detaljert-sammenligning__ikon-og-les-mer">
                    <Speedometer resultat={SykefraværResultat.UNDER} />
                    <LesMerPanel
                        className="detaljert-sammenligning__les-mer"
                        åpneLabel="Se tallene"
                        lukkLabel="Lukk"
                    >
                        <div className="detaljert-sammenligning__les-mer-innhold">
                            <Normaltekst>Andelen sykefraværsdager som er gradert:</Normaltekst>
                            <Normaltekst>Ditt resultat: 20%</Normaltekst>
                            <Normaltekst>Bransjens resultat: 5%</Normaltekst>
                        </div>
                    </LesMerPanel>
                </div>
            </Panel>
            <Panel className="detaljert-sammenligning__panel">
                <Normaltekst tag="h3">
                    Du har et <strong>lavere korttidsfravær</strong> enn bransjen
                </Normaltekst>
                <div className="detaljert-sammenligning__ikon-og-les-mer">
                    <Speedometer resultat={SykefraværResultat.OVER} />
                    <LesMerPanel
                        className="detaljert-sammenligning__les-mer"
                        åpneLabel="Se tallene"
                        lukkLabel="Lukk"
                    >
                        <div className="detaljert-sammenligning__les-mer-innhold">
                            <Normaltekst>Andelen sykefraværsdager som er gradert:</Normaltekst>
                            <Normaltekst>Ditt resultat: 20%</Normaltekst>
                            <Normaltekst>Bransjens resultat: 5%</Normaltekst>
                        </div>
                    </LesMerPanel>
                </div>
            </Panel>
        </div>
    );
};
