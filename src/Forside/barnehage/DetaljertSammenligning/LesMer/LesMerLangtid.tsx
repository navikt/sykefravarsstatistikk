import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { SykefraværSiste4Kvartaler } from '../../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';
import { LenkeTilHistorikk } from '../../../../felleskomponenter/LenkeTilHistorikk';

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
    const grønnGrense = getGrønnGrenseTekst(langtidsfraværSiste4KvartalerBransje);
    const rødGrense = getRødGrenseTekst(langtidsfraværSiste4KvartalerBransje);

    switch (resultat) {
        case SykefraværResultat.UNDER:
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
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer langtid" />
                </>
            );
        case SykefraværResultat.MIDDELS:
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
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer langtid" />
                </>
            );
        case SykefraværResultat.OVER:
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
                    <LenkeTilHistorikk kildeSomSendesMedEvent="les mer langtid" />
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
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                        <LenkeTilHistorikk kildeSomSendesMedEvent="les mer langtid" />
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
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                        Bransjens resultat:{' '}
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
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
                        <Prosent strong prosent={langtidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        default:
            return <>—</>;
    }
};
