import './stylesMenuAsau54.css';
export declare class DataAtAsau54 {
    id: string;
    items: ItemAtAsau54[];
}
/**
 * идентификатор действия которое пункт меню представляет
 */
export declare type IdActionAtAsau54PMT = string;
/**
 * текст для отображения на пункте меню
 */
export declare type ActionTextAtAsau54PMT = string;
/**
 * представляет элемент меню
 */
export declare class ItemAtAsau54 {
    idAction: IdActionAtAsau54PMT;
    text: ActionTextAtAsau54PMT;
}
export declare class SelectResultAtAsau54 {
    idAction?: IdActionAtAsau54PMT;
    idElem?: string;
}
export declare class PropsAtAsau54 {
    /**
     * Данные описывающие пункты меню
     */
    data?: DataAtAsau54;
    /**
     * Вызывается когда сделан выбор пункта
     * @param el (1) -- выбранный пункт
     */
    cbOnSelected?: (el: SelectResultAtAsau54) => void;
}
declare function MenuAsau54FCC({ data, cbOnSelected }: PropsAtAsau54): JSX.Element;
export default MenuAsau54FCC;
