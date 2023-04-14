import React, { FunctionComponent } from 'react';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { SlikHarViKommetFramTilDittResultatTekst } from './SlikHarViKommetFramTilDittResultatTekst';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
import './SlikHarViKommetFramTilDittResultat.less';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { SykefraværVurdering } from '../vurdering-utils';

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
                    kvartaler={props.kvartaler}
                    restPubliseringsdatoer={props.restPubliseringsdatoer}
                />
            </div>
        </LesMerPanel>
    );
};
