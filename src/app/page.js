"use client";

import { HeaderSection } from "./features.js/HeaderSection";
import { HeroSection } from "./features.js/HeroSection";
import { Upcoming } from "./features.js/UpComing";
import { PopularMovies } from "./features.js/PopularMovies";
import { TopRated } from "./features.js/TopRated";
import { FooterSection } from "./features.js/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <HeaderSection />

        <div className="flex flex-col gap-12 my-8">
          <HeroSection />
          <Upcoming />
          <PopularMovies />
          <TopRated />
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
