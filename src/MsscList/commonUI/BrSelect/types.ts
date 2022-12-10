import { RsuvEnSort } from 'rsuv-lib';

/**
 * строка для уникальной идентификации пункта
 */
export type BrSelectIdType = string;

export interface BrSelectItemType<T> {
  idElem: BrSelectIdType
  direction: Omit<RsuvEnSort, RsuvEnSort.UNDEF>
  text: string
  /**
   * любые сопуствующие данные, например "имя столбца"
   */
  payload: T
}

/**
 * @typeParam T - тип сопутствующих данных
 */
export interface BrSelectSortDataType<T> {
  /**
   * id выбранного элемента. Это должен быть один из id присутствующих в items.idElem
   */
  selectedId?: BrSelectIdType
  /** */
  items: Array<BrSelectItemType<T>>
}
