"use client";

import { HeaderSection } from "@/app/features.js/HeaderSection";
import { DetailStar } from "@/app/icons/DetailStar";
import { LittleStar } from "@/app/icons/LittleStar";
import { PlayTrailerButton } from "@/app/icons/PlayTrailerButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export default function DetailPage() {
  const params = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${api_token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Movie not found");
        }

        const jsonData = await response.json();

        setMovie(jsonData);
      } catch (error) {
        setErrorMessage("MOVIE API ERROR");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <HeaderSection />

        <div className="flex justify-center items-center h-100">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <HeaderSection />

        <div className="flex justify-center items-center h-100">
          <p>{errorMessage}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderSection />

      <main className="w-full max-w-270 mx-auto py-8">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="text-gray-500 mt-2">
              {movie.release_date}
              {" · "}
              PG
              {" · "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
          </div>
          <div className="flex w-20.75 h-16 flex-col">
            <p className="text-xs ">Rating</p>
            <div className="flex mt-2.5 gap-1 w-20.75 h-16">
              <DetailStar />
              <div className="flex items-start">
                <span
                  className="text-lg font-semibold flex items-center
                "
                >
                  {movie.vote_average.toFixed(1)}
                  <p className="text-base font-normal text-gray-500">/10</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Poster Backdrop */}
        <div className="flex gap-5">
          {/* Poster */}
          <div className="w-60 h-90 shrink-0">
            <div className="w-full h-full object-cover rounded-lg bg-[url(`https://image.tmdb.org/t/p/w500${movie.poster_path}`] bg-cover bg-center"></div>
          </div>

          {/* Backdrop */}
          <div className="flex-1 h-90">
            <div className="w-full h-full object-cover rounded-lg bg-[url(`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`] bg-cover bg-center flex items-end" >
              {" "}
              <div className="flex items-center">
                <PlayTrailerButton />
                <p className="text-black">Play Trailer </p>
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mt-4">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="border border-gray-300 rounded-full px-3 py-1 text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="mt-5 text-sm leading-6 text-gray-700">{movie.overview}</p>

        {/* Info */}
        <div className="mt-6 border-t border-gray-200">

          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Director</p>

            <p>{movie.director}</p>
          </div>

          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Writer</p>

            <p>{movie.writer}</p>
          </div>

          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Stars</p>

            <p>{movie.stars}</p>
          </div>
        </div>
      </main>
    </>
  );
}
