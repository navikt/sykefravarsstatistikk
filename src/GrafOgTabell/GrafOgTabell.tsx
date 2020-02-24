import React, { FunctionComponent, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { ToggleGruppePure } from 'nav-frontend-toggle';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import './GrafOgTabell.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const GrafOgTabell: FunctionComponent<Props> = props => {
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf' | 'tabell'>('tabell');

    const innhold =
        grafEllerTabell === 'graf' ? (
            <Graf restSykefraværsstatistikk={props.restSykefraværsstatistikk} />
        ) : (
            <Tabell restSykefraværsstatistikk={props.restSykefraværsstatistikk} />
        );

    return (
        <div className="graf-og-tabell__wrapper">
            <div className="graf-og-tabell">
                <div className="graf-og-tabell__tekst-wrapper">
                    <Systemtittel tag="h1" className="graf-og-tabell__tittel">
                        Se sykefraværet over tid
                    </Systemtittel>
                    <Normaltekst className="graf-og-tabell__ingress">
                        Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du kan
                        sammenligne sykefraværet deres med næringen og sektoren dere tilhører.
                    </Normaltekst>
                </div>
                <ToggleGruppePure
                    className="graf-og-tabell__knapper"
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
                <div className="graf-og-tabell__innhold">{innhold}</div>
            </div>
        </div>
    );
};

export default GrafOgTabell;
