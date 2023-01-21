import { RsuvTxNumIntAB } from "rsuv-lib";

import { MsscSourceType } from "../types/MsscSourceType";
import { MsscElemsCountReturnType } from "../types/types/MsscElemsCountReturnType";
import { MsscFilterType } from "../types/types/MsscFilterType";

export interface ParamsType {
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  randomEnabled: boolean,
  sortIdCurr?: string,
}

/**
 * Получение общего количества элементов с учетом фильтров {@param filters}.
 * Также возвращает все ids если {@param randomEnabled} is THRUTHY
 * @param source *источник
 * @param filters
 * @param randomEnabled
 * @param sortData
 * @param sortIdCurr
 */
export async function msscElemsCountByFilterAndIf(
  {
    source,
    filters,
    randomEnabled,
    sortIdCurr,
  }: ParamsType
): Promise<MsscElemsCountReturnType> {
  let elemsCountByFilter: number = 0;
  let ids: string[] = []
  if (randomEnabled) {
    ids = await source?.idsAll(filters)
    if (ids) {
      elemsCountByFilter = ids.length
    }
  } else {
    const elemsCount: RsuvTxNumIntAB = await source?.elemsCountByFilter(filters)
    if (elemsCount) {
      elemsCountByFilter = elemsCount.val;
    }
  }
  return { elemsCountByFilter, ids }
}
