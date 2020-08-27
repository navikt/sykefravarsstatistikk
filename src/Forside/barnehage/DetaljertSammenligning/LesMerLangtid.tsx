import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { SykefraværSiste4Kvartaler } from '../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { DetaljertSammenligningPanel } from './DetaljertSammenligningPanel/DetaljertSammenligningPanel';

interface Props {
    langtidsfraværSiste4KvartalerVirksomhet: SykefraværSiste4Kvartaler;
    langtidsfraværSiste4KvartalerBransje: number;
    resultat: SykefraværResultat;
}

export const LesMerLangtid: FunctionComponent<Props> = ({
    langtidsfraværSiste4KvartalerVirksomhet,
    langtidsfraværSiste4KvartalerBransje,
    resultat,
}) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.OVER:
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst>Andel langtidsfravær fra 17. dag:</Normaltekst>
                    <Normaltekst>
                        Ditt resultat:{' '}
                        {formaterProsent(langtidsfraværSiste4KvartalerVirksomhet.prosent)}&nbsp;%
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat: {formaterProsent(langtidsfraværSiste4KvartalerBransje)}
                        &nbsp;%
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Element>Vi mangler dine tall for deler av perioden med sammenligning.</Element>
                    <Normaltekst>
                        Ditt resultat:{' '}
                        {formaterProsent(langtidsfraværSiste4KvartalerVirksomhet.prosent)}&nbsp;%
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat: {formaterProsent(langtidsfraværSiste4KvartalerBransje)}
                        &nbsp;%
                    </Normaltekst>
                </>
            );
        default:
            // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
