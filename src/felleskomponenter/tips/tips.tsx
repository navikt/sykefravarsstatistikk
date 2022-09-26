import {ReactElement} from 'react';
import {fåNedKorttidsfravær} from './tips-innhold';
import {SammenligningsType} from '../../Forside/vurderingstekster';

export interface Tips {
  id: string;
  tittel: string;
  ingress: ReactElement | string;
  tidsbruk?: ReactElement | string;
  href: string;
  img: { src: string; alt: string };
}

export const getTips = (type: SammenligningsType): Tips[] => {
  switch (type) {
    case SammenligningsType.KORTTID:
      return [fåNedKorttidsfravær];
    case SammenligningsType.LANGTID:
      return [];
    case SammenligningsType.TOTALT:
      return [];
    case SammenligningsType.GRADERT:
      return [];
  }
};
