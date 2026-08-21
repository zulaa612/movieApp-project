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

export const HeaderSection = (props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigateToHomePage = () => {
    router.push("/");
  };
  // Resultiig tseverleh
  const handleSearchInput = async (e) => {
    const searchValue = e.target.value;

    setSearch(searchValue);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        { headers: { Authorization: `Bearer ${api_token}` } },
      );
      if (!response.ok) {
        throw new Error("MOVIE NOT FOUND");
      }
      const jsonData = await response.json();

      setSearchResult(jsonData.results?.slice(0, 5) || []);
    } catch (error) {
      console.log("error: ", error);
      setSearchResult([]);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(`/search?query=${encodeURIComponent(search)}`);
    //setSearchResult([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMovieClick = (movieId) => {
    router.push(`/details/${movieId}`);
    setSearchResult([]);
  };

  return (
    <div className="w-full h-14.75 bg-white">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-10">
        {/*Logo Section */}
        <div onClick={navigateToHomePage} className="cursor-pointer">
          <Logo />
        </div>
        {/*Genre Section */}
        <button className="flex w-24 h-9 border border-gray-200 shadow-sm rounded-lg items-center gap-2 justify-center text-sm">
          <GenreIcon />
          Genre
        </button>

        {/*Search Section*/}
        <div className="relative">
          {/*Search Input Section */}
          <div className="h-9 w-94.75 border border-gray-200 shadow-sm rounded-lg flex items-center gap-2.5 text-gray-500 px-3 text-sm ">
            <SearchButton />
            <input
              type="text"
              value={search}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full outline-none bg-transparent"
            />
          </div>
          {/*Search Result Section */}
          {searchResult.length > 0 && (
            <div className="absolute w-144.25 h-182.25 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
              {searchResult.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="w-138.25 h-29 flex rounded-lg items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 bg-white "
                >
                  {/*Movie Poster Section*/}
                  <div
                    className="w-16.75 h-25 rounded bg-cover bg-no-repeat shrink-0 flex"
                    style={{
                      backgroundImage: movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w92${movie.poster_path})`
                        : "none",
                    }}
                  ></div>

                  {/*Movie Information Section*/}
                  <div className="flex-1 w-113.5 h-24.75">
                    <p className="text-xl font-semibold text-black truncate">
                      {movie.title}
                    </p>
                    <span className="text-sm text-black flex items-center font-medium gap-1">
                      <LittleStar />
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                      <span className="text-xs text-gray-500">/10</span>
                    </span>

                    <div className="w-113.5 h-9 mt-3 flex justify-between items-center">
                      <p className="text-sm font-medium text-black">
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : "N/A"}
                      </p>
                      <span className="text-gray-500 flex items-center gap-2">
                        See more
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-4.25 bg-red-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button>
          <ModeButton />
        </button>
      </div>
    </div>
  );
};
