'use client';
import { isAxiosError } from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { toast } from '@/lib/toast';

import Button from '@/components/Buttons';
import Loader from '@/components/Loader';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import Empty from '@/app/(workout-management)/users/Empty';
import UsersListTable, {
  isUnConfirmedUserWithDetails,
} from '@/app/(workout-management)/users/UsersListTable';
import ConfirmationDialog from '@/features/ConfirmationDialog';
import withAuth from '@/hoc/withAuth';
import adminModel from '@/models/admin/admin.model';
import { UnConfirmedUserWithDetails } from '@/models/admin/admin.types';
import { User } from '@/models/user/user.types';

export type ActionType = 'decline' | 'accept';

const UsersListingPage: FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<
    User | UnConfirmedUserWithDetails | null
  >(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { usersList, isLoading, admin, unConfirmedUsers, hasMore } =
    useStoreState(
      ({
        UserStore: { usersList, isLoading, hasMore },
        AdminStore: { admin, unConfirmedUsers },
      }) => ({
        usersList,
        isLoading,
        admin,
        unConfirmedUsers,
        hasMore,
      }),
    );

  const { fetchUsersList, fetchUserConnections, updateConfirmedUsers } =
    useStoreActions(
      ({
        UserStore: { fetchUsersList },
        AdminStore: {
          fetchUnConfirmedUsers: fetchUserConnections,
          updateConfirmedUsers,
        },
      }) => ({
        fetchUsersList,
        fetchUserConnections,
        updateConfirmedUsers,
      }),
    );

  const openConfirmationDialog = (
    user: User | UnConfirmedUserWithDetails,
    action: ActionType,
  ) => {
    setSelectedUser(user);
    setActionType(action);
    setDialogOpen(true);
  };
  const closeConfirmationDialog = () => {
    setActionType(undefined);
    setDialogOpen(false);
  };

  const onAgree = async () => {
    if (!admin?._id) return;
    try {
      if (selectedUser && isUnConfirmedUserWithDetails(selectedUser)) {
        if (actionType === 'accept') {
          await adminModel.acceptRequest(selectedUser?._id, admin?._id);
          updateConfirmedUsers({ action: 'UPDATE', user: selectedUser });
          toast.success('Connected Successfully!');
        } else if (actionType === 'decline') {
          await adminModel.deleteRequest(selectedUser?._id, admin?._id);
          updateConfirmedUsers({ action: 'REMOVE', user: selectedUser });
          toast.success('Connection Decline!');
        }
      }
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    } finally {
      setDialogOpen(false);
    }
  };

  const filteredUnconfirmedUsers = unConfirmedUsers?.filter(
    (unconfirmedUser) =>
      unconfirmedUser.status === 'requested' &&
      usersList?.some((user) => user._id === unconfirmedUser._id),
  );

  const filteredUsersList = usersList?.filter(
    (user) =>
      !filteredUnconfirmedUsers?.some(
        (unconfirmedUser) => unconfirmedUser._id === user._id,
      ),
  );

  const allUsers = useMemo(
    () => [...(filteredUnconfirmedUsers || []), ...(filteredUsersList || [])],
    [filteredUnconfirmedUsers, usersList],
  );

  const handleSortClick = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1); // Reset to the first page when sorting
  };

  useEffect(() => {
    fetchUsersList({
      page: currentPage,
      sort: `${sortOrder === 'asc' ? '+' : '-'}createdAt`,
    });

    return () => {
      setDialogOpen(false);
      setActionType(undefined);
    };
  }, [currentPage, sortOrder]);

  useEffect(() => {
    if (usersList?.length && admin) {
      const userIds = usersList?.map((user) => user._id);
      fetchUserConnections({ coachId: admin._id, userIds });
    }
  }, [usersList, admin]);

  if (isLoading && !usersList?.length) return <Loader className='h-[100vh]' />;

  return (
    <div
      id='users-scrollable-div'
      className='w-full px-5 font-medium font-primary h-full overflow-y-scroll'
    >
      <div className='flex bg-gray-800 text-base text-gray-400 mb-5'>
        <div className='flex-1 py-3 pl-5'>Username</div>
        <div className='w-[12%] flex flex-row justify-between py-3 pl-5'>
          <Typo>Joined</Typo>
          <Button
            onClick={handleSortClick}
            className={`mr-5 transform transition-transform ${
              sortOrder === 'desc' ? '' : 'rotate-180'
            }`}
          >
            <SvgIcon pathFill='#9CA3AF' name='down-arrow' />
          </Button>
        </div>
        <div className='w-[16.91%] py-3 pl-5'>Plan</div>
        <div className='flex-1 py-3 pl-5'>Email</div>
        <div className='w-[18%] py-3 pl-5'>Membership Status</div>
      </div>
      {!allUsers.length ? (
        <Empty />
      ) : (
        <InfiniteScroll
          next={() => setCurrentPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={undefined}
          dataLength={usersList?.length ?? 0}
          scrollableTarget='users-scrollable-div'
          scrollThreshold={0.5}
        >
          {allUsers?.map((user) => (
            <UsersListTable
              onAction={openConfirmationDialog}
              user={user}
              key={user?._id}
            />
          ))}
        </InfiniteScroll>
      )}
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={closeConfirmationDialog}
        onAgree={onAgree}
      >
        <SvgIcon
          name={actionType === 'accept' ? 'user-dialog' : 'delete-user'}
        />
        <div className='flex flex-col gap-5'>
          <Typo
            level='h2'
            classes='font-secondary tracking-[-0.225px] text-center font-semibold text-gray-50'
          >
            {`Are you sure you want  to ${actionType === 'accept' ? 'connect with ' : 'decline the joining request from'} ${selectedUser?.fullName}?`}
          </Typo>
          <Typo classes='font-primary text-gray-500 text-base text-center'>
            {actionType === 'accept'
              ? `${selectedUser?.fullName} has requested to join you.`
              : `       Please confirm if you wish to decline ${selectedUser?.fullName} request to join. This action cannot be undone.`}
          </Typo>
        </div>
      </ConfirmationDialog>
    </div>
  );
};

export default withAuth(UsersListingPage);
