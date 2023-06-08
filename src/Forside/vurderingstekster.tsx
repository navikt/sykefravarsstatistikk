import React from 'react';
import { getGrønnGrense, getRødGrense, SykefraværVurdering } from './vurdering-utils';
import { formaterProsent } from '../utils/app-utils';
import { BodyShort } from '@navikt/ds-react';

export enum SammenligningsType {
    TOTALT = 'TOTALT',
    LANGTID = 'LANGTID',
    KORTTID = 'KORTTID',
    GRADERT = 'GRADERT',
}

export const sammenliknSykefraværstekst = (
    sykefraværResultat: SykefraværVurdering,
    sammenligningsType: SammenligningsType,
): JSX.Element => {
    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            return sammenliknSykefraværstekstTotalt(sykefraværResultat);
        case SammenligningsType.LANGTID:
            return sammenliknSykefraværstekstLangtid(sykefraværResultat);
        case SammenligningsType.KORTTID:
            return sammenliknSykefraværstekstKorttid(sykefraværResultat);
        case SammenligningsType.GRADERT:
            return sammenliknSykefraværstekstGradert(sykefraværResultat);
    }
};
const sammenliknSykefraværstekstGradert = (
    sykefraværResultat: SykefraværVurdering,
): JSX.Element => {
    switch (sykefraværResultat) {
        case 'OVER':
            return (
                <BodyShort>
                    Markert grønn: Du bruker <strong>mer gradert sykmelding</strong> enn andre i din bransje
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort>
                    Markert gul: Du bruker <strong>omtrent like mye gradert sykmelding</strong> som
                    andre i din bransje
                </BodyShort>
            );
        case 'UNDER':
            return (
                <BodyShort>
                    Markert rød: Du bruker <strong>mindre gradert sykmelding</strong> enn andre i
                    din bransje
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort>
                    Markert grå: Vi <strong>kan ikke finne tall</strong> for virksomheten din.
                </BodyShort>
            );
    }
};

const sammenliknSykefraværstekstTotalt = (sykefraværResultat: SykefraværVurdering): JSX.Element => {
    switch (sykefraværResultat) {
        case 'UNDER':
            return (
                <BodyShort>
                    Markert grønn: Du har <strong>lavere sykefravær</strong> enn bransjen
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort>
                    Markert gul: Du har <strong>omtrent likt sykefravær</strong> som bransjen
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort>
                    Markert rød: Du har <strong>høyere sykefravær</strong> enn bransjen
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort>
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </BodyShort>
            );
    }
};

const sammenliknSykefraværstekstKorttid = (resultat: SykefraværVurdering): JSX.Element => {
    switch (resultat) {
        case 'UNDER':
            return (
                <BodyShort>
                    Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn
                    bransjen
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort>
                    Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som
                    bransjen
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort>
                    Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn
                    bransjen
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
    }
};

export const sammenliknSykefraværstekstLangtid = (resultat: SykefraværVurdering): JSX.Element => {
    switch (resultat) {
        case 'UNDER':
            return (
                <BodyShort>
                    Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn bransjen.
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort>
                    Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som bransjen.
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort>
                    Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn bransjen.
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
    }
};

export const getForklaringAvVurdering = (
    resultat: SykefraværVurdering,
    bransjensProsent: number | null | undefined,
    antallKvartaler: number
) => {
    if (bransjensProsent === null || bransjensProsent === undefined) {
        return (
            <BodyShort>
                Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                bransjen/næringen din. Vi viser dine tall når de publiseres.
            </BodyShort>
        );
    }

    switch (resultat) {
        case 'UNDER':
            return (
                <>
                    <BodyShort>
                        Sammenligningen din er blitt markert som grønn på en skala grønn, gul og
                        rød.
                    </BodyShort>
                    <BodyShort>
                        Dette skjer når ditt sykefravær er lavere enn{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'MIDDELS':
            return (
                <>
                    <BodyShort>
                        Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød.
                    </BodyShort>
                    <BodyShort>
                        Dette skjer når ditt sykefravær er mellom{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
                        {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'OVER':
            return (
                <>
                    <BodyShort>
                        Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød.
                    </BodyShort>
                    <BodyShort>
                        Dette skjer når ditt sykefravær er høyere enn{' '}
                        {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'MASKERT':
            return (
                <BodyShort>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort>
                    <strong>Din virksomhet</strong> har sykefraværsstatistikk for{' '}
                    <strong>{antallKvartaler} av 4</strong> kvartaler. Tallet for <strong>bransjen</strong> regnes
                    ut fra de fire siste kvartalene. Vi sammenlikner deg med bransjen når vi har
                    dine tall for hele perioden.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort>
                    Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                    virksomheten din. Vi viser dine tall når de publiseres.
                </BodyShort>
            );
    }
};
