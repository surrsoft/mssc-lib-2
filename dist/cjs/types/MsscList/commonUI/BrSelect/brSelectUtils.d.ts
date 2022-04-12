import { RsuvEnSort } from 'rsuv-lib';
/**
 * строка для уникальной идентификации пункта
 */
export declare type BrSelectId = string;
export declare type BrSelectItem<T> = {
    idElem: BrSelectId;
    direction: Omit<RsuvEnSort, RsuvEnSort.UNDEF>;
    text: string;
    /**
     * любые сопуствующие данные, например "имя столбца"
     */
    payload: T;
};
/**
 * @typeParam T - тип сопутствующих данных
 */
export declare type BrSelectSortData<T> = {
    /**
     * id выбранного элемента. Это должен быть один из id присутствующих в items.idElem
     */
    selectedId?: BrSelectId;
    items: Array<BrSelectItem<T>>;
};
