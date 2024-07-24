import { User } from '@/models/user/user.types';

export type UnConfirmedUserStatus =
  | 'requested'
  | 'connected'
  | 'disconnected'
  | 'declined';
export interface UnConfirmedUser {
  _id: string;
  userId: string;
  coachId: string;
  status?: UnConfirmedUserStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UnConfirmedUserWithDetails
  extends Omit<UnConfirmedUser, 'userId'>,
    User {}
