import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';

export const GrenseforklaringLangtid: FunctionComponent<{ bransjensProsent: number }> = ({
    bransjensProsent,
}) => {
    const grønnGrense = getGrønnGrenseTekst(bransjensProsent);
    const rødGrense = getRødGrenseTekst(bransjensProsent);

    return (
        <>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert grønn når ditt legemeldt langtidsfravær ligger under{' '}
                {grønnGrense} prosent.
            </Normaltekst>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert gul når ditt legemeldt langtidsfravær ligger mellom{' '}
                {grønnGrense} og {rødGrense} prosent.
            </Normaltekst>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert rød når ditt legemeldt langtidsfravær ligger over{' '}
                {rødGrense} prosent.
            </Normaltekst>
        </>
    );
};
