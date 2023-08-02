import User from '@interfaces/User';
import { create } from 'zustand';

interface ProfileStore {
  user: User | null;
  setUser: (user: User | null) => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
}));