"use client";

import { HeaderSection } from "@/app/features.js/HeaderSection";
import { LittleStar } from "@/app/icons/LittleStar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FooterSection } from "@/app/features.js/FooterSection";
import { Button } from "../components/Buttons";
import { useParams } from "next/navigation";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdlYjUxYzU3YjgyMmMxNWY5N2UwZGNkMTk5Njg0OSIsIm5iZiI6MTc4NjU4NTA5Mi44OTIsInN1YiI6IjZhN2QyMDA0MjU5OGQ3ZDEwMGI3YWM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ssQnCIr7uHT0OQOFQdAoh7LsZxhJF4BCADV6hwCU8G8";

export default function SimilarPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();

  const movieId = params.id;

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/similar?language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();

    return jsonData.results;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => setErrorMessage("MOVIE API ERROR"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data);

  const router = useRouter();

  const handleMovieClick = (id) => {
    router.push(`/detail/${id}`);
  };
  return (
    <>
      <HeaderSection />
      <section className="w-full bg-white flex flex-col items-center py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full max-w-7xl px-4">
          <h2 className="text-2xl font-semibold">More like this</h2>
        </div>

        {/* Movie Grid */}
        <div className="w-full max-w-7xl px-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading && <div>Loading...</div>}
          {!loading && errorMessage && <div>{errorMessage}</div>}
          {!loading &&
            !errorMessage &&
            data.slice(0, 10).map((movie) => (
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
        <Button />
      </section>
      <div className="mt-19">
        <FooterSection />
      </div>
    </>
  );
}
