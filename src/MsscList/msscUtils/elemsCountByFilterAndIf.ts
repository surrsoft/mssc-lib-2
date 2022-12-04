import {RsuvTxNumIntAB} from "rsuv-lib";

import {sortsCreate} from "./sortsCreate";
import { MsscElemsCountParamsType } from '../types/types/MsscElemsCountParamsType';
import { MsscElemsCountReturnType } from '../types/types/MsscElemsCountReturnType';

/**
 * Получение общего количества элементов с учетом фильтров {@param filters}, и всех ids если {@param randomEnabled}
 * is THRUTHY
 * @param source
 * @param filters
 * @param randomEnabled
 * @param sortData
 * @param sortIdCurr
 */
export async function elemsCountByFilterAndIf(
    {
        source,
        filters,
        randomEnabled,
        sortData,
        sortIdCurr,
    }: MsscElemsCountParamsType
): Promise<MsscElemsCountReturnType> {
    let elemsCountByFilter: number = 0;
    let ids: string[] = []
    if (randomEnabled) {
        const sorts = sortsCreate(sortData, sortIdCurr)
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
    return {elemsCountByFilter, ids}
}
