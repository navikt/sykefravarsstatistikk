import React, { FunctionComponent } from 'react';
import { Table, Label, BodyLong } from "@navikt/ds-react";
import Tabellrader from './Tabellrader';
import {
    BransjeEllerNæringLabel,
    getBransjeEllerNæringLabel,
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestSykefraværshistorikk } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../../api/api-utils';

export interface TabellProps {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    harOverordnetEnhet: boolean;
    bransjeEllerNæringLabel: BransjeEllerNæringLabel;
    historikkLabels: HistorikkLabels;
}

const Tabell: FunctionComponent<TabellProps> = ({
    kvartalsvisSammenligning,
    historikkLabels,
    bransjeEllerNæringLabel,
    harOverordnetEnhet,
}) => {
    const headerOverordnetEnhet = () => {
        if (harOverordnetEnhet) {
            return (
                <Table.HeaderCell scope="col" align="right">
                    <Label>Overordnet enhet</Label>
                    <BodyLong>{historikkLabels.overordnetEnhet}</BodyLong>
                </Table.HeaderCell>
            );
        }
    };

    return (
        <div className="graf-tabell__wrapper">
            <Table zebraStripes={true}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope={'col'}>År</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kvartal</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="right">
                            <Label>Din virksomhet</Label>{' '}
                            <BodyLong>{historikkLabels.virksomhet}</BodyLong>
                        </Table.HeaderCell>
                        {headerOverordnetEnhet()}
                        <Table.HeaderCell scope="col" align="right">
                            <Label>{bransjeEllerNæringLabel}</Label>{' '}
                            <BodyLong>{historikkLabels.næringEllerBransje}</BodyLong>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="right">
                            <Label>Sektor</Label>{' '}
                            <BodyLong>{historikkLabels.sektor}</BodyLong>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="right">
                            {historikkLabels.land}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        <Tabellrader
                            kvartalsvisSammenligning={kvartalsvisSammenligning}
                            harOverordnetEnhet={harOverordnetEnhet}
                        />
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export function hentTabellProps(
    restSykefraværsstatistikk: RestSykefraværshistorikk
): TabellProps | undefined {
    if (restSykefraværsstatistikk.status === RestStatus.Suksess) {
        const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
        const bransjeEllerNæringLabel = getBransjeEllerNæringLabel(restSykefraværsstatistikk.data);
        const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
            restSykefraværsstatistikk.data
        );
        const kvartalsvisSammenligningReversed = kvartalsvisSammenligning.toReversed();

        return {
            harOverordnetEnhet,
            bransjeEllerNæringLabel,
            historikkLabels,
            kvartalsvisSammenligning: kvartalsvisSammenligningReversed,
        };
    }
}

export default Tabell;
