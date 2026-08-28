"use client";

import { HeaderSection } from "@/app/features.js/HeaderSection";
import { ArrowRight } from "@/app/icons/ArrowRight";
import { DetailStar } from "@/app/icons/DetailStar";
import { LittleStar } from "@/app/icons/LittleStar";
import { PlayTrailerButton } from "@/app/icons/PlayTrailerButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FooterSection } from "@/app/features.js/FooterSection";
import { GenreRight } from "@/app/icons/GenreRight";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export default function GenrePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allGenres, setAllGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const genresRaw = searchParams.get("genres");
  const selectedGenreIds = genresRaw
    ? genresRaw.split(",").map(Number).filter(Boolean)
    : [];

  const pageRaw = Number(searchParams.get("page"));
  const page = pageRaw && pageRaw > 0 ? pageRaw : 1;

  const updateParams = (next) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/genres?${params.toString()}`);
  };

  const toggleGenre = (id) => {
    const isSelected = selectedGenreIds.includes(id);
    const next = isSelected
      ? selectedGenreIds.filter((g) => g !== id)
      : [...selectedGenreIds, id];
    updateParams({ genres: next.join(","), page: null });
  };

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    updateParams({ page: nextPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          { headers: { Authorization: `Bearer ${api_token}` } },
        );
        if (!response.ok) throw new Error("GENRE NOT FOUND");
        const data = await response.json();
        const sorted = [...(data.genres || [])].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setAllGenres(sorted);
      } catch (error) {
        console.log("GENRE CAN'T CONNECT", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenreIds.length === 0) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenreIds.join(
            ",",
          )}&language=en-US&page=${page}`,
          { headers: { Authorization: `Bearer ${api_token}` } },
        );
        if (!response.ok) throw new Error("MOVIES NOT FOUND");
        const data = await response.json();
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.log(error);
        setErrorMessage("Movies not found");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genresRaw, page]);

  const handleMovieClick = (movieId) => router.push(`/detail/${movieId}`);

  const selectedNames = allGenres
    .filter((g) => selectedGenreIds.includes(g.id))
    .map((g) => g.name);

  const buildPageNumbers = () => {
    const pages = [];
    const windowSize = 1;
    const add = (p) => pages.push(p);

    add(1);
    if (page - windowSize > 2) pages.push("…");
    for (
      let p = Math.max(2, page - windowSize);
      p <= Math.min(totalPages - 1, page + windowSize);
      p++
    ) {
      add(p);
    }
    if (page + windowSize < totalPages - 1) pages.push("…");
    if (totalPages > 1) add(totalPages);

    return pages;
  };

  const pageNumbers = buildPageNumbers();

  return (
    <>
      <HeaderSection />
      <section className="w-full bg-white flex justify-center py-8">
        <div className="w-full max-w-7xl px-6 flex gap-10">
          {/* Sidebar: genre filter */}
          <aside className="w-64 shrink-0">
            <h1 className="text-2xl font-semibold">Search filter</h1>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Genres</h2>
              <p className="text-sm text-gray-500">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {allGenres.map((item) => {
                  const isSelected = selectedGenreIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleGenre(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {item.name}
                      {isSelected ? (
                        <span className="text-white">×</span>
                      ) : (
                        <GenreRight />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {selectedGenreIds.length === 0
                ? "Select a genre to see titles"
                : `${totalResults} titles in "${selectedNames.join(", ")}"`}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {loading && <div>Loading...</div>}
              {!loading && errorMessage && <div>{errorMessage}</div>}
              {!loading &&
                !errorMessage &&
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="rounded-lg overflow-hidden bg-gray-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div
                      className="w-full h-80 bg-cover bg-center bg-gray-200"
                      style={{
                        backgroundImage: movie.poster_path
                          ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                          : "none",
                      }}
                    />
                    <div className="p-3 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <LittleStar />
                        <span className="text-sm font-medium">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                          <span className="text-gray-400 text-xs font-normal">
                            /10
                          </span>
                        </span>
                      </div>
                      <span
                        className="text-base font-normal truncate"
                        title={movie.title}
                      >
                        {movie.title}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {!loading && !errorMessage && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>

                {pageNumbers.map((p, idx) =>
                  p === "…" ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-sm text-gray-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-8 h-8 text-sm font-medium rounded-md cursor-pointer ${
                        p === page
                          ? "bg-black text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="mt-19">
        <FooterSection />
      </div>
    </>
  );
}
