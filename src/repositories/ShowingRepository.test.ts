import { test, expect, describe, vi } from "vitest";
import { showingRepository } from "./ShowingRepository";
import type { Showing } from "../types/types";

const showings: Showing[] = [
  {
    id: 1,
    film_id: 1,
    theater_id: 1,
    showing_time: new Date("2025-10-12T15:30:00.000Z"),
  },
  {
    id: 2,
    film_id: 34,
    theater_id: 1,
    showing_time: new Date("2025-10-12T18:30:00.000Z"),
  },
  {
    id: 3,
    film_id: 1,
    theater_id: 1,
    showing_time: new Date("2025-10-12T21:30:00.000Z"),
  },
];

describe("ShowingRepository", () => {
  test("gets the showings by film and date", async () => {
    const filmId = 1;
    const date = new Date("2025-10-12T15:30:00.000Z");

    showingRepository.getShowingsByFilmAndDate = vi
      .fn()
      .mockResolvedValue(showings);

    const result = await showingRepository.getShowingsByFilmAndDate(
      filmId,
      date
    );

    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[1].film_id).toBe(34);
  });
});
