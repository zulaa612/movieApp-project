import { GenreIcon } from "../icons/GenreIcon";
import { Logo } from "../icons/Logo";
import { SearchButton } from "../icons/SearchButton";
import { ModeButton } from "../icons/ModeButton";
import { useRouter } from "next/navigation";

export const HeaderSection = (props) => {
  const router = useRouter();
  const navigateToHomePage = () => {
    router.push("/");
  };
  return (
    <div className="w-full h-14.75 bg-white">
      <div
        className="mx-auto flex h-full max-w-360 items-center justify-between px-10"
        style={{ cursor: "pointer" }}
        onClick={navigateToHomePage}
      >
        <Logo />

        <button className="flex w-24 h-9 border border-gray-200 shadow-sm rounded-lg items-center gap-2 justify-center text-sm">
          <GenreIcon />
          Genre
        </button>

        {/*Search Button*/}
        <button className="h-9 w-94.75 border border-gray-200 shadow-sm rounded-lg flex items-center gap-2.5 text-gray-500 px-3 text-sm"
        style={{cursor: "pointer"}}>
          <SearchButton />
          Search...
        </button>

        <button>
          <ModeButton />
        </button>
      </div>
    </div>
  );
};
