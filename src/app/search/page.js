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
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);

        const [movieResponse, genreResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
            { headers: { Authorization: `Bearer ${api_token}` } },
          ),

          fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
            headers: { Authorization: `Bearer ${api_token}` },
          }),
        ]);

        if (!movieResponse.ok || !genreResponse.ok) {
          throw new Error("MOVIE API ERROR");
        }

        const movieData = await movieResponse.json();
        const genreData = await genreResponse.json();

        setData(movieData);
        setGenre(genreData);
      } catch (error) {
        console.log(error);
        setErrorMessage("MOVIE API ERROR");
      } finally {
        setLoading(false);
      }
    };
  });

  const getData = async () => {
    if (!query) {
      setData([]);
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        { headers: { Authorization: `Bearer ${api_token}` } },
      );
      if (!response.ok) {
        throw new Error("MOVIE API ERROR");
      }
      const jsonData = await response.json();
      setData(jsonData.results || []);
    } catch (error) {
      setErrorMessage("MOVIE NOT FOUND");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [query]);

  const handleMovieClick = (movieId) => {
    router.push(`/detail/${movieId}`);
    setSearchResult([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <HeaderSection />

      <main className="max-w-7xl mx-auto px-6 py-8 w-full grow">
        <h1 className="text-3xl font-bold mb-6">Search results</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* Left Column: Results */}
          <div>
            <h2 className="text-lg font-semibold mb-6">
              {data.length} results for &quot;{query || ""}&quot;
            </h2>

            {loading && <div>Loading...</div>}
            {!loading && errorMessage && (
              <div className="text-red-500">{errorMessage}</div>
            )}

            {!loading && !errorMessage && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.slice(0, 10).map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-between"
                  >
                    <div
                      className="w-full h-72 bg-cover bg-center"
                      style={{
                        backgroundImage: movie.poster_path
                          ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                          : "none",
                      }}
                    />
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
            )}
            <Button />

            {/*Genre Section */}
            <div className="border-l border-gray-200 pl-8 hidden lg:block">
              <h2 className="text-xl font-bold mb-1">Search by genre</h2>
              <p className="text-sm text-gray-500 mb-4">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-2">
                {genre.map((genre) => (
                  <button
                    key={genre}
                    className="flex items-center px-3 py-1 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    {genre} <span className="ml-1 text-gray-400">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
