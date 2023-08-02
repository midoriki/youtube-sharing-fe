import VideoShare from '@interfaces/VideoShare';
import { create } from 'zustand';

interface VideoShareStore {
  videoShares: VideoShare[],
  paging: { page: number, perPage: number },
  totalPage: number,
  setVideoShares: (videoShares: VideoShare[]) => void,
  setTotalPage: (totalPage: number) => void,
  setPaging: (paging: {page: number, perPage: number}) => void
}

export const useVideoShareStore = create<VideoShareStore>((set) => ({
  videoShares: [],
  totalPage: 1,
  paging: { page: 1, perPage: 5 },
  setVideoShares: (videoShares: VideoShare[]) => set(() => ({ videoShares })),
  setTotalPage: ((totalPage: number) => set(() => ({ totalPage }))),
  setPaging: (paging: { page: number, perPage: number }) => set(() => ({ paging })),
}));