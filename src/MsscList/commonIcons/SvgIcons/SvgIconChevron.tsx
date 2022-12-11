import React from "react";

import { ColorsCls } from "./utils/ColorsCls";
import { SvgPropsCls } from "./utils/SvgPropsCls";

/**
 *
 * @param svgProps {SvgPropsCls}
 * @param colors
 * @param angle
 * @param animate
 * @param identId
 * @constructor
 */
const SvgIconChevron = ({
  svgProps,
  colors = new ColorsCls(),
  angle = 180,
  animate,
  uniqueId = `${Date.now()}`,
}: SvgPropsCls) => {
  const cfg = {
    clsName: "asau53",
    w: 24,
    h: 24,
  };

  return (
    <svg
      className={`${cfg.clsName}_svg${uniqueId}`}
      width={`${cfg.w}px`}
      height={`${cfg.h}px`}
      viewBox={`0 0 ${cfg.w} ${cfg.h}`}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <defs>
        <style>
          {ColorsCls.cssCreateB(cfg.clsName, uniqueId, colors, animate)}
        </style>
      </defs>
      <polyline
        fill="none"
        strokeWidth="2"
        points="9 6 15 12 9 18"
        transform={`rotate(${angle}, ${cfg.w / 2}, ${cfg.h / 2})`}
      />
    </svg>
  );
};

export default SvgIconChevron;
