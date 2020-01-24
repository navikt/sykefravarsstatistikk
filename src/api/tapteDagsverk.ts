import { RestRessurs } from './api-utils';

export interface TapteDagsverk {
    årstall: number;
    kvartal: number;
    tapteDagsverk: number;
}
export type RestTapteDagsverk = RestRessurs<TapteDagsverk[]>;
