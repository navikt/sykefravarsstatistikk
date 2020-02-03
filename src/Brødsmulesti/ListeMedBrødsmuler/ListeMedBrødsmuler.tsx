import React, { FunctionComponent } from 'react';
import { Brødsmule, BrødsmulestiConfig, finnBrødsmule } from '../brødsmulesti-utils';
import './ListeMedBrødsmuler.less';

interface Props {
    gjeldendeBrødsmule: Brødsmule;
    config: BrødsmulestiConfig;
}

const ListeMedBrødsmuler: FunctionComponent<Props> = props => {
    const { gjeldendeBrødsmule, config } = props;
    let liste = [<li key={gjeldendeBrødsmule.side}>{gjeldendeBrødsmule.lenketekst}</li>];

    let overordnetSide = gjeldendeBrødsmule.overordnetSide;
    while (overordnetSide) {
        const brødsmule = finnBrødsmule(overordnetSide, config);
        liste.push(<li key={brødsmule.side}>{brødsmule.lenke(brødsmule.lenketekst)}</li>);
        overordnetSide = brødsmule.overordnetSide;
    }

    liste.reverse();
    return <ol className="liste-med-brødsmuler">{liste}</ol>;
};

export default ListeMedBrødsmuler;
