import * as React from "react"
export const LittleStar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#FDE047"
      stroke="#FDE047"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8 3.333 2.06 4.174 4.606.673-3.333 3.247.787 4.586L8 13.847l-4.12 2.166.786-4.586L1.333 8.18l4.607-.673L8 3.333Z"
    />
  </svg>
)