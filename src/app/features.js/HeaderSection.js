import { GenreIcon } from "../icons/GenreIcon";
import { Logo } from "../icons/Logo";
import { SearchButton } from "../icons/SearchButton";
import { ModeButton } from "../icons/ModeButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "../icons/ArrowRight";
import { LittleStar } from "../icons/LittleStar";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export const HeaderSection = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigateToHomePage = () => router.push("/");

  const handleSearchInput = async (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&language=en-US&page=1`,
        { headers: { Authorization: `Bearer ${api_token}` } },
      );
      if (!response.ok) throw new Error("MOVIE NOT FOUND");
      const jsonData = await response.json();
      setSearchResult(jsonData.results?.slice(0, 5) || []);
    } catch (error) {
      console.error("Search error: ", error);
      setSearchResult([]);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
    setSearchResult([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleMovieClick = (movieId) => {
    router.push(`/details/${movieId}`);
    setSearchResult([]);
  };

  return (
    <div className="w-full h-14 bg-white border-b border-gray-100 relative z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div onClick={navigateToHomePage} className="cursor-pointer">
          <Logo />
        </div>

        {/* Search & Genre Container */}
        <div className="flex items-center gap-3">
          <button className="flex h-9 px-3 border border-gray-200 shadow-sm rounded-lg items-center gap-2 justify-center text-sm font-medium hover:bg-gray-50">
            <GenreIcon />
            Genre
          </button>

          {/* Search Input Container */}
          <div className="relative">
            <div className="h-9 w-96 border border-gray-200 shadow-sm rounded-lg flex items-center gap-2.5 text-gray-500 px-3 text-sm">
              <SearchButton />
              <input
                type="text"
                value={search}
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-black"
              />
            </div>

            {/* Floating Search Result Dropdown */}
            {searchResult.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-[500px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col p-2">
                <div className="max-h-[380px] overflow-y-auto flex flex-col gap-1">
                  {searchResult.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="w-full flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-16 rounded bg-cover bg-center shrink-0 bg-gray-200"
                          style={{
                            backgroundImage: movie.poster_path
                              ? `url(https://image.tmdb.org/t/p/w92${movie.poster_path})`
                              : "none",
                          }}
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-base font-semibold text-black leading-tight line-clamp-1">
                            {movie.title}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-black font-medium mt-1">
                            <LittleStar />
                            <span>
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                            </span>
                            <span className="text-gray-400">/10</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 font-medium">
                            {movie.release_date
                              ? movie.release_date.slice(0, 4)
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-medium text-gray-700 flex items-center gap-1 hover:underline">
                        See more <ArrowRight />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Link matching screenshot */}
                <button
                  onClick={handleSearch}
                  className="w-full text-left p-3 text-sm font-medium text-black border-t border-gray-100 hover:bg-gray-50 mt-1 rounded-b-lg"
                >
                  See all results for
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Theme Button */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <ModeButton />
        </button>
      </div>
    </div>
  );
};
