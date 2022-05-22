import { RsuvTxStringAC } from 'rsuv-lib';

export interface MsscFilter {
  /**
   * Интерпретируется по разному в зависимости от *источника, например как "имя поля таблицы"
   */
  paramId: RsuvTxStringAC
  /**
   * Интерпретируется по разному в зависимости от *источника
   */
  paramIdB?: string,
  /**
   *
   */
  filterValue?: any
  /**
   * Если thruthy то значит этот фильтр относится к поиску значения (filterValue) в массиве значений, по полному сопадению
   */
  isArrElemFind?: boolean
}
