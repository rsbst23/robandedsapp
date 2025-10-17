import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, Theater } from '../types/types';

interface WaiterStore {
  selectedTheater: number;
  assignedTheaterId: number | null;
  assignedTheater: Theater | null;
  assignmentTimestamp: Date | null;
  isAssigned: boolean;

  // Orders functionality
  orders: Order[];
  loading: boolean;
  error: string | null;

  // Theater assignment actions
  setSelectedTheater: (theaterId: number) => void;
  assignToTheater: (theaterId: number, theater: Theater) => void;
  clearAssignment: () => void;
  updateAssignedTheater: (theater: Theater) => void;

  // Orders actions
  setOrders: (orders: Order[]) => void;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: number, status: string) => Promise<void>;
  removeOrder: (id: number) => void;
  clearError: () => void;
}

export const useWaiterStore = create<WaiterStore>()(
  persist(
    (set, get) => ({
      selectedTheater: 0,
      assignedTheaterId: null,
      assignedTheater: null,
      assignmentTimestamp: null,
      isAssigned: false,

      // Orders state
      orders: [],
      loading: false,
      error: null,

      // Theater assignment actions
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

      // Orders actions
      setOrders: (orders) => set({ orders }),

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

      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),

      updateOrderStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`http://localhost:3008/orders/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
          });

          if (!response.ok) {
            throw new Error(`Failed to update order status: ${response.statusText}`);
          }

          // Update local state after successful API call
          set((state) => ({
            orders: state.orders.map(order => 
              order.id === id ? { ...order, status } : order
            ),
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred while updating order status',
            loading: false 
          });
          throw error; // Re-throw to allow handling in components
        }
      },

      removeOrder: (id) => set((state) => ({
        orders: state.orders.filter(order => order.id !== id)
      })),

      clearError: () => set({ error: null }),
    }),
    {
      name: "waiter-assignment-storage",
    }
  )
);
