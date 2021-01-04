import React from 'react';
import './OmGradertSykemelding.less';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import { SykefraværVurdering } from '../../Forside/barnehage/Speedometer/Speedometer';
import { getTilpassetTittelOgTekstOmGradertSykemelding } from '../../Forside/barnehage/vurderingstekster';

interface Props {
    vurdering: SykefraværVurdering;
}

interface AvsnittProps {
    tittel: String;
    tekst: String;
}

export const OmGradertSykemelding = (props: Props) => {
    const tilpassetTittelOgTekstOmGradertSykemelding = getTilpassetTittelOgTekstOmGradertSykemelding(
        props.vurdering
    );

    const Avsnitt = (props: AvsnittProps) => (
        <div className="om-gradert-sykemelding__avsnitt">
            <Normaltekst>
                <strong>{props.tittel}</strong>
            </Normaltekst>
            <Normaltekst>{props.tekst}</Normaltekst>
        </div>
    );
    return (
        <div className="om-gradert-sykemelding">
            <Avsnitt
                tittel={tilpassetTittelOgTekstOmGradertSykemelding.tittel}
                tekst={tilpassetTittelOgTekstOmGradertSykemelding.tekst}
            />
            <Avsnitt
                tittel={'Du kan påvirke bruken av gradert sykmelding '}
                tekst={
                    'Gradert sykmelding er et virkemiddel for å redusere langtidsfravær. ' +
                    'God dialog mellom deg og medarbeideren din er en forutsetning for å benytte gradert sykmelding og iverksette tilretteleggingstiltak. ' +
                    'Dette kan forhindre og forebygge langtids sykefravær og varig utstøtning fra arbeidslivet. '
                }
            />
            <EksternLenke
                href={
                    'https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/gradertsykemelding'
                }
            >
                Les mer om gradert sykmelding her
            </EksternLenke>
        </div>
    );
};
