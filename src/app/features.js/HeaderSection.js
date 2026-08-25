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
    }3
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
    router.push(`/detail/${movieId}`);
    setSearchResult([]);
  };

  /* const handleGenreClick = (movieId) => {
    router.push
  } */

  return (
    <div className="w-full h-14 bg-white border-b border-gray-100 relative z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div onClick={navigateToHomePage} className="cursor-pointer">
          <Logo />
        </div>

        {/* Search & Genre Container */}
        <div className="flex items-center gap-3">
          <button className="flex h-9 px-3 border border-gray-200 shadow-sm rounded-lg items-center gap-2 justify-center text-sm font-medium hover:bg-gray-50 cursor-pointer">
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
              <div className="absolute w-144.25 bg-white border border-gray-200 rounded-xl shadow-xl  flex flex-col ">
                <div className="max-h-182.25 w-144.25 flex flex-col">
                  {searchResult.map((movie) => (
                    <div
                      key={movie.id}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 "
                    >
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="w-16.75 h-25 rounded bg-cover bg-center bg-gray-200 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovieClick(movie.id);
                          }}
                          style={{
                            backgroundImage: movie.poster_path
                              ? `url(https://image.tmdb.org/t/p/w92${movie.poster_path})`
                              : "none",
                          }}
                        />
                        <div className="flex flex-col">
                          <p className="text-xl font-semibold text-black ">
                            {movie.title}
                          </p>
                          <div className="flex text-sm text-black font-medium ">
                            <LittleStar />
                            <span>
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                            </span>
                            <span className="text-gray-400 text-xs flex items-center">
                              /10
                            </span>
                          </div>
                          <p className="text-xs mt-2 font-medium">
                            {movie.release_date
                              ? movie.release_date.slice(0, 4)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-700 flex items-center hover:underline cursor-pointer mr-5 gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                      >
                        See more <ArrowRight />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bottom Link matching screenshot */}
                <button
                  onClick={handleSearch}
                  className="w-full text-left p-3 text-sm font-medium text-black border-t border-gray-100 hover:bg-gray-50 mt-1 rounded-b-lg cursor-pointer"
                >
                  See all results for &quot;{search}&quot;
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
