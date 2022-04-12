import * as React from "react";
import { ColorsAsau61 } from '../utils/ColorsAsau61';
import { PropsAsau62 } from '../utils/PropsAsau62';

// [[asau64]]
// Ikonate Bold Interface Icons

const SvgIconDice = ({svgProps, colors = new ColorsAsau61()}: PropsAsau62) => {
  const svgClassName = 'asau65svg'
  return (
    <svg
      className={svgClassName}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="black"
      stroke="transparent"
      strokeWidth={0}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <style type="text/css">{ColorsAsau61.cssCreate(svgClassName, colors)}</style>
      <path
        d="M17.2 14.9431C16.0954 14.9431 15.2 15.8385 15.2 16.9431C15.2 18.0477 16.0954 18.9431 17.2 18.9431C18.3045 18.9431 19.2 18.0477 19.2 16.9431C19.2 15.8385 18.3045 14.9431 17.2 14.9431Z"
      />
      <path
        d="M5.05518 7.05518C5.05518 5.95061 5.95061 5.05518 7.05518 5.05518C8.15975 5.05518 9.05518 5.95061 9.05518 7.05518C9.05518 8.15975 8.15975 9.05518 7.05518 9.05518C5.95061 9.05518 5.05518 8.15975 5.05518 7.05518Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z"
      />
    </svg>
  );
};

export default SvgIconDice;
