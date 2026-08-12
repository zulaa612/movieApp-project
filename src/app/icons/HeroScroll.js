import * as React from "react"
export const HeroScroll = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="#F4F4F5"
      d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
    />
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18 24 4-4-4-4"
    />
  </svg>
)