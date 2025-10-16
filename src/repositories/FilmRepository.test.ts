import { test, expect, describe, vi } from "vitest";
import { filmRepository } from "./FilmRepository";
import type { Film } from "../types/types";

const films: Film[] = [
  {
    id: 1,
    title: "The Matrix",
    homepage: "https://www.thematrix.com",
    release_date: new Date("1999-03-31"),
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    runtime: 136,
    tagline: "Welcome to the Real World.",
    popularity: 85.5,
    imdb_id: "tt0133093",
    vote_average: 8.7,
    vote_count: 24500,
  },
  {
    id: 2,
    title: "Inception",
    homepage: "https://www.inception.com",
    release_date: new Date("2010-07-16"),
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    runtime: 148,
    tagline: "Your mind is the scene of the crime.",
    popularity: 92.3,
    imdb_id: "tt1375666",
    vote_average: 8.8,
    vote_count: 31200,
  },
  {
    id: 3,
    title: "Interstellar",
    homepage: "https://www.interstellar.com",
    release_date: new Date("2014-11-07"),
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    popularity: 88.7,
    imdb_id: "tt0816692",
    vote_average: 8.6,
    vote_count: 28900,
  },
];

describe("FilmRepository", () => {
  test("gets a film by ID", async () => {
    const filmId = 1;

    filmRepository.getFilmById = vi.fn().mockResolvedValue(films[0]);

    const result = await filmRepository.getFilmById(filmId);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
    expect(result?.title).toBe("The Matrix");
    expect(result?.runtime).toBe(136);
  });

  test("returns null when film not found", async () => {
    const filmId = 999;

    filmRepository.getFilmById = vi.fn().mockResolvedValue(null);

    const result = await filmRepository.getFilmById(filmId);

    expect(result).toBeNull();
  });

  test("gets all films", async () => {
    filmRepository.getAllFilms = vi.fn().mockResolvedValue(films);

    const result = await filmRepository.getAllFilms();

    expect(result.length).toBe(3);
    expect(result[0].title).toBe("The Matrix");
    expect(result[1].title).toBe("Inception");
    expect(result[2].title).toBe("Interstellar");
  });

  test("searches films by query", async () => {
    const query = "Matrix";
    const filteredFilms = films.filter((film) =>
      film.title.toLowerCase().includes(query.toLowerCase())
    );

    filmRepository.searchFilms = vi.fn().mockResolvedValue(filteredFilms);

    const result = await filmRepository.searchFilms(query);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("The Matrix");
    expect(result[0].id).toBe(1);
  });

  test("gets films by genre", async () => {
    const genre = "Sci-Fi";

    filmRepository.getFilmsByGenre = vi.fn().mockResolvedValue(films);

    const result = await filmRepository.getFilmsByGenre(genre);

    expect(result.length).toBe(3);
    expect(result).toEqual(films);
  });

  test("handles empty search results", async () => {
    const query = "NonExistentMovie";

    filmRepository.searchFilms = vi.fn().mockResolvedValue([]);

    const result = await filmRepository.searchFilms(query);

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });

  test("handles error when fetching film by ID", async () => {
    const filmId = 1;
    const errorMessage = "Network error";

    filmRepository.getFilmById = vi
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    await expect(filmRepository.getFilmById(filmId)).rejects.toThrow(
      errorMessage
    );
  });

  test("handles error when fetching all films", async () => {
    const errorMessage = "Server error";

    filmRepository.getAllFilms = vi
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    await expect(filmRepository.getAllFilms()).rejects.toThrow(errorMessage);
  });
});
