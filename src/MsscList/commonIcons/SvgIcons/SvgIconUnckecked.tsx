import React from "react";

import { SvgIconPropsType } from "./types/SvgIconPropsType";
import { ColorsCls } from "./utils/ColorsCls";

// [[asau64]]
// Ikonate Bold Interface Icons

const SvgIconUnckecked = ({
  svgProps,
  colors = new ColorsCls(),
}: SvgIconPropsType) => {
  const svgClassName = "asau64svg";
  return (
    <svg
      className={svgClassName}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="checkboxIntermediateIconTitle"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      color="#000000"
      {...svgProps}
    >
      <style type="text/css">{ColorsCls.cssCreate(svgClassName, colors)}</style>
      <rect
        x={21}
        y={3}
        width={18}
        height={18}
        rx={1}
        fill="none"
        transform="rotate(90 21 3)"
      />
      <path d="M16 12H8" />
    </svg>
  );
};

export default SvgIconUnckecked;
