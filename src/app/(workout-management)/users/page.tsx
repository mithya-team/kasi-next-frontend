'use client';
import { isAxiosError } from 'axios';
import Image from 'next/image';
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
import HeaderFilter, { IConfig } from '@/features/HeaderFilter';
import withAuth from '@/hoc/withAuth';
import adminModel from '@/models/admin/admin.model';
import { UnConfirmedUserWithDetails } from '@/models/admin/admin.types';
import { ProductPlanId, User } from '@/models/user/user.types';

export type ActionType = 'decline' | 'accept';

const UsersListingPage: FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<
    User | UnConfirmedUserWithDetails | null
  >(null);

  const {
    usersList,
    isLoading,
    admin,
    unConfirmedUsers,
    hasMore,
    usersScreenFilter,
    isSuperAdmin,
    usersScreenSort,
  } = useStoreState(
    ({
      UserStore: { usersList, isLoading, hasMore },
      AdminStore: { admin, unConfirmedUsers, isSuperAdmin },
      filterStore: { usersScreenFilter, usersScreenSort },
    }) => ({
      usersList,
      isLoading,
      admin,
      unConfirmedUsers,
      hasMore,
      usersScreenFilter,
      isSuperAdmin,
      usersScreenSort,
    }),
  );

  const {
    fetchUsersList,
    fetchUserConnections,
    updateConfirmedUsers,
    updateUsersScreenSort,
    updateUsersScreenFilter,
  } = useStoreActions(
    ({
      UserStore: { fetchUsersList },
      AdminStore: {
        fetchUnConfirmedUsers: fetchUserConnections,
        updateConfirmedUsers,
      },
      filterStore: { updateUsersScreenSort, updateUsersScreenFilter },
    }) => ({
      fetchUsersList,
      fetchUserConnections,
      updateConfirmedUsers,
      updateUsersScreenSort,
      updateUsersScreenFilter,
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

  const handleCheckboxChange = async (config: IConfig) => {
    const isSelected = usersScreenFilter.includes(config.id as ProductPlanId);

    const newSelectedItems = isSelected
      ? usersScreenFilter.filter((id) => id !== config.id)
      : [...usersScreenFilter, config.id];
    try {
      updateUsersScreenFilter(newSelectedItems as ProductPlanId[]);
      await fetchUsersList({
        planIds: newSelectedItems as ProductPlanId[],
        sort: `${usersScreenSort === 'asc' ? '+' : '-'}createdAt`,
        page: 1,
      });
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const filteredUnconfirmedUsers = unConfirmedUsers?.filter(
    (unconfirmedUser) =>
      (unconfirmedUser.status === 'requested' ||
        unconfirmedUser.status === 'connected') &&
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

  useEffect(() => {
    if (usersList?.length && admin) {
      const userIds = usersList?.map((user) => user._id);
      fetchUserConnections({ coachId: admin._id, userIds });
    }
    return () => {
      setDialogOpen(false);
      setActionType(undefined);
    };
  }, [admin]);

  return (
    <div
      id='users-scrollable-div'
      className='w-full px-5 font-medium font-primary h-full overflow-y-scroll'
    >
      <div className='flex sticky top-0 bg-gray-800 text-base text-gray-400 mb-5'>
        <div className='flex-1 py-3 pl-5'>Runner</div>
        {isSuperAdmin ? <div className='flex-1 py-3 pl-5'>Coach</div> : null}
        <div className='w-[12%] flex flex-row justify-between py-3 pl-5'>
          <Typo>Joined</Typo>
          <Button
            onClick={() => {
              fetchUsersList({
                page: 1,
                sort: `${usersScreenSort === 'asc' ? '-' : '+'}createdAt`,
                planIds: usersScreenFilter as ProductPlanId[],
              });
              updateUsersScreenSort(usersScreenSort === 'asc' ? 'desc' : 'asc');
              setCurrentPage(1);
            }}
            className='mr-5 transform transition-transform'
          >
            <Image
              src={
                usersScreenSort === 'desc'
                  ? '/images/desc.png'
                  : '/images/asc.png'
              }
              alt='sort-icon'
              width={16}
              height={16}
            />
          </Button>
        </div>
        <div className='w-[16.91%] flex flex-row justify-between py-3 px-5'>
          <Typo>Membership</Typo>
          <HeaderFilter handleCheckboxChange={handleCheckboxChange} />
        </div>
        <div className='flex-1 py-3 pl-5'>Email</div>
        <div className='w-[18%] py-3 pl-5'>Connection Status</div>
      </div>
      {allUsers.length ? (
        <InfiniteScroll
          next={() => {
            fetchUsersList({
              page: currentPage + 1,
              sort: `${usersScreenSort === 'asc' ? '+' : '-'}createdAt`,
              planIds: usersScreenFilter as ProductPlanId[],
            });
            setCurrentPage((prevPage) => prevPage + 1);
          }}
          hasMore={hasMore}
          loader={<Loader />}
          dataLength={(usersList ?? []).length}
          scrollableTarget='users-scrollable-div'
          scrollThreshold={0.5}
        >
          {allUsers?.map((user) => (
            <UsersListTable
              onAction={openConfirmationDialog}
              user={user}
              key={user?._id}
              isSuperAdmin={isSuperAdmin}
            />
          ))}
        </InfiniteScroll>
      ) : isLoading ? (
        <Loader />
      ) : (
        <Empty />
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
              : `This action is irreversible and ${selectedUser?.fullName} will no longer be able to connect.`}
          </Typo>
        </div>
      </ConfirmationDialog>
    </div>
  );
};

export default withAuth(UsersListingPage);
