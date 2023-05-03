/**
 * Представляет 4 цвета для кнопок и т.п.
 * Вид программной сущности - [asau224].
 *
 * id [[asau61]]
 */
import { AnimateType } from "./AnimateType";

export class ColorsCls {
  /**
   * цвет в нормальном состоянии
   */
  public normal: string = "black";
  /**
   * цвет при наведении
   */
  public hover: string = "red";
  /**
   * цвет в состоянии disabled родителя
   */
  public disable: string = "silver";
  /**
   * цвет при нажатии
   */
  public click: string = "silver";

  /**
   * Создаёт типой CSS код для цветов (2) с именем CSS класса (1)
   * @param cssClassName (1) --
   * @param colors (2) --
   */
  static cssCreate(cssClassName: string, colors: ColorsCls): string {
    if (!cssClassName || cssClassName.length < 1 || !colors) {
      return "";
    }
    return `
      .${cssClassName} {
        stroke: ${colors.normal};
        fill: ${colors.normal};
      }
      *:hover:not(:disabled):not(:active) > .${cssClassName} {
        stroke: ${colors.hover};
        fill: ${colors.hover};
      }
      *:disabled > .${cssClassName} {
        stroke: ${colors.disable};
        fill: ${colors.disable};
      }
      *:active > .${cssClassName} {
        stroke: ${colors.click};
        fill: ${colors.click};
      }
    `;
  }

  static cssCreateB(
    cn = "CN",
    uniqueId: string = "",
    colors: ColorsCls = new ColorsCls(),
    animate?: AnimateType
  ): string {
    return `
          .${cn}_svg${uniqueId} {
              --colorNormal: ${colors?.normal};
              --colorHover: ${colors?.hover};
              --colorDisable: ${colors?.disable};
              --colorClick: ${colors?.click};
          }
          
          .${cn}_svg${uniqueId} {
              fill: var(--colorNormal);
              stroke: var(--colorNormal);
              ${
                !animate?.enabled
                  ? ""
                  : `
                animation-name: ${cn}_anim_disable${uniqueId};
                animation-duration: ${animate.durationMillisec ?? 500}ms;
                animation-timing-function: ease;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-play-state: paused;
              `
              }
          }
          
          *:hover:not(:disabled) > .${cn}_svg${uniqueId} {
              fill: var(--colorHover);
              stroke: var(--colorHover);
              ${
                !animate?.enabled
                  ? ""
                  : `
                animation-name: ${cn}_anim_hover${uniqueId};
                animation-duration: 100ms;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-iteration-count: 1;
                animation-play-state: running;
              `
              }
          }
          
          *:disabled > .${cn}_svg${uniqueId} {
              fill: var(--colorDiasable);
              stroke: var(--colorDisable);
              ${!animate?.enabled ? "" : "animation-play-state: running;"}
          }
          
          *:active > .${cn}_svg${uniqueId} {
              fill: var(--colorClick);
              stroke: var(--colorClick); 
          }
          
          ${
            !animate?.enabled
              ? ""
              : `
            @keyframes ${cn}_anim_disable${uniqueId} {
              0% {
                  fill: var(--colorNormal);
                  stroke: var(--colorNormal);
              }
              100% {
                  fill: var(--colorDisable);
                  stroke: var(--colorDisable);
              }
            }
            
            @keyframes ${cn}_anim_hover${uniqueId} {
              0% {
                fill: var(--colorNormal);
                stroke: var(--colorNormal);
              }
              100% {
                fill: var(--colorHover);
                stroke: var(--colorHover);
              }
            }
          `
          }
        `;
  }

  buNormal(color: string): ColorsCls {
    this.normal = color;
    return this;
  }

  buHover(color: string): ColorsCls {
    this.hover = color;
    return this;
  }

  buDisabled(color: string): ColorsCls {
    this.disable = color;
    return this;
  }

  buClick(color: string): ColorsCls {
    this.click = color;
    return this;
  }
}
