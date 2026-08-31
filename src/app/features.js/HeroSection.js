import Image from "next/image";
import { HeroStar } from "../icons/HeroStar";
import { HeroWatch } from "../icons/HeroWatch";
import { HeroScroll } from "../icons/HeroScroll";

export const HeroSection = (props) => {
  return (
    <div className="w-full h-150 bg-black">
      <div className="absolute left-[8%] top-0.5 z-10 w-85.5 -translate-y-0.5 text-white mt-44.5">
        <p className="text-sm">Now Playing:</p>

        <h1 className="text-3xl font-bold">Wicked</h1>

        <div className="mt-2 flex items-center gap-1">
          <HeroStar />
          <span>
            6.9<span className="text-gray-400">/10</span>
          </span>
        </div>

        <p className="mt-5 text-xs leading-5">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.{" "}
          <button className="flex justify-center absolute ml-325">
            <HeroScroll />
          </button>
        </p>

        <button className="mt-5 rounded-lg bg-white px-4 py-2 text-sm text-black flex gap-2 items-center">
          <HeroWatch />
          Watch Trailer
        </button>
      </div>
    </div>
  );
};
