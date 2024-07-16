import { createStore, createTypedHooks, State } from 'easy-peasy';
import { isEqual } from 'lodash';

import AdminStore from '@/store/admin';
import DialogStore from '@/store/dialog';
import UserStore from '@/store/user';
import UsersListStore from '@/store/usersList';

const RootStore = {
  UserStore,
  UsersListStore,
  AdminStore,
  DialogStore,
};
export type TRootStore = typeof RootStore;
export const store = createStore(RootStore, {
  middleware: [], // Add your middle wares here.
});

const typedHooks = createTypedHooks<TRootStore>();

export const { useStore, useStoreActions, useStoreDispatch } = typedHooks;

export const useStoreState = <Result>(
  a: (state: State<TRootStore>) => Result,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b?: any,
) => typedHooks.useStoreState(a, b || isEqual);
