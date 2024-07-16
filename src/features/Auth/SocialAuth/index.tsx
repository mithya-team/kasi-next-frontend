import Link from 'next/link';
import { FC } from 'react';

import SecondaryButton from '@/components/Buttons/SecondaryButton';
import SvgIcon from '@/components/SvgIcon';

import { APP_CONFIG } from '@/constant/config';

export const GOOGLE_AUTH_LINK = APP_CONFIG.API_URL + '/auth/google/coach-login';

export interface SocialAuth {
  title: string;
}
const SocialAuth: FC<SocialAuth> = ({ title }) => {
  return (
    <Link
      href={GOOGLE_AUTH_LINK}
      target='_self'
      className='flex items-center justify-center bg-black-1 h-full  gap-2.5 w-full border-0  hover:bg-black-1 rounded-[10px] px-5 py-2.5'
    >
      <SvgIcon name='google' />
      <SecondaryButton> {title}</SecondaryButton>
    </Link>
  );
};

export default SocialAuth;
