import * as React from "react"
export const HeroDot = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={8}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M0 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
  </svg>
)