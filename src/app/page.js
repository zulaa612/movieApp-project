"use client";

import { useState } from "react";
import { HeaderSection } from "./features.js/HeaderSection";
import { HeroSection } from "./features.js/HeroSection";
import { FooterSection } from "./features.js/FooterSection";
import { ArrowRight } from "./icons/ArrowRight";
import { LittleStar } from "./icons/LittleStar";
import Image from "next/image";

const upComingMovies = [
  { title: "Dear Santa", rating: 6.9, image: "/pictures/dearsanta1.png" },
  {
    title: "How to Train Your Dragon Live Action",
    rating: 6.9,
    image: "/pictures/dragon2.png",
  },
  { title: "Alien Romulus", rating: 6.9, image: "/pictures/alien3.png" },
  { title: "From the Ashes", rating: 6.9, image: "/pictures/ashes4.png" },
  { title: "Space Dogg", rating: 6.9, image: "/pictures/spacedog5.png" },
  { title: "The Order", rating: 6.9, image: "/pictures/order6.png" },
  { title: "Y2K", rating: 6.9, image: "/pictures/y2k7.png" },
  {
    title: "Solo Leveling: ReAwakening",
    rating: 6.9,
    image: "/pictures/solo8.png",
  },
  { title: "Get Away", rating: 6.9, image: "/pictures/getaway9.png" },
  {
    title: "Sonic the Hedgehog 3",
    rating: 6.9,
    image: "/pictures/sonic10.png",
  },
];

const popularMovies = [
  {
    title: "The Shawshank Redemption",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Godfather",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Dark Knight",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "12 Angry Men",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Lord of the Rings: The  Return of the King",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Internstellar",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Se7en",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "It's a Wonderful life",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Seven samural",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Silence of the Lambs",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
];

const topRatedMovies = [
  {
    title: "Pulp Fiction",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Lord of the Rings: Fellowship of the Kings",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Good, the Bad and the Ugly",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Forrest Gump",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Fight Club",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Saving Private Ryan",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "City of God",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "The Green Mile",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Life is Beautiful",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
  {
    title: "Terminator 2: Judgement Day",
    rating: 6.9,
    image: "/pictures/alien3.png",
  },
];


{
  upComingMovies.map((movie) => (
    <div key={movie.title} className="w-[229.73px] h-109.75 bg-gray-200">
      <div className="w-[229.73px] h-85 relative overflow-hidden">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-[229.73px] h-23.75 mt-1 flex items-center justify-center">
        <div className=" w-[213.73px] h-19.75 flex gap-1 flex-col">
          <div className="flex">
            <LittleStar />
            <span className="text-sm font-medium">
              {movie.rating}
              <span className="text-gray-400 text-xs font-normal">/10</span>
            </span>
          </div>
          <span className="text-lg font-normal">{movie.title}</span>
        </div>
      </div>
    </div>
  ));
}
2;

export default function Home() {
  return (
    <div>
      <HeaderSection />

      <div className=" flex flex-col gap-13">
        <HeroSection />

        {/*Upcoming section*/}
        <div className="w-full h-244.5 bg-white flex flex-col items-center">
          <div className="flex justify-between w-319.25 h-9">
            <span className="text-2xl font-semibold ">Upcoming</span>
            <button className="flex gap-[11.33px] items-center">
              See more
              <ArrowRight />
            </button>
          </div>
          <div className="w-319.25 h-227.5 bg-white mt-8 gap-8 flex flex-wrap">
            {upComingMovies.map((movie) => (
              <div
                key={movie.title}
                className="w-[229.73px] h-109.75 bg-gray-200"
              >
                <div className="w-[229.73px] h-85 relative overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-[229.73px] h-23.75 mt-1 flex items-center justify-center">
                  <div className="w-[213.73px] h-19.75 flex gap-1 flex-col">
                    <div className="flex">
                      <LittleStar />
                      <span className="text-sm font-medium">
                        {movie.rating}
                        <span className="text-gray-400 text-xs font-normal">
                          /10
                        </span>
                      </span>
                    </div>
                    <span className="text-lg font-normal">{movie.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*Popular section*/}
        <div className="w-full h-244.5 bg-white flex flex-col items-center">
          <div className="flex justify-between w-319.25 h-9">
            <span className="text-2xl font-semibold ">Popular</span>
            <button className="flex gap-[11.33px] items-center">
              See more
              <ArrowRight />
            </button>
          </div>
          <div className="w-319.25 h-227.5 bg-white mt-8 gap-8 flex flex-wrap">
            {upComingMovies.map((movie) => (
              <div
                key={movie.title}
                className="w-[229.73px] h-109.75 bg-gray-200"
              >
                <div className="w-[229.73px] h-85 relative overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-[229.73px] h-23.75 mt-1 flex items-center justify-center">
                  <div className="w-[213.73px] h-19.75 flex gap-1 flex-col">
                    <div className="flex">
                      <LittleStar />
                      <span className="text-sm font-medium">
                        {movie.rating}
                        <span className="text-gray-400 text-xs font-normal">
                          /10
                        </span>
                      </span>
                    </div>
                    <span className="text-lg font-normal">{movie.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/*TopRated section*/}
        <div className="w-full h-244.5 bg-white flex flex-col items-center">
          <div className="flex justify-between w-319.25 h-9">
            <span className="text-2xl font-semibold ">Top Rated</span>
            <button className="flex gap-[11.33px] items-center">
              See more
              <ArrowRight />
            </button>
          </div>
          <div className="w-319.25 h-227.5 bg-white mt-8 gap-8 flex flex-wrap">
            {topRatedMovies.map((movie) => (
              <div
                key={movie.title}
                className="w-[229.73px] h-109.75 bg-gray-200"
              >
                <div className="w-[229.73px] h-85 relative overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-[229.73px] h-23.75 mt-1 flex items-center justify-center">
                  <div className="w-[213.73px] h-19.75 flex gap-1 flex-col">
                    <div className="flex">
                      <LittleStar />
                      <span className="text-sm font-medium">
                        {movie.rating}
                        <span className="text-gray-400 text-xs font-normal">
                          /10
                        </span>
                      </span>
                    </div>
                    <span className="text-lg font-normal">{movie.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        <FooterSection />
      </div>
    </div>
  );
}
