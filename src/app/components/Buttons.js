import { PagesLeftArrow } from "../icons/PagesLeftArrow";
import { PagesRightArrow } from "../icons/PagesRightArrow";

export const Button = (props) => {
  const {
    onClick,
    type = "button",
    variant = "white",
    icon,
    iconPosition,
    className = "",
  } = props;

  return (
    <div className="w-7xl h-10 mt-8 flex text-sm items-center justify-end">
      <button
        type={type}
        onClick={onClick}
        className="w-28.5 h-10 flex items-center justify-center gap-2 rounded-lg group hover:shadow-md transition-shadow"
      >
        <PagesLeftArrow />
        <span>Previous</span>
      </button>

      <button
        type={type}
        onClick={onClick}
        className="w-10 h-10 rounded-lg group hover:shadow-md transition-shadow flex items-center justify-center"
      >
        1
      </button>
      <button
        type={type}
        onClick={onClick}
        className="w-10 h-10 rounded-lg group hover:shadow-md transition-shadow flex items-center justify-center"
      >
        2
      </button>
      <button
        type={type}
        onClick={onClick}
        className="w-10 h-10 rounded-lg group hover:shadow-md transition-shadow flex items-center justify-center"
      >
        ...
      </button>
      <button
        type={type}
        onClick={onClick}
        className="w-10 h-10 rounded-lg group hover:shadow-md transition-shadow flex items-center justify-center"
      >
        5
      </button>

      <button
        type={type}
        onClick={onClick}
        className="w-22 h-10 flex items-center justify-center gap-2 rounded-lg group hover:shadow-md transition-shadow"
      >
        <span>Next</span>
        <PagesRightArrow />
      </button>
    </div>
  );
};
