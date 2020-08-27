import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { formaterProsent } from '../../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { SykefraværSiste4Kvartaler } from '../../../api/sykefraværsvarighet';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { DetaljertSammenligningPanel } from './DetaljertSammenligningPanel/DetaljertSammenligningPanel';
import { Prosent } from '../Prosent';

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
                    <Normaltekst>Andel langtidsfravær fra 17. dag:</Normaltekst>
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
                    <Element>Vi mangler dine tall for deler av perioden med sammenligning.</Element>
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
                    <Element>
                        Det er for få ansatte i virksomheten til at vi kan vise
                        sykefraværsstatistikken for din virksomhet.
                    </Element>
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
