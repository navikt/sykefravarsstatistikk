import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { SummertSykefravær } from '../../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';

interface Props {
    korttidsfraværSiste4KvartalerVirksomhet: SummertSykefravær;
    korttidsfraværSiste4KvartalerBransje: number;
    resultat: SykefraværResultat;
}

export const LesMerKorttid: FunctionComponent<Props> = ({
    korttidsfraværSiste4KvartalerVirksomhet,
    korttidsfraværSiste4KvartalerBransje,
    resultat,
}) => {
    const prosentVirksomhet = korttidsfraværSiste4KvartalerVirksomhet.prosent;
    const grønnGrense = getGrønnGrenseTekst(korttidsfraværSiste4KvartalerBransje);
    const rødGrense = getRødGrenseTekst(korttidsfraværSiste4KvartalerBransje);

    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel legemeldt korttidsfravær fra 1. til 16. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert grønn når ditt legemeldt korttidsfravær ligger
                        under {grønnGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel legemeldt korttidsfravær fra 1. til 16. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert gul når ditt legemeldt korttidsfravær ligger
                        mellom {grønnGrense} og {rødGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel legemeldt korttidsfravær fra 1. til 16. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert rød når ditt legemeldt korttidsfravær ligger
                        over {rødGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Vi mangler dine tall for deler av perioden med sammenligning.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Du har for lave tall til at vi kan vise statistikken din.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Vi finner ikke tall for virksomheten din.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={null} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        default:
            return <>—</>;
    }
};
