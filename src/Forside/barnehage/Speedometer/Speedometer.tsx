import React, { FunctionComponent } from 'react';
import { SpeedometerRød } from './SpeedometerRød';
import { SpeedometerGul } from './SpeedometerGul';
import { SpeedometerGrønn } from './SpeedometerGrønn';
import classNames from 'classnames';
import { SpeedometerGrå } from './SpeedometerGrå';
import { KakediagramGrønn } from '../Kakediagram/KakediagramGrønn';

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

export const Speedometer: FunctionComponent<Props> = ({
    resultat,
    stor,
    className,
    inline,
    erGradert,
}) => {
    const størrelsesfaktor = stor ? 1.2 : 0.7;

    return inline ? (
        <span className={classNames(className, 'speedometer')}>
            <SpeedometerSvg
                resultat={resultat}
                størrelsesfaktor={størrelsesfaktor}
                erGradert={erGradert}
            />
        </span>
    ) : (
        <div className={classNames(className, 'speedometer')}>
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
            return <SpeedometerGrønn størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.MIDDELS:
            return <SpeedometerGul størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.OVER:
            if (erGradert && erGradert === true)
                return <KakediagramGrønn størrelsesfaktor={størrelsesfaktor} />;
            else return <SpeedometerRød størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.FEIL:
            return <SpeedometerGrå størrelsesfaktor={størrelsesfaktor} />;
    }
};
