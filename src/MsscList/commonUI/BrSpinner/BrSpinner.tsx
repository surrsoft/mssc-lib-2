import React from "react";
import "./brSpinner.scss";
import { useScrollFix } from "ueur-lib";

interface Ty2217 {
  /**
   * триггер показа текущего компонента
   */
  show?: boolean;
  /**
   * цвет заполнителя
   */
  bgColor?: string;
  /**
   * если TRUE то закрывается весь экран, иначе закрывается ближайший [aszm]-радитель
   */
  fullscreen?: boolean;
  /**
   * тут можно подставить свои CSS проперти для контейнера если нужно
   */
  css?: object;
}

export default function BrSpinner({
  show = false,
  bgColor,
  fullscreen = true,
  css = {},
}: Ty2217) {
  if (bgColor) {
    const elem: any = document.querySelector(".brspinner-block");
    elem?.style.setProperty("--color2140", bgColor);
  }
  useScrollFix(show);
  return (
    <div
      className="brspinner-block"
      style={{
        display: show ? "flex" : "none",
        position: fullscreen ? "fixed" : "absolute",
        width: fullscreen ? "100vw" : "100%",
        height: fullscreen ? "100vh" : "100%",
        ...css,
      }}
    >
      <div className="brspinner-block_svg">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="1s"
            additive="sum"
            repeatCount="indefinite"
          />
        </svg>
      </div>
    </div>
  );
}
