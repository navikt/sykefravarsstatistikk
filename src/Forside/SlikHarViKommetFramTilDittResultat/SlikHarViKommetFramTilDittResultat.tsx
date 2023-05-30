import React, { FunctionComponent } from 'react';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { SlikHarViKommetFramTilDittResultatTekst } from './SlikHarViKommetFramTilDittResultatTekst';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
import './SlikHarViKommetFramTilDittResultat.less';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { SykefraværVurdering } from '../vurdering-utils';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

interface Props {
    resultat: SykefraværVurdering;
    kvartaler?: ÅrstallOgKvartal[];
    onÅpne?: () => void;
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const SlikHarViKommetFramTilDittResultat: FunctionComponent<Props> = (props) => {
    return (
        <LesMerPanel
            className="slik-har-vi-kommet-fram-til-ditt-resultat"
            åpneLabel="Slik har vi kommet fram til ditt resultat"
            onÅpne={props.onÅpne}
        >
            <div className="slik-har-vi-kommet-fram-til-ditt-resultat__innhold">
                <SlikHarViKommetFramTilDittResultatTekst
                    resultat={props.resultat}
                    restPubliseringsdatoer={props.restPubliseringsdatoer}
                />
                <EksternLenke
                    style={{ display: 'block' }}
                    href="https://www.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/"
                >
                    Endre næringskode i Altinn
                </EksternLenke>
                <EksternLenke
                    style={{ display: 'block' }}
                    href="https://www.brreg.no/bedrift/naeringskoder/"
                >
                    Om næringskoder i Brønnøysundregistrene
                </EksternLenke>
            </div>
        </LesMerPanel>
    );
};
