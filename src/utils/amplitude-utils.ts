import { InstitusjonellSektorkode } from '../api/enhetsregisteret-api';
import { Sektor } from '../amplitude/amplitude';

export const mapTilPrivatElleOffentligSektor = (
    institusjonellSektorkode: InstitusjonellSektorkode
): Sektor => {
    const offentligBarnehageInstitusjonelSektorkoder = ['6100', '6500'];

    return offentligBarnehageInstitusjonelSektorkoder.find((value) => {
        return institusjonellSektorkode.verdi === value;
    })
        ? 'offentlig'
        : 'privat';
};
