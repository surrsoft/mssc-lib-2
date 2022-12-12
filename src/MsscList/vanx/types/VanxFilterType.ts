import { RsuvTxStringAC } from 'rsuv-lib';

export interface VanxFilterType {
  /**
   * Ключ поля. Работает в паре с {@link filterValue} (значение поля).
   * Интерпретируется по разному в зависимости от *источника, например как "имя поля таблицы"
   */
  paramId: RsuvTxStringAC
  /**
   * Интерпретируется по разному в зависимости от *источника
   */
  paramIdB?: string,
  /**
   * Значение поля. Работает в паре с {@link paramId}
   */
  filterValue?: any
  /**
   * Если truthy то значит этот фильтр относится к поиску значения {@link filterValue} в массиве значений, по полному
   * совпадению
   */
  isArrElemFind?: boolean
}
