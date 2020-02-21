import React, { FunctionComponent, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { ToggleGruppePure } from 'nav-frontend-toggle';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import './GrafOgTabell.less';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const GrafOgTabell: FunctionComponent<Props> = props => {
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf' | 'tabell'>('tabell');

    const innhold =
        grafEllerTabell === 'graf' ? (
            <Graf />
        ) : (
            <Tabell restSykefraværsstatistikk={props.restSykefraværsstatistikk} />
        );

    return (
        <div className="graf-og-tabell">
            <ToggleGruppePure
                toggles={[
                    {
                        children: 'Graf',
                        pressed: grafEllerTabell === 'graf',
                        onClick: () => setGrafEllerTabell('graf'),
                    },
                    {
                        children: 'Tabell',
                        pressed: grafEllerTabell === 'tabell',
                        onClick: () => setGrafEllerTabell('tabell'),
                    },
                ]}
            />
            {innhold}
        </div>
    );
};

export default GrafOgTabell;
