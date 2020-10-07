import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { ÅrstallOgKvartal } from '../../../utils/sykefraværshistorikk-utils';
import { SlikHarViKommetFramTilDittResultatTekst } from './SlikHarViKommetFramTilDittResultatTekst';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import './SlikHarViKommetFramTilDittResultat.less';

interface Props {
    resultat: SykefraværResultat;
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
                <SlikHarViKommetFramTilDittResultatTekst
                    resultat={props.resultat}
                    kvartaler={props.kvartaler}
                />
            </div>
        </LesMerPanel>
    );
};
