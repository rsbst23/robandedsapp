<<<<<<< HEAD
import { create } from 'zustand';
import type { Order } from '../types/types';
=======
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theater } from "../types/types";
>>>>>>> 0f0198b2f9b0753c51a5eea5b90a4e114e405fbe

interface WaiterStore {
  selectedTheater: number;
<<<<<<< HEAD
  setSelectedTheater: (theaterId: number) => void;
  
  // Orders functionality
  orders: Order[];
  loading: boolean;
  error: string | null;
  setOrders: (orders: Order[]) => void;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: number, status: string) => void;
  removeOrder: (id: number) => void;
  clearError: () => void;
}

export const useWaiterStore = create<WaiterStore>((set) => ({
  selectedTheater: 0,
  setSelectedTheater: (theaterId) => set({ selectedTheater: theaterId }),
  
  // Orders state
  orders: [],
  loading: false,
  error: null,
  
  // Set the entire orders array
  setOrders: (orders) => set({ orders }),
  
  // Fetch orders from the API
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3008/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const orders: Order[] = await response.json();
      set({ orders, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred while fetching orders',
        loading: false 
      });
    }
  },
  
  // Add a new order to the store
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order]
  })),
  
  // Update order status
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status } : order
    )
  })),
  
  // Remove an order by id
  removeOrder: (id) => set((state) => ({
    orders: state.orders.filter(order => order.id !== id)
  })),
  
  // Clear error
  clearError: () => set({ error: null }),
}));
=======
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
>>>>>>> 0f0198b2f9b0753c51a5eea5b90a4e114e405fbe
