import React, { FunctionComponent } from 'react';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import './SlikHarViKommetFramTilDittResultatTekst.less';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { SykefraværVurdering } from '../vurdering-utils';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    resultat: SykefraværVurdering;
    kvartaler?: ÅrstallOgKvartal[];
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const SlikHarViKommetFramTilDittResultatTekst: FunctionComponent<Props> = ({}) => {
    return (
        <>
            <BodyShort>
                Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken som NAV
                og Statistisk sentralbyrå (SSB) utarbeider.
            </BodyShort>
            <BodyShort>
                Sammenligningen tar ikke ta hensyn til størrelsen til din virksomhet.
            </BodyShort>
            <BodyShort>Vi viser ikke egenmeldt sykefravær i sammenligningen.</BodyShort>
            <BodyShort>Din ((næring eller bransje)) er hentet fra Altinn.</BodyShort>
        </>
    );
};
