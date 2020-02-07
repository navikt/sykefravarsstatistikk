import { Legend } from 'recharts';
import React from 'react';
import { getFarge, getSymbol } from '../Graf';
import './grafLegend.less';

const labels = {
    virksomhet: <span className="graf__virksomhet-label">Hoppetitten barnehage</span>,
    næring: (
        <span className="graf__næring-label">
            <span className="graf__næring-label-tittel">Bransje:</span>
            <br /> <span>Barnehager</span>
        </span>
    ),
    sektor: (
        <>
            <span>Sektor:</span> <div>Privat og offentlig næringsvirksomhet</div>
        </>
    ),
    land: <span>Norge</span>,
};

const grafLegend = () => <Legend
    wrapperStyle={{ paddingTop: 50 }}
    iconSize={20}
    formatter={(value, entry, index) => (labels as any)[value]}
    payload={[
        {
            value: 'virksomhet',
            type: getSymbol('virksomhet'),
            id: 'virksomhet',
            color: getFarge('virksomhet'),
        },
        {
            value: 'næring',
            type: getSymbol('næring'),
            id: 'næring',
            color: getFarge('næring'),
        },
        {
            value: 'sektor',
            type: getSymbol('sektor'),
            id: 'sektor',
            color: getFarge('sektor'),
        },
        {
            value: 'land',
            type: getSymbol('land'),
            id: 'land',
            color: getFarge('land'),
        },
    ]}
/>;

export default grafLegend;
