import React, { FunctionComponent, ReactElement } from 'react';
import './Brødsmulesti.less';
import { VenstreChevron } from 'nav-frontend-chevron';
import { BrødsmulestiConfig, defaultBrødsmulestiConfig } from './brødsmulesti-utils';

interface Props {
    gjeldendeSide: 'sykefraværsstatistikk' | 'kalkulator';
    config?: BrødsmulestiConfig;
}

const lagListeMedLenker = (
    indexOfGjeldendeSmule: number,
    config: BrødsmulestiConfig
): (ReactElement | null)[] => {
    return config.map((brødsmule, index) => {
        if (index < indexOfGjeldendeSmule) {
            return <li key={brødsmule.side}>{brødsmule.lenke(brødsmule.lenketekst)}</li>;
        } else if (index === indexOfGjeldendeSmule) {
            return <li key={brødsmule.side}>{brødsmule.lenketekst}</li>;
        }
        return null;
    });
};

const Brødsmulesti: FunctionComponent<Props> = props => {
    const config = props.config
        ? { ...defaultBrødsmulestiConfig, ...props.config }
        : defaultBrødsmulestiConfig;

    const gjeldendeSmule = config.find(brødsmule => brødsmule.side === props.gjeldendeSide);
    if (!gjeldendeSmule) {
        return null;
    }

    const indexOfGjeldendeSmule = config.indexOf(gjeldendeSmule);
    const forrigeSmule = config[indexOfGjeldendeSmule - 1];

    const listeMedLenker = lagListeMedLenker(indexOfGjeldendeSmule, config);

    return (
        <nav className="brødsmulesti">
            <ol className="brødsmulesti__liste">{listeMedLenker}</ol>
            <div className="brødsmulesti__tilbakeknapp">
                {forrigeSmule.lenke(
                    <>
                        <VenstreChevron />
                        {forrigeSmule.lenketekst}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Brødsmulesti;
