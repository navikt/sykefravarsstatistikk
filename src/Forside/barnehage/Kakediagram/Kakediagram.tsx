import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { KakediagramGrønn } from './KakediagramGrønn';
import { KakediagramGrå } from './KakediagramGrå';
import { KakediagramGul } from './KakediagramGul';
import { KakediagramRød } from './KakediagramRød';

export enum SykefraværVurdering {
    UNDER = 'UNDER',
    MIDDELS = 'MIDDELS',
    OVER = 'OVER',
    MASKERT = 'MASKERT',
    INGEN_DATA = 'INGEN_DATA',
    UFULLSTENDIG_DATA = 'UFULLSTENDIG_DATA',
    FEIL = 'FEIL',
}

interface Props {
    resultat: SykefraværVurdering;
    stor?: boolean;
    className?: string;
    inline?: boolean;
    erGradert?: boolean;
}

export const Kakediagram: FunctionComponent<Props> = ({
    resultat,
    stor,
    className,
    inline,
    erGradert,
}) => {
    const størrelsesfaktor = stor ? 1.2 : 0.7;

    return inline ? (
        <span className={classNames(className, 'kakediagram')}>
            <SpeedometerSvg
                resultat={resultat}
                størrelsesfaktor={størrelsesfaktor}
                erGradert={erGradert}
            />
        </span>
    ) : (
        <div className={classNames(className, 'kakediagram')}>
            <SpeedometerSvg
                resultat={resultat}
                størrelsesfaktor={størrelsesfaktor}
                erGradert={erGradert}
            />
        </div>
    );
};

const SpeedometerSvg: FunctionComponent<{
    resultat: SykefraværVurdering;
    størrelsesfaktor: number;
    erGradert?: boolean;
}> = ({ resultat, størrelsesfaktor, erGradert }) => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return <KakediagramRød størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.MIDDELS:
            return <KakediagramGul størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.OVER:
            return <KakediagramGrønn størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.FEIL:
            return <KakediagramGrå størrelsesfaktor={størrelsesfaktor} />;
    }
};
