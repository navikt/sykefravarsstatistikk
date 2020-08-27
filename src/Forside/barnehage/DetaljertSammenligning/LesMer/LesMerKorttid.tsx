import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { SykefraværSiste4Kvartaler } from '../../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Prosent } from '../../Prosent';
import './DetaljertSammenligningLesMer.less';

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
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.OVER:
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    <Normaltekst className="detaljert-sammenligning-les-mer__ingress">
                        Andelen legemeldt sykefravær mellom 1 og 16 dager:
                    </Normaltekst>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <Element className="detaljert-sammenligning-les-mer__ingress">
                        Vi mangler dine tall for deler av perioden med sammenligning.
                    </Element>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    <Element className="detaljert-sammenligning-les-mer__ingress">
                        Det er for få ansatte i virksomheten til at vi kan vise
                        sykefraværsstatistikken for din virksomhet.
                    </Element>
                    <Normaltekst>
                        Ditt resultat: <Prosent prosent={prosentVirksomhet} />
                    </Normaltekst>
                    <Normaltekst>
                        Bransjens resultat:{' '}
                        <Prosent prosent={korttidsfraværSiste4KvartalerBransje} />
                    </Normaltekst>
                </>
            );
        default:
            // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
