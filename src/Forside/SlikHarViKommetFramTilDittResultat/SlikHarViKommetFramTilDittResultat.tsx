import React, { FunctionComponent } from 'react';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
import './SlikHarViKommetFramTilDittResultat.less';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    kvartaler?: ÅrstallOgKvartal[];
    onÅpne?: () => void;
}

export const SlikHarViKommetFramTilDittResultat: FunctionComponent<Props> = (props) => {
    return (
        <LesMerPanel
            className="slik-har-vi-kommet-fram-til-ditt-resultat"
            åpneLabel="Slik har vi kommet fram til ditt resultat"
            onÅpne={props.onÅpne}
        >
            <div className="slik-har-vi-kommet-fram-til-ditt-resultat__innhold">
                <BodyShort spacing>
                    Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken som
                    NAV og Statistisk sentralbyrå (SSB) utarbeider.
                </BodyShort>
                <BodyShort spacing>
                    Vi regner ut prosenten som et gjennomsnitt av de fire siste kvartalene som er
                    publisert. Hvis vi mangler ett eller flere kvartaler, så bruker vi de som er
                    tilgjengelig. Du får sammenlikning når du har tall for fire kvartaler.
                </BodyShort>
                <BodyShort spacing>
                    Sammenligningen tar ikke ta hensyn til størrelsen på din virksomhet.
                </BodyShort>
                <BodyShort spacing>Vi viser ikke egenmeldt sykefravær i sammenligningen.</BodyShort>
                <BodyShort spacing>Din bransje er hentet fra Altinn.</BodyShort>
                <EksternLenke href="https://www.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/">
                    Endre næringskode i Altinn
                </EksternLenke>
                <EksternLenke href="https://www.brreg.no/bedrift/naeringskoder/">
                    Om næringskoder i Brønnøysundregistrene
                </EksternLenke>
            </div>
        </LesMerPanel>
    );
};
