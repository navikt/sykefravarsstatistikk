import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { SykefraværSiste4Kvartaler } from '../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../Speedometer/Speedometer';

interface Props {
    korttidsfraværSiste4KvartalerVirksomhet: SykefraværSiste4Kvartaler;
    korttidsfraværSiste4KvartalerBransje: number;
    resultat: SykefraværResultat;
}

export const LesMerKorttid: FunctionComponent<Props> = ({
    korttidsfraværSiste4KvartalerVirksomhet,
    korttidsfraværSiste4KvartalerBransje,
    resultat,
}) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.OVER:
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst>Andelen legemeldt sykefravær mellom 1 og 16 dager:</Normaltekst>
                    <Normaltekst>
                        Ditt resultat:{' '}
                        {formaterProsent(korttidsfraværSiste4KvartalerVirksomhet.prosent)}
                        &nbsp;%
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat: {formaterProsent(korttidsfraværSiste4KvartalerBransje)}
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
                        {formaterProsent(korttidsfraværSiste4KvartalerVirksomhet.prosent)}
                        &nbsp;%
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat: {formaterProsent(korttidsfraværSiste4KvartalerBransje)}
                        &nbsp;%
                    </Normaltekst>
                </>
            );
        default:
            // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
