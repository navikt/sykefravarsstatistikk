import React, { ReactElement } from 'react';

export interface Tips {
    tittel: string;
    ingress: string;
    tidsbruk: ReactElement | string;
    lenke: { tekst: string; href: string };
    img: { src: string; alt: string };
}
