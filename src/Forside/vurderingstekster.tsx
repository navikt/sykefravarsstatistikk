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
    harBransje: boolean
): JSX.Element => {
    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            return sammenliknSykefraværstekstTotalt(sykefraværResultat, harBransje);
        case SammenligningsType.LANGTID:
            return sammenliknSykefraværstekstLangtid(sykefraværResultat, harBransje);
        case SammenligningsType.KORTTID:
            return sammenliknSykefraværstekstKorttid(sykefraværResultat, harBransje);
        case SammenligningsType.GRADERT:
            return sammenliknSykefraværstekstGradert(sykefraværResultat, harBransje);
    }
};
const sammenliknSykefraværstekstGradert = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
    const bransjeEllerNæringTekst = harBransje ? 'bransje' : 'næring';
    switch (sykefraværResultat) {
        case 'OVER':
            return (
                <BodyShort size="small">
                    Markert grønn: Du bruker <strong>mer gradert sykmelding</strong> enn andre i din{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort size="small">
                    Markert gul: Du bruker <strong>omtrent like mye gradert sykmelding</strong> som
                    andre i din {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'UNDER':
            return (
                <BodyShort size="small">
                    Markert rød: Du bruker <strong>mindre gradert sykmelding</strong> enn andre i
                    din {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort size="small">
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: Vi <strong>kan ikke finne tall</strong> for virksomheten din.
                </BodyShort>
            );
    }
};

const sammenliknSykefraværstekstTotalt = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (sykefraværResultat) {
        case 'UNDER':
            return (
                <BodyShort size="small">
                    Markert grønn: Du har <strong>lavere sykefravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort size="small">
                    Markert gul: Du har <strong>omtrent likt sykefravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort size="small">
                    Markert rød: Du har <strong>høyere sykefravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort size="small">
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </BodyShort>
            );
    }
};

const sammenliknSykefraværstekstKorttid = (
    resultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (resultat) {
        case 'UNDER':
            return (
                <BodyShort size="small">
                    Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort size="small">
                    Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort size="small">
                    Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort size="small">
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
    }
};

export const sammenliknSykefraværstekstLangtid = (
    resultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (resultat) {
        case 'UNDER':
            return (
                <BodyShort size="small">
                    Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MIDDELS':
            return (
                <BodyShort size="small">
                    Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'OVER':
            return (
                <BodyShort size="small">
                    Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </BodyShort>
            );
        case 'MASKERT':
            return (
                <BodyShort size="small">
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort size="small">
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </BodyShort>
            );
    }
};

export const getForklaringAvVurdering = (
    resultat: SykefraværVurdering,
    bransjensProsent: number | null | undefined
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
                    <BodyShort size="small">
                        Sammenligningen din er blitt markert som grønn på en skala grønn, gul og
                        rød.
                    </BodyShort>
                    <BodyShort size="small">
                        Dette skjer når ditt sykefravær er lavere enn{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'MIDDELS':
            return (
                <>
                    <BodyShort size="small">
                        Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød.
                    </BodyShort>
                    <BodyShort size="small">
                        Dette skjer når ditt sykefravær er mellom{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
                        {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'OVER':
            return (
                <>
                    <BodyShort size="small">
                        Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød.
                    </BodyShort>
                    <BodyShort size="small">
                        Dette skjer når ditt sykefravær er høyere enn{' '}
                        {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </BodyShort>
                </>
            );
        case 'MASKERT':
            return (
                <BodyShort size="small">
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </BodyShort>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <BodyShort size="small">
                    Sammenligningen blir markert grå fordi vi mangler dine tall for deler av
                    perioden. Sammenligningen lages når vi har tall for alle perioder.
                </BodyShort>
            );
        case 'FEIL_ELLER_INGEN_DATA':
            return (
                <BodyShort size="small">
                    Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                    virksomheten din. Vi viser dine tall når de publiseres.
                </BodyShort>
            );
    }
};
