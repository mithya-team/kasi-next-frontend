import Link from 'next/link';
import { FC } from 'react';

import { getPlanStatusTag, parseDate } from '@/lib/utils';

import Button from '@/components/Buttons';

import { ActionType } from '@/app/(workout-management)/users/page';
import { UnConfirmedUserWithDetails } from '@/models/admin/admin.types';
import { User } from '@/models/user/user.types';

interface UsersListTableProps {
  user: User | UnConfirmedUserWithDetails | null;
  onAction?: (
    user: User | UnConfirmedUserWithDetails,
    action: ActionType,
  ) => void;
  isSuperAdmin?: boolean;
}

const UsersListTable: FC<UsersListTableProps> = ({
  user,
  onAction,
  isSuperAdmin = false,
}) => {
  const { status, className } = getPlanStatusTag(
    user?.athleteSubscription?.[0],
  );
  if (
    !user ||
    (isUnConfirmedUserWithDetails(user) && user?.status === 'declined')
  )
    return <></>;
  return (
    <Link
      href={`/user/${user._id}`}
      className='flex border-b border-gray-800 text-sm leading-[14px] text-white'
    >
      <div className='flex-1 p-5 text-base text-ellipsis overflow-hidden text-gray-400 font-medium'>
        {user?.fullName}
      </div>
      {isSuperAdmin ? (
        <div className='flex-1 p-5 text-ellipsis overflow-hidden'>
          {user?.coachConnection?.coachDetails?.fullName ?? '-'}
        </div>
      ) : null}
      <div className='w-[12%] p-5'>
        {parseDate(user?.createdAt, 'MMMM D, YYYY')}
      </div>
      <div className={`w-[16.91%] p-5 ${className}`}>{status}</div>
      <div className='flex-1 p-5 text-ellipsis overflow-hidden'>
        {user?.email}
      </div>
      {renderUnconfirmedUserStatus(user, onAction)}
    </Link>
  );
};

export default UsersListTable;

function renderUnconfirmedUserStatus(
  user: User | UnConfirmedUserWithDetails,
  onAction: UsersListTableProps['onAction'],
) {
  if (isUnConfirmedUserWithDetails(user)) {
    if (user.status === 'requested') {
      return <CoachActions onClick={(action) => onAction?.(user, action)} />;
    } else if (user.status === 'connected') {
      return <div className='w-[18%] p-5 text-gray-500'>Connected</div>;
    }
  }
  return <div className='w-[18%] p-5 text-gray-500'>Member already exists</div>;
}
interface CoachActionsProps {
  onClick: (action: ActionType) => void;
}
const CoachActions: FC<CoachActionsProps> = ({ onClick }) => {
  return (
    <div className='w-[18%] px-5 py-2.5 flex flex-row gap-3 font-primary text-white font-medium text-sm leading-[14px]'>
      <Button
        onClick={() => onClick('decline')}
        className='rounded-[10px] px-5 py-2.5 bg-red-1'
      >
        Decline
      </Button>
      <Button
        onClick={() => onClick('accept')}
        className='rounded-[10px] px-5 py-2.5 bg-green-1'
      >
        Accept
      </Button>
    </div>
  );
};

export function isUnConfirmedUserWithDetails(
  user: User | UnConfirmedUserWithDetails,
): user is UnConfirmedUserWithDetails {
  return (user as UnConfirmedUserWithDetails).status !== undefined;
}
