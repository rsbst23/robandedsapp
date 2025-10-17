import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TheaterArea from "./TheaterArea";
import type { Theater } from "../../types/types";

// Mock the waiter store
const mockAssignToTheater = vi.fn();
const mockClearAssignment = vi.fn();

vi.mock("../../stores/waiterStore", () => ({
  useWaiterStore: () => ({
    assignedTheaterId: null,
    assignedTheater: null,
    isAssigned: false,
    assignToTheater: mockAssignToTheater,
    clearAssignment: mockClearAssignment,
  }),
}));

// Mock fetch globally
global.fetch = vi.fn();

const mockTheaters: Theater[] = [
  {
    id: 1,
    name: "Main Theater",
    tables: [
      {
        id: 1,
        table_number: 1,
        row: 1,
        column: 1,
        seats: [
          { id: 1, seat_number: 1, price: 15.99 },
          { id: 2, seat_number: 2, price: 15.99 },
          { id: 3, seat_number: 3, price: 15.99 },
        ],
      },
      {
        id: 2,
        table_number: 2,
        row: 1,
        column: 2,
        seats: [
          { id: 4, seat_number: 1, price: 15.99 },
          { id: 5, seat_number: 2, price: 15.99 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "VIP Theater",
    tables: [
      {
        id: 3,
        table_number: 1,
        row: 1,
        column: 1,
        seats: [
          { id: 6, seat_number: 1, price: 25.99 },
          { id: 7, seat_number: 2, price: 25.99 },
          { id: 8, seat_number: 3, price: 25.99 },
          { id: 9, seat_number: 4, price: 25.99 },
        ],
      },
    ],
  },
];

const mockSelectedTheater: Theater = mockTheaters[0];

// Create a wrapper component for testing
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("TheaterArea Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockImplementation((url: string) => {
      if (url.includes("/Theaters") && !url.includes("/Theaters/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTheaters),
        });
      }
      if (url.includes("/Theaters/1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSelectedTheater),
        });
      }
      return Promise.reject(new Error("Unknown URL"));
    });
  });

  it("shows loading spinner while fetching theaters", async () => {
    (global.fetch as any).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve(mockTheaters),
              }),
            100
          )
        )
    );
    render(<TheaterArea />, { wrapper: createWrapper() });
    expect(screen.getByText("Loading theaters...")).toBeInTheDocument();
    expect(document.querySelector(".loading-spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Loading theaters...")).not.toBeInTheDocument();
    });
  });

  it("renders dropdown with correct theater options", async () => {
    render(<TheaterArea />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByLabelText("Theater Area")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Main Theater (2 tables - 5 seats)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("VIP Theater (1 tables - 4 seats)")
    ).toBeInTheDocument();
  });

  it("calls assignToTheater when assign button is clicked", async () => {
    const user = userEvent.setup();
    render(<TheaterArea />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByLabelText("Theater Area")).toBeInTheDocument();
    });
    const select = screen.getByLabelText("Theater Area");
    await user.selectOptions(select, "1");
    await waitFor(() => {
      expect(screen.getByText("🎯 Assign Me to This Area")).toBeEnabled();
    });
    const assignButton = screen.getByText("🎯 Assign Me to This Area");
    await user.click(assignButton);
    expect(mockAssignToTheater).toHaveBeenCalledWith(1, mockSelectedTheater);
  });
});
