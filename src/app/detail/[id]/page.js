"use client";

import { HeaderSection } from "@/app/features.js/HeaderSection";
import { ArrowRight } from "@/app/icons/ArrowRight";
import { DetailStar } from "@/app/icons/DetailStar";
import { LittleStar } from "@/app/icons/LittleStar";
import { PlayTrailerButton } from "@/app/icons/PlayTrailerButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FooterSection } from "@/app/features.js/FooterSection";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();

  const movieId = params.id;

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [credit, setCredit] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);

        const [
          movieResponse,
          creditResponse,
          similarResponse,
          trailerResponse,
        ] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${api_token}`,
              },
            },
          ),

          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${api_token}`,
              },
            },
          ),

          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${api_token}`,
              },
            },
          ),

          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${api_token}`,
              },
            },
          ),
        ]);

        if (
          !movieResponse.ok ||
          !creditResponse.ok ||
          !similarResponse.ok ||
          !trailerResponse.ok
        ) {
          throw new Error("Movie API error");
        }

        const movieData = await movieResponse.json();
        const creditData = await creditResponse.json();
        const similarData = await similarResponse.json();
        const trailerData = await trailerResponse.json();

        console.log("Trailer data:", trailerData);
        console.log("trailer response:", trailerResponse);
        console.log("trailer result:", trailerData.results);
        setData(movieData);
        setCredit(creditData);
        setSimilar(similarData.results || []);
        setTrailer(trailerData.results || []);
      } catch (error) {
        console.log(error);
        setErrorMessage("MOVIE API ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  console.log(data);

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

  if (!data) {
    return null;
  }

  // Director
  const director = credit?.crew
    ?.filter((person) => person.job === "Director")
    .map((person) => person.name)
    .join(", ");

  // Writer
  const writer = credit?.crew
    ?.filter(
      (person) =>
        person.job === "Writer" ||
        person.job === "Screenplay" ||
        person.job === "Story",
    )
    .map((person) => person.name)
    .join(", ");

  // Stars
  const stars = credit?.cast
    ?.slice(0, 3)
    .map((person) => person.name)
    .join(", ");

  // Trailer
  const key = trailer.find(
    (video) =>
      video.site === "Youtube" &&
      video.type === "Trailer" &&
      video.official === true,
  )?.key;

  //Similar

  const handleMovieClick = (id) => {
    router.push(`/detail/${id}`);
    console.log(id);
  };

  const navigateToSimilarCard = () => {
    router.push(`/similar/${movieId}`);
    
  };
  return (
    <>
      <HeaderSection />
      <main className="w-full max-w-270 mx-auto py-8">
        {/* Title */}
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">{data.title}</h1>

            <p className="text-gray-500 mt-2">
              {data.release_date}
              {" · "}
              PG
              {" · "}
              {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
            </p>
          </div>

          {/* Rating */}
          <div className="flex w-20.75 h-16 flex-col">
            <p className="text-xs">Rating</p>

            <div className="flex mt-2.5 gap-1 w-20.75 h-16">
              <DetailStar />

              <div className="flex items-start">
                <span className="text-lg font-semibold flex items-center">
                  {data.vote_average?.toFixed(1)}

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
            <div
              className="w-full h-full rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})`,
              }}
            ></div>
          </div>

          {/* Backdrop */}
          <div className="flex-1 h-90">
            <div
              className="w-full h-full rounded-lg bg-cover bg-center flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
              }}
            >
              <button
                style={{ cursor: "pointer" }}
                className="flex items-center my-6 mx-6 gap-3"
                onClick={() => setShowTrailer(true)}
              >
                <PlayTrailerButton />

                <p className="text-white">Play Trailer</p>
              </button>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mt-4">
          {data.genres?.map((genre) => (
            <span
              key={genre.id}
              className="border border-gray-300 rounded-full px-3 py-1 text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="mt-5 text-sm leading-6 text-gray-700">{data.overview}</p>

        {/* Info */}
        <div className="mt-6 border-t border-gray-200">
          {/* Director */}
          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Director</p>

            <p>{director || "Unknown"}</p>
          </div>

          {/* Writer */}
          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Writer</p>

            <p>{writer || "Unknown"}</p>
          </div>

          {/* Stars */}
          <div className="py-4 border-b border-gray-200 flex">
            <p className="font-semibold w-25">Stars</p>

            <p>{stars || "Unknown"}</p>
          </div>
        </div>
        <div className="w-full h-111 mt-8">
          <div className="flex h-9 justify-between">
            <p className="text-2xl font-semibold">More like this</p>
            <button
              className="flex gap-2 items-center text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ cursor: "pointer" }}
              onClick={navigateToSimilarCard}
            >
              See more
              <ArrowRight />
            </button>
          </div>
          <div className="w-full max-w-7xl px-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {loading && <div>Loading...</div>}
            {!loading && errorMessage && <div>{errorMessage}</div>}
            {!loading &&
              !errorMessage &&
              similar.slice(0, 5).map((movie) => (
                <div
                  key={movie.id}
                  className="rounded-lg overflow-hidden bg-gray-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  {/* Movie Poster */}
                  <div
                    className="w-full h-80 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    }}
                  ></div>

                  {/* Movie Info */}
                  <div className="p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <LittleStar />
                      <span className="text-sm font-medium">
                        {Math.floor(movie.vote_average)}
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
        </div>
      </main>

      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[80%] max-w-5xl aspect-video">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${key}?rel=0`}
              title="Movie trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div className="mt-28">
        <FooterSection />
      </div>
    </>
  );
}
