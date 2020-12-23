import React, { ReactElement } from 'react';
import { SykefraværVurdering } from './Speedometer/Speedometer';
import { getGrønnGrense, getRødGrense } from './barnehage-utils';
import { formaterProsent } from '../../utils/app-utils';
import { Normaltekst } from 'nav-frontend-typografi';

export enum SammenligningsType {
    TOTALT = 'TOTALT',
    LANGTID = 'LANGTID',
    KORTTID = 'KORTTID',
    GRADERT = 'GRADERT',
}

export const getVurderingstekst = (
    sykefraværResultat: SykefraværVurdering,
    sammenligningsType: SammenligningsType,
    harBransje: boolean
): ReactElement | string => {
    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            return getVurderingstekstTotalt(sykefraværResultat, harBransje);
        case SammenligningsType.LANGTID:
            return getVurderingstekstLangtid(sykefraværResultat, harBransje);
        case SammenligningsType.KORTTID:
            return getVurderingstekstKorttid(sykefraværResultat, harBransje);
        case SammenligningsType.GRADERT: // TODO nesten ferdig, sjekk om ufullstendig data tekst er ok ?
            return getVurderingstekstGradert(sykefraværResultat, harBransje);
    }
};
const getVurderingstekstGradert = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): ReactElement | string => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (sykefraværResultat) {
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert grønn: Du bruker <strong>mer gradert sykemelding</strong> enn andre i
                    din {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du bruker <strong>omtrent like mye gradert sykemelding</strong> som
                    andre i din {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert rød: Du bruker <strong>mindre gradert sykemelding</strong> enn andre i
                    din
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <>
                    Markert grå: Du har <strong>for lave tall</strong> til at vi kan vise
                    statistikken din.
                </>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </>
            );
        case SykefraværVurdering.FEIL:
            return <>Markert grå: Vi kan ikke vise dine tall.</>;
    }
};

const getVurderingstekstTotalt = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): ReactElement | string => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (sykefraværResultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har <strong>lavere sykefravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt sykefravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har <strong>høyere sykefravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <>
                    Markert grå: Du har <strong>for lave tall</strong> til at vi kan vise
                    statistikken din.
                </>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </>
            );
        case SykefraværVurdering.FEIL:
            return <></>;
    }
};

const getVurderingstekstKorttid = (resultat: SykefraværVurdering, harBransje: boolean) => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>legemeldt korttidsfravær</strong> fra 1. til 16. dag:
                </>
            );
        case SykefraværVurdering.FEIL:
            return <>—</>;
    }
};

export const getVurderingstekstLangtid = (resultat: SykefraværVurdering, harBransje: boolean) => {
    const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn{' '}
                    {bransjeEllerNæringTekst}
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværVurdering.FEIL:
            return <>—</>;
    }
};

export const getForklaringAvVurdering = (
    resultat: SykefraværVurdering,
    bransjensProsent: number | null | undefined
) => {
    if (bransjensProsent === null || bransjensProsent === undefined) {
        return (
            <Normaltekst>
                Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                bransjen/næringen din. Vi viser dine tall når de publiseres.
            </Normaltekst>
        );
    }

    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grønn på en skala grønn, gul og rød.
                    <br />
                    Dette skjer når ditt sykefravær er lavere enn{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød.
                    <br />
                    Dette skjer når ditt sykefravær er mellom{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.OVER:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød.
                    <br />
                    Dette skjer når ditt sykefravær er høyere enn{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <Normaltekst>
                    Sammenligningen blir markert grå fordi vi mangler dine tall for deler av
                    perioden. Sammenligningen lages når vi har tall for alle perioder.
                </Normaltekst>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grå fordi du har for lave tall til at
                    vi kan vise statistikken din.
                </Normaltekst>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                    virksomheten din. Vi viser dine tall når de publiseres.
                </Normaltekst>
            );
        case SykefraværVurdering.FEIL:
            return <></>;
    }
};

export const getTilpassetTittelOgTekstOmGradertSykemelding = (
    resultat: SykefraværVurdering
): { tittel: String; tekst: String } => {
    switch (resultat) {
        case SykefraværVurdering.OVER:
            return {
                tittel: 'Du bruker mer gradert sykmelding enn andre i din næring',
                tekst:
                    'Det er positivt å bruke gradert sykmelding. Vurder bruken av gradert sykmelding sammen med det langtidsfraværet. Er fraværet høyt eller lavt totalt sett? ',
            };
        case SykefraværVurdering.UNDER:
            return {
                tittel: 'Du bruker mindre gradert sykmelding enn andre i din næring',
                tekst:
                    'Vurder bruken av gradert sykmelding sammen med langtidsfraværet. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær. ',
            };
        case SykefraværVurdering.MIDDELS:
            return {
                tittel:
                    'Du bruker omtrent like mye gradert sykmelding som andre i din bransje/næring',
                tekst:
                    'Vurder bruken av gradert sykmelding sammen med langtidsfraværet. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær.',
            };
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
        case SykefraværVurdering.FEIL:
            return {
                tittel: 'Vurder bruken av gradert sykemelding sammen med langtidsfraværet',
                tekst:
                    'Vi kan ikke sammenligne deg med andre, bruk gjerne egen erfaring. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær.',
            };

        default:
            return { tittel: '', tekst: '' };
    }
};
