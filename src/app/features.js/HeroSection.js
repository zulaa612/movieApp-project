"use client";
import { HeroStar } from "../icons/HeroStar";
import { HeroWatch } from "../icons/HeroWatch";
import { HeroScroll } from "../icons/HeroScroll";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LittleStar } from "../icons/LittleStar";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export const HeroSection = (props) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const randomMovie = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        },
      );

      const jsonData = await response.json();

      const movies = jsonData.results;

      const randomIndex = Math.floor(Math.random() * movies.length);

      setMovie(movies[randomIndex]);
    } catch (error) {
      setErrorMessage("MOVIE API ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    randomMovie();
  }, []);

  if (loading) {
    return <div className="w-full bg-black flex ">Loading...</div>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="w-full h-150 relative overflow-hidden bg-amber-50">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute left-[8%] top-1/2 z-10 w-85 -translate-y-1/2 text-white">
        <p className="text-sm">Now Playing:</p>
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <div className="mt-2 flex items-center gap-1">
          <LittleStar />
          <span>
            {" "}
            {movie.vote_average.toFixed(1)}
            <span className="text-gray-400">/10</span>
          </span>
        </div>

        <p className="mt-5 text-xs leading-5 line-clamp-5">{movie.overview}</p>

        <button className="mt-5 rounded-lg bg-white px-4 py-2 text-sm text-black flex gap-2 items-center cursor-pointer">
          <HeroWatch />
          Watch Trailer
        </button>
      </div>

      <button
        onClick={randomMovie}
        className="absolute right-[4%] top-1/2 z-10 flex cursor-pointer "
      >
        <HeroScroll />
      </button>
    </div>
  );
};
