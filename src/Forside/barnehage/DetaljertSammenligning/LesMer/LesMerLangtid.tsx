import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { SykefraværSiste4Kvartaler } from '../../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';

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
    const prosentVirksomhet = langtidsfraværSiste4KvartalerVirksomhet.prosent;
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.OVER:
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__ingress">
                        Andel langtidsfravær fra 17. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__ingress">
                        Vi mangler dine tall for deler av perioden med sammenligning.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__ingress">
                        Du har for lave tall til at vi kan vise sykefraværstatistikken din.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        default:
            // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
