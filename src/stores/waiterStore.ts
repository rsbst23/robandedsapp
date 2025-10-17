import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theater } from "../types/types";

interface WaiterStore {
  selectedTheater: number;
  assignedTheaterId: number | null;
  assignedTheater: Theater | null;
  assignmentTimestamp: Date | null;
  isAssigned: boolean;

  // Actions
  setSelectedTheater: (theaterId: number) => void;
  assignToTheater: (theaterId: number, theater: Theater) => void;
  clearAssignment: () => void;
  updateAssignedTheater: (theater: Theater) => void;
}

export const useWaiterStore = create<WaiterStore>()(
  persist(
    (set, get) => ({
      selectedTheater: 0,
      assignedTheaterId: null,
      assignedTheater: null,
      assignmentTimestamp: null,
      isAssigned: false,

      setSelectedTheater: (theaterId) => set({ selectedTheater: theaterId }),

      assignToTheater: (theaterId: number, theater: Theater) => {
        set({
          selectedTheater: theaterId,
          assignedTheaterId: theaterId,
          assignedTheater: theater,
          assignmentTimestamp: new Date(),
          isAssigned: true,
        });
      },

      clearAssignment: () => {
        set({
          assignedTheaterId: null,
          assignedTheater: null,
          assignmentTimestamp: null,
          isAssigned: false,
        });
      },

      updateAssignedTheater: (theater: Theater) => {
        const state = get();
        if (state.assignedTheaterId === theater.id) {
          set({
            assignedTheater: theater,
          });
        }
      },
    }),
    {
      name: "waiter-assignment-storage", // name of the item in localStorage
    }
  )
);
