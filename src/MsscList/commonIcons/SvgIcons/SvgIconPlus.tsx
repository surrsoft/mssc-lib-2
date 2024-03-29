import React from "react";

import { SvgIconPropsType } from "./types/SvgIconPropsType";
import { ColorsCls } from "./utils/ColorsCls";

// [[asau63]]
// Ikonate Bold Interface Icons

export const SvgIconPlus = ({
  svgProps,
  colors = new ColorsCls(),
}: SvgIconPropsType) => {
  const svgClassName = "asau63svg";
  return (
    <svg
      className={svgClassName}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="plusIconTitle"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
    >
      <style type="text/css">{ColorsCls.cssCreate(svgClassName, colors)}</style>
      <path d="M20 12L4 12M12 4L12 20" />
    </svg>
  );
};

