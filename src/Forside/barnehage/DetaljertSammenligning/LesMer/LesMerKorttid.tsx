import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { SykefraværSiste4Kvartaler } from '../../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';
import { GrenseforklaringKorttid } from './GrenseforklaringKorttid';

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
    const prosentVirksomhet = korttidsfraværSiste4KvartalerVirksomhet.prosent;
    const grønnGrense = getGrønnGrenseTekst(korttidsfraværSiste4KvartalerBransje);
    const rødGrense = getRødGrenseTekst(korttidsfraværSiste4KvartalerBransje);

    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.OVER:
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
                    <GrenseforklaringKorttid bransjensProsent={korttidsfraværSiste4KvartalerBransje} />
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
                    <GrenseforklaringKorttid bransjensProsent={korttidsfraværSiste4KvartalerBransje} />
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
                    <GrenseforklaringKorttid bransjensProsent={korttidsfraværSiste4KvartalerBransje} />
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
                    <GrenseforklaringKorttid bransjensProsent={korttidsfraværSiste4KvartalerBransje} />
                </>
            );
        default:
            return <>—</>;
    }
};
