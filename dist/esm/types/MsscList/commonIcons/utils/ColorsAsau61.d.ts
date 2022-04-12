/**
 * Представляет 4 цвета для кнопок и т.п.
 * id [[asau61]]
 */
import { AnimateAsau71 } from './AnimateAsau71';
export declare class ColorsAsau61 {
    /**
     * цвет в нормальном состоянии
     */
    normal: string;
    /**
     * цвет при наведении
     */
    hover: string;
    /**
     * цвет в состоянии disabled родителя
     */
    disable: string;
    /**
     * цвет при нажатии
     */
    click: string;
    buNormal(color: string): ColorsAsau61;
    buHover(color: string): ColorsAsau61;
    buDisabled(color: string): ColorsAsau61;
    buClick(color: string): ColorsAsau61;
    /**
     * Создаёт типой CSS код для цветов (2) с именем CSS класса (1)
     * @param cssClassName (1) --
     * @param colors (2) --
     */
    static cssCreate(cssClassName: string, colors: ColorsAsau61): string;
    static cssCreateB(cn?: string, uniqueId?: string, colors?: ColorsAsau61, animate?: AnimateAsau71): string;
}
