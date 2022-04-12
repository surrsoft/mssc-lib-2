import { RsuvTxStringAC } from 'rsuv-lib';

export interface MsscFilter {
  paramId: RsuvTxStringAC
  filterValue?: any
  /**
   * Если thruthy то значит этот фильтр относится к поиску значения в массиве значений
   */
  isArrElemFind?: boolean
}
