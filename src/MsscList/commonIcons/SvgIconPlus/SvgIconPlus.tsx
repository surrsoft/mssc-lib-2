import * as React from "react";
import { ColorsAsau61 } from '../utils/ColorsAsau61';
import { PropsAsau62 } from '../utils/PropsAsau62';

// [[asau63]]
// Ikonate Bold Interface Icons

const SvgIconPlus = ({svgProps, colors = new ColorsAsau61()}: PropsAsau62) => {
  const svgClassName = 'asau63svg'
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
      <style type="text/css">{ColorsAsau61.cssCreate(svgClassName, colors)}</style>
      <path d="M20 12L4 12M12 4L12 20"/>
    </svg>
  );
};

export default SvgIconPlus;
