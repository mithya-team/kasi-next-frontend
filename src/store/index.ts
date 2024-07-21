import { createStore, createTypedHooks, State } from 'easy-peasy';
import { isEqual } from 'lodash';

import AdminStore from '@/store/admin';
import UserStore from '@/store/user';
import WorkoutStore from '@/store/workout';

const RootStore = {
  UserStore,
  WorkoutStore,
  AdminStore,
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
