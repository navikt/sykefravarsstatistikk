import React, { FunctionComponent } from 'react';
import { SpeedometerRød } from './SpeedometerRød';
import { SpeedometerGul } from './SpeedometerGul';
import { SpeedometerGrønn } from './SpeedometerGrønn';
import './Speedometer.less';
import classNames from 'classnames';
import { SpeedometerGrå } from './SpeedometerGrå';

export enum SykefraværResultat {
    UNDER = 'UNDER',
    MIDDELS = 'MIDDELS',
    OVER = 'OVER',
    MASKERT = 'MASKERT',
    INGEN_DATA = 'INGEN_DATA',
    UFULLSTENDIG_DATA = 'UFULLSTENDIG_DATA',
    FEIL = 'FEIL',
}

interface Props {
    resultat: SykefraværResultat;
    stor?: boolean;
    className?: string;
}

export const Speedometer: FunctionComponent<Props> = ({ resultat, stor, className }) => {
    const størrelsesfaktor = stor ? 1.2 : 0.7;
    return (
        <div className={classNames(className, 'speedometer')}>
            <SpeedometerSvg resultat={resultat} størrelsesfaktor={størrelsesfaktor} />
        </div>
    );
};

const SpeedometerSvg: FunctionComponent<{
    resultat: SykefraværResultat;
    størrelsesfaktor: number;
}> = ({ resultat, størrelsesfaktor }) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return <SpeedometerGrønn størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværResultat.MIDDELS:
            return <SpeedometerGul størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværResultat.OVER:
            return <SpeedometerRød størrelsesfaktor={størrelsesfaktor} />;
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.FEIL:
            return <SpeedometerGrå størrelsesfaktor={størrelsesfaktor} />;
    }
};
