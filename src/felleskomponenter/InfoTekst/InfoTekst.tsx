import React from 'react';
import './InfoTekst.less';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';

interface Props {
    tittel: String;
    tekst: String;
}

export const InfoTekst = () => {
    const Avsnitt = (props: Props) => (
        <div className="info-tekst__avsnitt">
            <Normaltekst>
                <strong>{props.tittel}</strong>
            </Normaltekst>
            <Normaltekst>{props.tekst}</Normaltekst>
        </div>
    );
    return (
        <div className="info-tekst">
            <Avsnitt
                tittel={'Du bruker mer gradert sykmelding enn andre i din næring'}
                tekst={
                    'Det er positivt å bruke sykmelding. Vurder bruken av gradert sykmelding sammen med det langtidsfraværet. Er fraværet høyt eller lavt totalt sett?'
                }
            />
            <Avsnitt
                tittel={'Du kan påvirke bruken av gradert sykmelding '}
                tekst={
                    'Gradert sykmelding er et virkemiddel for å redusere langtidsfravær. God dialog mellom deg og medarbeideren din er en forutsetning for å benytte gradert sykmelding og iverksette tilretteleggingstiltak. Dette kan forhindre og forebygge langtids sykefravær og varig utstøtning fra arbeidslivet. '
                }
            />
            <EksternLenke
                href={
                    'https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/gradertsykemelding'
                }
            >
                Les mer om gradert sykemelding her
            </EksternLenke>
        </div>
    );
};
