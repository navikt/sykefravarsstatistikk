import { InstitusjonellSektorkode } from '../enhetsregisteret/domene/enhet';

export type Sektor = 'offentlig' | 'privat';

export const sektorkoderForOffentligeVirksomheter = ['6100', '6500', '3900', '3100'];
export const mapTilPrivatEllerOffentligSektor = (
    institusjonellSektorkode: InstitusjonellSektorkode
): Sektor => {
    return sektorkoderForOffentligeVirksomheter.includes(institusjonellSektorkode.kode)
        ? 'offentlig'
        : 'privat';
};
