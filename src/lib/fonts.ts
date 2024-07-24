import { Barlow_Condensed, Inter } from 'next/font/google';

const inter_init = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const barlow_init = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-barlow',
});

export const inter = inter_init.variable;
export const barlow = barlow_init.variable;
