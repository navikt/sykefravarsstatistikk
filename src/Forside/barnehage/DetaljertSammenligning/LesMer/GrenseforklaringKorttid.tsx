import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { getGrønnGrenseTekst, getRødGrenseTekst } from '../../barnehage-utils';

export const GrenseforklaringKorttid: FunctionComponent<{ bransjensProsent: number }> = ({
    bransjensProsent,
}) => {
    const grønnGrense = getGrønnGrenseTekst(bransjensProsent);
    const rødGrense = getRødGrenseTekst(bransjensProsent);

    return (
        <>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert grønn når ditt legemeldt korttidsfravær ligger under{' '}
                {grønnGrense} prosent.
            </Normaltekst>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert gul når ditt legemeldt korttidsfravær ligger mellom{' '}
                {grønnGrense} og {rødGrense} prosent.
            </Normaltekst>
            <Normaltekst className="detaljert-sammenligning-les-mer__paragraf">
                Sammenligningen blir markert rød når ditt legemeldt korttidsfravær ligger over{' '}
                {rødGrense} prosent.
            </Normaltekst>
        </>
    );
};
