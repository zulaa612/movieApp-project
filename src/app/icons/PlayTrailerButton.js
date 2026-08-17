import * as React from "react";
export const PlayTrailerButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.333 14 9.333 6-9.333 6V14Z"
    />
  </svg>
);
