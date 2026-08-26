"use client";

import { useSearchParams } from "next/navigation";
import { HeaderSection } from "../features.js/HeaderSection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FooterSection } from "../features.js/FooterSection";
import { Button } from "../components/Buttons";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          { headers: { Authorization: `Bearer ${api_token}` } },
        );
        if (!response.ok) throw new Error("Failed to fetch genre");
        const data = await response.json();
        setGenre(data.genres || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      return;
    };
    const fetchSearchResults = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
          { headers: { Authorization: `Bearer ${api_token}` } },
        );
        if (!response.ok) throw new Error("MOVIE API ERROR");
        const data = await response.json();
        setData(data.results || []);
      } catch (error) {
        setErrorMessage("MOVIE API ERROR");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);

  const handleMovieClick = (movieId) => {
    router.push(`/detail/${movieId}`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between items-center ">
        <HeaderSection />

        <main className="w-7xl mx-auto mt-13 flex gap-8">
          <div className="w-201">
            <h1 className="text-3xl font-bold mb-6">Search results</h1>

            <h2 className="text-lg font-semibold">
              {data.length} results for &quot;{query || ""}&quot;
            </h2>

            {loading && <div className="mt-6">Loading...</div>}

            {!loading && errorMessage && (
              <div className="mt-6">{errorMessage}</div>
            )}

            {!loading && !errorMessage && (
              <>
                {/* MOVIES */}
                <div className="px-4 mt-8 grid lg:grid-cols-4 gap-6">
                  {data.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="w-41.25 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      {/* MOVIES POSTER SECTION */}
                      <div
                        className="w-41.25 h-72 bg-cover bg-center"
                        style={{
                          backgroundImage: movie.poster_path
                            ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                            : "none",
                        }}
                      />

                      {/* Movie info */}
                      <div className="p-3">
                        <div className="flex items-center text-sm font-semibold mb-1">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "0.0"}

                          <span className="text-gray-400 font-normal">/10</span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button />
                </div>
              </>
            )}
          </div>
          <div className="border-l border-gray-200" />

          {/* Genre Section */}
          <div className="w-96.75">
            <h2 className="text-xl font-bold mb-1">Search by genre</h2>

            <p className="text-sm text-gray-500 mb-4">
              See lists of movies by genre
            </p>

            <div className="flex flex-wrap gap-2">
              {genre.map((item) => (
                <button
                  key={item.id}
                  className="flex items-center px-3 py-1 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {item.name}

                  <span className="ml-1 text-gray-400">›</span>
                </button>
              ))}
            </div>
          </div>
        </main>
        <div className="mt-8 w-full">
          <FooterSection />
        </div>
      </div>
    </>
  );
}
