import * as React from "react";
import { ColorsCls } from './utils/ColorsCls';
import { SvgPropsCls } from './utils/SvgPropsCls';

// [[asau70]]

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
                          uniqueId = Date.now() + ''
                        }: SvgPropsCls) => {

  const cfg = {
    clsName: 'asau70', // NEED UNIQUE
    w: 24,
    h: 24
  }

  return (
    <svg
      className={`${cfg.clsName}_svg${uniqueId}`}
      width={`${cfg.w}px`}
      height={`${cfg.h}px`}
      viewBox={`0 0 16 16`}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <defs>
        <style>{ColorsCls.cssCreateB(cfg.clsName, uniqueId, colors, animate)}</style>
      </defs>
      <g transform={`rotate(${angle}, ${16 / 2}, ${16 / 2})`} strokeWidth={0.5} >
        <path
          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
        <path
          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
      </g>
    </svg>
  );
};

export default SvgIconChevron;
