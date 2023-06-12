import React, { FunctionComponent } from 'react';
import './SlikHarViKommetFramTilDittResultat.css';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { BodyShort, ReadMore } from '@navikt/ds-react';
import { sendPanelEkspanderEvent} from "../../amplitude/events";

export const SlikHarViKommetFramTilDittResultat: FunctionComponent = () => {
    const panelHeader = 'Slik har vi kommet fram til ditt resultat';
    return (
        <ReadMore
            header={panelHeader}
            className="slik-har-vi-kommet-fram-til-ditt-resultat"
            onClick={() => sendPanelEkspanderEvent(panelHeader)}
        >
            <div className="slik-har-vi-kommet-fram-til-ditt-resultat__innhold">
                <BodyShort spacing>
                    Legemeldt sykefravær i sammenligningen er hentet fra sykefraværsstatistikken som
                    NAV og Statistisk sentralbyrå (SSB) utarbeider. Vi viser ikke egenmeldt
                    sykefravær.
                </BodyShort>
                <BodyShort spacing>
                    Vi regner ut prosenten som et gjennomsnitt av de fire siste kvartalene som er
                    publisert. Hvis vi mangler ett eller flere kvartaler, så bruker vi de som er
                    tilgjengelig. Du får sammenlikning med bransjen når du har tall for fire
                    kvartaler.
                </BodyShort>
                <BodyShort spacing>
                    Sammenligningen tar ikke hensyn til størrelsen på din virksomhet.
                </BodyShort>
                <BodyShort spacing>Din bransje er hentet fra Altinn.</BodyShort>
                <EksternLenke
                    className="slik-har-vi-kommet-fram-til-ditt-resultat__margin-bottom_075rem"
                    href="https://www.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/"
                >
                    Trykk her for å endre næringskode i Altinn
                </EksternLenke>
                <EksternLenke href="https://www.brreg.no/bedrift/naeringskoder/">
                    Les mer om næringskoder i Brønnøysundregistrene
                </EksternLenke>
            </div>
        </ReadMore>
    );
};
