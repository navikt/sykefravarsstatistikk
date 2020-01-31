import React, { FunctionComponent } from 'react';
import { Brødsmule, BrødsmulestiConfig, finnBrødsmule } from '../brødsmulesti-utils';

interface Props {
    gjeldendeBrødsmule: Brødsmule;
    config: BrødsmulestiConfig;
}

const ListeMedLenker: FunctionComponent<Props> = props => {
    const { gjeldendeBrødsmule, config } = props;
    let liste = [<li key={gjeldendeBrødsmule.side}>{gjeldendeBrødsmule.lenketekst}</li>];

    let overordnetSide = gjeldendeBrødsmule.overordnetSide;
    while (overordnetSide) {
        const brødsmule = finnBrødsmule(overordnetSide, config);
        liste.push(<li key={brødsmule.side}>{brødsmule.lenke(brødsmule.lenketekst)}</li>);
    }

    liste.reverse();
    return <ol className="brødsmulesti__liste">{liste}</ol>;
};

export default ListeMedLenker;
