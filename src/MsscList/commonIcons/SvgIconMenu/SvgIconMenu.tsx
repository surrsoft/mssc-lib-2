import * as React from "react";

const SvgIconMenu = (props: any) => (
  <svg
    id="icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
    style={{
      enableBackground: "new 0 0 32 32",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">{`    
      .st0{
        fill:none;
      }  
    `}</style>
    <circle cx={16} cy={8} r={2}/>
    <circle cx={16} cy={16} r={2}/>
    <circle cx={16} cy={24} r={2}/>
    <rect className="st0" width={32} height={32}/>
  </svg>
);

export default SvgIconMenu;
