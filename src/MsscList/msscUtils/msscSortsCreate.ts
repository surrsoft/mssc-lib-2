import {RsuvEnSort, RsuvTxSort, RsuvTxStringAC} from "rsuv-lib";

import {BrSelectIdType, BrSelectItemType, BrSelectSortDataType} from "../commonUI/BrSelect/types";
import { MsscColumnNameType } from '../types/types/MsscColumnNameType';

/** создаёт массив стандартных объектов описывающих сортировку */
export function msscSortsCreate(sortData?: BrSelectSortDataType<MsscColumnNameType>, sortIdCurr?: BrSelectIdType): RsuvTxSort[] {
    function fnRsuvTxSort(sortItem: BrSelectItemType<string>) {
        if (!sortItem.payload) {
            return null;
        } else {
            const columnName = new RsuvTxStringAC(sortItem.payload);
            return new RsuvTxSort(columnName, sortItem.direction as RsuvEnSort);
        }
    }

    let rsuvTxSort0 = null
    let item: BrSelectItemType<string> | undefined;
    if (sortIdCurr) {
        item = sortData?.items.find(el => el.idElem === sortIdCurr);
        if (item) {
            rsuvTxSort0 = fnRsuvTxSort(item)
        }
    }
    return rsuvTxSort0 ? [rsuvTxSort0] : [];
}
