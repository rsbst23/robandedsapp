import { create } from 'zustand';
//import type { Film, Seat } from '../types/types';

interface WaiterStore  {
  selectedTheater: number;
  setSelectedTheater: (theaterId: number) => void; 
}

export const useWaiterStore = create<WaiterStore>((set) => ({
    selectedTheater: 0,
    setSelectedTheater: (theaterId) => set({ selectedTheater: theaterId }),
}));