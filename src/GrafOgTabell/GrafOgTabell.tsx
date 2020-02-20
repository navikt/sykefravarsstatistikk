import { FunctionComponent, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';


interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const GrafOgTabell: FunctionComponent<Props> = (props) => {
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf'|'tabell'>('tabell');
    return null;
}
