import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { SummertSykefravær } from '../../../../api/summertSykefraværshistorikk';
import { SykefraværVurdering } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';

interface Props {
    langtidsfraværSiste4KvartalerVirksomhet: SummertSykefravær;
    langtidsfraværSiste4KvartalerBransje: number;
    resultat: SykefraværVurdering;
}

export const LesMerLangtid: FunctionComponent<Props> = ({
    langtidsfraværSiste4KvartalerVirksomhet,
    langtidsfraværSiste4KvartalerBransje,
    resultat,
}) => {
    const prosentVirksomhet = langtidsfraværSiste4KvartalerVirksomhet.prosent;
    const grønnGrense = getGrønnGrenseTekst(langtidsfraværSiste4KvartalerBransje);
    const rødGrense = getRødGrenseTekst(langtidsfraværSiste4KvartalerBransje);

    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel langtidsfravær fra 17. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert grønn når ditt legemeldt langtidsfravær ligger
                        under {grønnGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel langtidsfravær fra 17. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert gul når ditt legemeldt langtidsfravær ligger
                        mellom {grønnGrense} og {rødGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Andel langtidsfravær fra 17. dag:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent strong prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Sammenligningen blir markert rød når ditt legemeldt langtidsfravær ligger
                        over {rødGrense} prosent.
                    </Normaltekst>
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
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
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Du har for lave tall til at vi kan vise statistikken din.
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværVurdering.INGEN_DATA:
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
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        default:
            return <>—</>;
    }
};
