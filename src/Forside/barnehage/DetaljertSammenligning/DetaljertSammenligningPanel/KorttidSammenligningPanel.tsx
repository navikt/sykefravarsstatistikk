import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Speedometer, SykefraværResultat } from '../../Speedometer/Speedometer';
import LesMerPanel from '../../../../felleskomponenter/LesMerPanel/LesMerPanel';
import Panel from 'nav-frontend-paneler';
import './DetaljertSammenligningPanel.less';

interface Props {
    resultat: SykefraværResultat;
}

const getVurderingstekst = (resultat: SykefraværResultat) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Du har et <strong>lavere legemeldt korttidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har et <strong>høyere legemeldt korttidsfravær</strong> enn bransjen
                </>
            );
    }
};

export const KorttidSammenligningPanel: FunctionComponent<Props> = ({ resultat }) => (
    <Panel className="detaljert-sammenligning-panel">
        <Normaltekst tag="h3">
            {getVurderingstekst(resultat)}
        </Normaltekst>
        <div className="detaljert-sammenligning-panel__ikon-og-les-mer">
            <Speedometer resultat={resultat} />
            <LesMerPanel
                className="detaljert-sammenligning-panel__les-mer"
                åpneLabel="Se tallene"
                lukkLabel="Lukk"
            >
                <div className="detaljert-sammenligning-panel__les-mer-innhold">
                    <Normaltekst>Andelen legemeldt sykefravær mellom 1 og 16 dager:</Normaltekst>
                    <Normaltekst>Ditt resultat: 20 %</Normaltekst>
                    <Normaltekst>Bransjens resultat: 5 %</Normaltekst>
                </div>
            </LesMerPanel>
        </div>
    </Panel>
);
