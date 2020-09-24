import { InstitusjonellSektorkode } from '../api/enhetsregisteret-api';
import { Sektor } from '../amplitude/amplitude';

export const sektorkoderForOffentligeVirksomheter = ['6100', '6500', '3900', '3100'];
export const mapTilPrivatElleOffentligSektor = (
    institusjonellSektorkode: InstitusjonellSektorkode
): Sektor => {
    return sektorkoderForOffentligeVirksomheter.includes(institusjonellSektorkode.verdi)
        ? 'offentlig'
        : 'privat';
};
