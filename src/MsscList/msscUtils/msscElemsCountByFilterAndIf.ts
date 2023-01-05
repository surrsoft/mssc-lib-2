import { RsuvTxNumIntAB } from "rsuv-lib";

import { BrSelectSortDataType } from "../commonUI/BrSelect/types";
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscColumnNameType } from "../types/types/MsscColumnNameType";
import { MsscElemsCountReturnType } from "../types/types/MsscElemsCountReturnType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { msscSortsCreate } from "./msscSortsCreate";

/** входные параметры функции {@link msscElemsCountByFilterAndIf} */
export interface ParamsType {
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  randomEnabled: boolean,
  sortData?: BrSelectSortDataType<MsscColumnNameType>,
  sortIdCurr?: string,
}

/**
 * Получение общего количества элементов с учетом фильтров {@param filters}.
 * Также возвращает все всех ids если {@param randomEnabled} is THRUTHY
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
    sortData,
    sortIdCurr,
  }: ParamsType
): Promise<MsscElemsCountReturnType> {
  let elemsCountByFilter: number = 0;
  let ids: string[] = []
  if (randomEnabled) {
    const sorts = msscSortsCreate(sortData, sortIdCurr)
    ids = await source?.idsAll(filters, sorts) // AWAIT
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
